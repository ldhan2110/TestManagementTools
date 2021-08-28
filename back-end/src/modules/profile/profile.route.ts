import { authMiddleware, validationMiddleware } from '@core/middleware';

import AddEducationDto from './dtos/add_education.dto';
import AddExperienceDto from './dtos/add_experience.dto';
import CreateProfileDto from './dtos/create_profile.dto';
import ProfileController from './profile.controller';
import { Profiler } from 'winston';
import { Route } from '@core/interfaces';
import { Router } from 'express';

class ProfileRoute implements Route {
  public path = '/profile';
  public router = Router();
  public profileController = new ProfileController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      authMiddleware,
      validationMiddleware(CreateProfileDto),
      this.profileController.createProfile
    );

  }
}

export default ProfileRoute;