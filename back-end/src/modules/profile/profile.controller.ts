import { NextFunction, Request, Response } from 'express';

import AddEducationDto from './dtos/add_education.dto';
import AddExperienceDto from './dtos/add_experience.dto';
import CreateProfileDto from './dtos/create_profile.dto';
import { IProfile } from './profile.interface';
import { IUser } from '@modules/users';
import ProfileService from './profile.service';

class ProfileController {
  private profileService = new ProfileService();

  public createProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userData: CreateProfileDto = req.body;
    const userId = req.user.id;
    try {
      const createUserData: IProfile = await this.profileService.createProfile(
        userId,
        userData
      );
      //res.status(201).json({ data: createUserData });
      res.status(201).json({status: 201, success: true, result:createUserData, errMsg:''});
    } catch (error) {
      res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
      next(error);
    }
  };

}
export default ProfileController;