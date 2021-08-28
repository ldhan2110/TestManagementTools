import { generateJwtToken, randomTokenString } from '@core/utils/helpers';
import { RefreshTokenSchema } from '@modules/refresh_token';
import { HttpException } from '@core/exceptions';
import { IPagination } from '@core/interfaces';
import IUser from './users.interface';
import RegisterDto from './dtos/register.dto';
import { TokenData } from '@modules/auth';
import UserSchema from './users.model';
import bcryptjs from 'bcryptjs';
import gravatar from 'gravatar';
import { isEmptyObject } from '@core/utils';
import jwt from 'jsonwebtoken';
import ResetPasswordDto from './dtos/reset_password.dto';
import UpdateProfileDto from './dtos/update_profile.dto';
import UpdatePasswordDto from './dtos/update_password.dto';
import { ProjectSchema } from '@modules/project';
import UploadAvatarDto from './dtos/upload_avatar.dto';

const axios = require('axios');
const FormData = require('form-data');

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const nodeMailer = require('nodemailer')
const adminEmail = 'hung08596@gmail.com'
const adminPassword = '3982158sS@'
const mailHost = 'smtp.gmail.com'
const mailPort = 587
class UserService {
  public userSchema = UserSchema;

  public async createUser(register_model: RegisterDto): Promise<TokenData> {
    if (isEmptyObject(register_model)) {
      throw new HttpException(400, 'Register Model is empty');
    }

    const user_username = await this.userSchema.findOne({ username: register_model.username }).exec();
    if (user_username) {
      throw new HttpException(409, `Username ${register_model.username} already exist.`);
    }

    const user = await this.userSchema.findOne({ email: register_model.email }).exec();
    if (user) {
      throw new HttpException(409, `Your email ${register_model.email} already exist.`);
    }

    const salt = await bcryptjs.genSalt(10);

    const hashedPassword = await bcryptjs.hash(register_model.password, salt);
    const createdUser = await this.userSchema.create({
      ...register_model,
      password: hashedPassword,
      created_date: Date.now(),
      updated_date: Date.now()
    });
    const refreshToken = await this.generateRefreshToken(createdUser._id);
    await refreshToken.save();

    const msg = {
      to: createdUser.email, // Change to your recipient
      from: adminEmail, // Change to your verified sender
      subject: 'Welcome to TestControl',
      text: 'Welcome to TestControl',
      html: `
      <head>
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <!-- <title>Welcome email</title> -->
      <!-- <meta name="description" content="Welcome email template."> -->
      <style type="text/css">
          a:hover {text-decoration: underline !important;}
      </style>
  </head>
  
  <body>
      <!--100% body table-->
      <table cellspacing="0" border="0" cellpadding="0" width="100%">
          <tr>
              <td>
                  <table style="max-width:670px;  margin:0 auto;" width="100%" border="0"
                      align="center" cellpadding="0" cellspacing="0">
                     
                      <tr>
                          <td>
                              <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                  style="max-width:670px;">
                                  <tr>
                                      <td>                                        
                                          <h1 align="center">Welcome!</h1>
                                          
                                          <h2>Dear ${createdUser.fullname},</h2>
  
                                          <p>
                                              Thank you for creating an account on Test Control - we are excited you're here!
                                          </p>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td style="height:30px">
                                          <p>
                                               Please contact us if you need any help about Test Control account, functionalities.                                          
                                          </p>
                                      </td>
                                  </tr>
                                  
                                  <tr>
                                      <td style="height:30px;">
                                          <p>
                                          Sincerely,
                                          </p>
                                          <p>
                                              <strong>Test Control Team</strong>
                                          </p>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                          <tr>
                              <td style="text-align:center;">
                                  <p>&copy; <strong>Test Control, 2021</strong></p>
                              </td>
                          </tr>
                  </table>
              </td>
          </tr>
      </table>
      <!--/100% body table-->`,
    }
    sgMail.send(msg)

    return generateJwtToken(createdUser._id, refreshToken.token);
  }

