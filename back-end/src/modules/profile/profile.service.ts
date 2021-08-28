
import { IUser, UserSchema } from '@modules/users';

import AddEducationDto from './dtos/add_education.dto';
import AddExperienceDto from './dtos/add_experience.dto';
import CreateProfileDto from './dtos/create_profile.dto';
import { HttpException } from '@core/exceptions';
import ProfileSchema from './profile.model';
import normalize from 'normalize-url';

class ProfileService {

  public async createProfile(
    userId: string,
    profileDto: CreateProfileDto
  ) {

    const newProfile = new ProfileSchema({
      ...profileDto
    });
    const profile = await newProfile.save();

    return profile;
  }

  /*public async getAllProfiles(): Promise<Partial<IUser>[]> {
    const profiles = await ProfileSchema.find()
      .populate('user', ['name', 'avatar'])
      .exec();
    return profiles;
  }*/
}
export default ProfileService;