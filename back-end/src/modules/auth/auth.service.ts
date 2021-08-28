import { IUser, TokenData } from '@modules/auth';
import { Logger, isEmptyObject } from '@core/utils';
import { generateJwtToken, randomTokenString } from '@core/utils/helpers';

import { HttpException } from '@core/exceptions';
import LoginDto from './auth.dto';
import { RefreshTokenSchema } from '@modules/refresh_token';
import { UserSchema } from '@modules/users';
import bcryptjs from 'bcryptjs';
import { Console } from 'winston/lib/winston/transports';
import { LoginData } from '@core/interfaces';

class AuthService {
  public userSchema = UserSchema;

  public async login(model: LoginDto): Promise<LoginData> {
    if (isEmptyObject(model)) {
      throw new HttpException(400, 'Login Model is empty');
    }

    const user = await this.userSchema.findOne({ username: model.username }).exec();
    if (!user) {
      throw new HttpException(409, `Username ${model.username} is not exist.`);
    }
    const isMatchPassword = await bcryptjs.compare(model.password, user.password);
    if (!isMatchPassword) throw new HttpException(400, 'Password is not valid');

    const refreshToken = await this.generateRefreshToken(user._id);
    const jwtToken = generateJwtToken(user._id, refreshToken.token);
    // save refresh token
    await refreshToken.save();

    const logindata: LoginData ={ token: jwtToken.token, refreshtoken: jwtToken.refreshToken,
                                  fullname: user.fullname, username: user.username};
    return logindata;
  }

  public async refreshToken(token: string): Promise<TokenData> {
    const refreshToken = await this.getRefreshTokenFromDb(token);
    const { user } = refreshToken;

    // replace old refresh token with a new one and save
    const newRefreshToken = await this.generateRefreshToken(user);
    refreshToken.revoked = new Date(Date.now());
    refreshToken.replacedByToken = newRefreshToken.token;
    await refreshToken.save();
    await newRefreshToken.save();

    // return basic details and tokens
    return generateJwtToken(user, newRefreshToken.token);
  }

  public async revokeToken(token: string): Promise<void> {
    const refreshToken = await this.getRefreshTokenFromDb(token);

    // revoke token and save
    refreshToken.revoked = new Date(Date.now());
    await refreshToken.save();
  }

  public async getCurrentLoginUser(userId: string): Promise<IUser> {
    const user = await this.userSchema.findById(userId).exec();
    if (!user) {
      throw new HttpException(404, `User is not exists`);
    }
    return user;
  }

  private async getRefreshTokenFromDb(refreshToken: string) {
    const token = await RefreshTokenSchema.findOne({ token: refreshToken }).populate('user').exec();
    Logger.info(token);
    if (!token || !token.isActive) throw new HttpException(400, `Invalid refresh token`);
    return token;
  }

  private async generateRefreshToken(userId: string) {
    // create a refresh token that expires in 7 days
    return new RefreshTokenSchema({
      user: userId,
      token: randomTokenString(),
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // in 7 days
    });
  }
}
export default AuthService;