  public async updateUser(userId: string, model: RegisterDto): Promise<IUser> {
    if (isEmptyObject(model)) {
      throw new HttpException(400, 'Model is empty');
    }

    const user = await this.userSchema.findById(userId).exec();
    if (!user) {
      throw new HttpException(400, `User id is not exist`);
    }

    let avatar = user.avatar;
    if (user.email === model.email) {
      throw new HttpException(400, 'You must using the difference email');
    }

    const checkEmailExist = await this.userSchema
      .find({
        $and: [{ email: { $eq: model.email } }, { _id: { $ne: userId } }],
      })
      .exec();
    if (checkEmailExist.length !== 0) {
      throw new HttpException(400, 'Your email has been used by another user');
    }

    avatar = gravatar.url(model.email!, {
      size: '200',
      rating: 'g',
      default: 'mm',
    });

    let updateUserById;
    if (model.password) {
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(model.password, salt);
      updateUserById = await this.userSchema
        .findByIdAndUpdate(
          userId,
          {
            ...model,
            avatar: avatar,
            password: hashedPassword,
          },
          { new: true }
        )
        .exec();
    } else {
      updateUserById = await this.userSchema
        .findByIdAndUpdate(
          userId,
          {
            ...model,
            avatar: avatar,
          },
          { new: true }
        )
        .exec();
    }

    if (!updateUserById) throw new HttpException(409, 'You are not an user');

    return updateUserById;
  }

  public async updateProfile(userId: string, model: UpdateProfileDto): Promise<IUser> {
    if (isEmptyObject(model)) {throw new HttpException(400, 'Model is empty');}

    const user = await this.userSchema.findById(userId).exec();
    if (!user) {throw new HttpException(400, `User id is not exist`);}


    const updateUserById = await this.userSchema.findByIdAndUpdate(
      userId,
      {
        ...model,
        fullname: model.fullname,
        phonenumber: model.phonenumber,
        introduction: model.introduction
      },{ new: true }).exec();
    if (!updateUserById) throw new HttpException(409, 'You are not an user');

    return updateUserById;
  }

  public async updatePasswordInProfile(userId: string, model: UpdatePasswordDto): Promise<IUser> {
    const user = await this.userSchema.findById(userId).exec();
    if (!user) {throw new HttpException(400, `User id is not exist`);}

    if(model.Password !== model.ConfirmPassword)
    {throw new HttpException(400, `Password and ConfirmPassword does not match`);}

    let updateUserById;
    if (user.password) {
      
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(model.ConfirmPassword, salt);
      updateUserById = await this.userSchema
        .findByIdAndUpdate(
          userId,
          {
            password: hashedPassword,
          },
          { new: true }
        )
        .exec();
    } 
    if (!updateUserById) throw new HttpException(409, 'You are not an user');

    return updateUserById;
  }

  public async getUserById(userId: string): Promise<IUser> {
    const user = await this.userSchema.findById(userId).exec();
    if (!user) {
      throw new HttpException(404, `User is not exists`);
    }
    return user;
  }

  public async getCurrentUser(userId: string): Promise<IUser> {
    const user = await this.userSchema.findById(userId)
    .select('fullname email introduction phonenumber avatar')
    .exec();
    if (!user) {
      throw new HttpException(404, `User is not exists`);
    }
    
    return user;
  }

  public async getAll(): Promise<IUser[]> {
    const users = await this.userSchema.find({}, 'username email').exec();
    return users;
  }

  public async getAllPaging(
    keyword: string,
    page: number
  ): Promise<IPagination<IUser>> {
    const pageSize = Number(process.env.PAGE_SIZE || 10);

    let query = {};
    if (keyword) {
      query = {
        $or: [{ email: keyword }, { first_name: keyword }, { last_name: keyword }],
      };
    }

    const users = await this.userSchema
      .find(query)
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec();

    const rowCount = await this.userSchema.find(query).countDocuments().exec();

    return {
      total: rowCount,
      page: page,
      pageSize: pageSize,
      items: users,
    } as IPagination<IUser>;
  }

