import { HttpException } from '@core/exceptions';
import bcryptjs from 'bcryptjs';
import gravatar from 'gravatar';
import { isEmptyObject } from '@core/utils';
import ProjectDto from './dtos/project.dto';
import ProjectSchema from './project.model';


class ProjectService {
  public projectSchema = ProjectSchema;

  public async createProject(model: ProjectDto): Promise<string> {
    return 'hello';
  }

  

}
export default ProjectService;