  public async deleteUser(userId: string): Promise<IUser> {
    const deletedUser = await this.userSchema.findByIdAndDelete(userId).exec();
    if (!deletedUser) throw new HttpException(409, 'Your id is invalid');
    return deletedUser;
  }

  public async deleteUsers(userIds: string[]): Promise<number | undefined> {
    const result = await this.userSchema.deleteMany({ _id: [...userIds] }).exec();
    if (!result.ok) throw new HttpException(409, 'Your id is invalid');
    return result.deletedCount;
  }

  private async generateRefreshToken(userId: string) {
    // create a refresh token that expires in 7 days
    return new RefreshTokenSchema({
      user: userId,
      token: randomTokenString(),
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
  }

  public async forgotPassword(email: string): Promise<string> {
    const user = await this.userSchema.findOne({ email: email }).exec();
    if (!user) throw new HttpException(409, 'Your email is invalid');

    const secretkey: string = process.env.JWT_TOKEN_FORGOTPASSWORD!;
    const token = jwt.sign({_id: user._id}, secretkey, {expiresIn: '10m'});
    let verificationLink = `https://testcontrols.herokuapp.com/auth/reset-password/${token}`;
    
    const msg = {
      to: email, // Change to your recipient
      from: adminEmail, // Change to your verified sender
      subject: 'Resset Password',
      text: 'Resset Password',
      html: `
      <title>Reset Password Email Template</title>
    <meta name="description" content="Reset Password Email Template.">
    <!-- <style type="text/css">
        a:hover {text-decoration: underline !important;}
    </style> -->
</head>

<body>
    <!--100% body table-->
    <table cellspacing="0" border="0" cellpadding="0" width="100%">
        <tr>
            <td>
                <table style="max-width:670px;  margin:0 auto;" width="100%" border="0"
                    align="center" cellpadding="0" cellspacing="0">
                   
                    <tr>
                        <td>
                            <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                style="max-width:670px;">
                                
                                <tr>
                                    <td>
                                        <h1>You have
                                            requested to reset your password</h1>
                                        
                                        <p>
                                            We cannot simply send you your old password. A unique link to reset your
                                            password has been generated for you. To reset your password, click the
                                            following link and follow the instructions.
                                        </p>
                                        <div style="text-align: center">
                                        <a href=${verificationLink}
                                            style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:15px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset
                                            Password</a>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:30px">
                                        <p>
                                            The above link will only be valid for the next <strong>10 minutes</strong>.                                            
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:30px">
                                        <p>
                                            If you did not request a password reset, no further action is required.
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:30px;">
                                        <p>
                                        Regards,
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:30px;">
                                        <p>
                                        Test Control.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <tr>
                            <td style="text-align:center;">
                                <p>&copy; <strong>Test Control, 2021</strong></p>
                            </td>
                        </tr>
                </table>
            </td>
        </tr>
    </table>
    <!--/100% body table-->
             `,
    }
    sgMail.send(msg)
    return 'Send mail successfully' ;
    
  }

  public async newPassword(userId: string, resetpw_dto: ResetPasswordDto): Promise<IUser> {

    const user = await this.userSchema.findById(userId).exec();
    if (!user) {
      throw new HttpException(400, `User id is not exist`);
    }

    if(resetpw_dto.newpassword !== resetpw_dto.confirmnewpassword)
    throw new HttpException(400, `New password and confirm new password does not match`);

    let updateUserById;
    if (user.password) {
      
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(resetpw_dto.newpassword, salt);
      updateUserById = await this.userSchema
        .findByIdAndUpdate(
          userId,
          {
            password: hashedPassword,
          },
          { new: true }
        )
        .exec();
    } 
    if (!updateUserById) throw new HttpException(409, 'You are not an user');

    return updateUserById;
  }

  public async uploadAvatar(avatar: UploadAvatarDto, userId: string){
    const uploadAvatar = await UserSchema.findOneAndUpdate(
      {_id: userId},
      {$set: {
        avatar : avatar.avatar,
        updated_date: Date.now()
      }},{new: true}).exec();
      if (!uploadAvatar) throw new HttpException(400, 'Upload is not success');
  }


}
export default UserService;