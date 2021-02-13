import { HttpException } from '@core/exceptions';
import bcryptjs from 'bcryptjs';
import gravatar from 'gravatar';
import ProjectSchema from './project.model';
import CreateProjectDto from './dtos/create_project.dto';
import IProject, { IMember } from './project.interface';
import { IUser, UserSchema } from '@modules/users';
import SetMemberDto from './dtos/set_member.dto';


class ProjectService {
  public projectSchema = ProjectSchema;

  public async createProject(
    userId: string,
    projectDto: CreateProjectDto
  ): Promise<IProject> {
    const user = await UserSchema.findById(userId).select('-password').exec();
    if (!user) throw new HttpException(400, 'User id is not exist');

    const existingProject = await ProjectSchema.find({
      $or: [{ name: projectDto.name }, { code: projectDto.name }],
    }).exec();
    if (existingProject.length > 0)
      throw new HttpException(400, 'Name Project existed');

    const newProject = new ProjectSchema({
      ...projectDto,
      created_user: userId,
    });
    const post = await newProject.save();

    const project = await ProjectSchema.findById(post._id).exec();
    if (!project) throw new HttpException(400, 'Project is not exist');
    project.members.unshift({ user: userId } as IMember);
    await project.save();

    const addProjectForUser = await UserSchema.findByIdAndUpdate(
      userId,
      { $push: { project: post._id } },
      { new: true, useFindAndModify: false }
    );

    return post;
  }

  public async getAllProjectByCreatedUser(userId: string): Promise<IProject[]> {
    const projects = ProjectSchema.find({created_user: userId}).exec();
    return projects;
  }

  public async getAllProject(): Promise<IProject[]> {
    const projects = ProjectSchema.find().exec();
    return projects;
  }

  public async getAllMembers(projectId: string): Promise<IUser[]> {
    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project id is not exist');

    const userIds = project.members.map((member) => {
      return member.user;
    });

    const users = UserSchema.find({ _id: userIds }).select('-password').exec();
    return users;
  }

  public async updateProject(
    projectId: string,
    projectDto: CreateProjectDto,
    userId: string
  ): Promise<IProject> {
    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project id is not exist');

    const existingProject = await ProjectSchema.find(
        { name: projectDto.name } 
    ).exec();

    if (existingProject.length > 0)
      throw new HttpException(400, 'Name existed');


    const updatedProject = await ProjectSchema.findOneAndUpdate(
      { _id: projectId },
      {$set: {         
        name: projectDto.name,
        description: projectDto.description,
        active: projectDto.active,
        created_date: Date.now(),
        updated_user: userId        
       }},
      { new: true}
    ).exec();
    if (!updatedProject) throw new HttpException(400, 'Update is not success');

    return updatedProject;
  }

  public async deleteProject(projectId: string): Promise<IProject> {
    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project id is not exist');

    const deletedProject = await ProjectSchema.findOneAndDelete({
      _id: projectId,
    }).exec();
    if (!deletedProject) throw new HttpException(400, 'Update is not success');

    return deletedProject;
  }

  public async addMember(adduser: SetMemberDto, projectId: string): Promise<IProject> {
    const user = await UserSchema.findById(adduser.userId).select('-password').exec();
    if (!user) throw new HttpException(400, 'User id is not exist');

    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project is not exist');

    if (
      project.members &&
      project.members.some((item: IMember) => item.user.toString() === adduser.userId)
    ) {throw new HttpException(400, 'This user has already been in project');}

    project.members.unshift({ 
      user: adduser.userId,
      role: adduser.role,
     } as IMember);
    await project.save();

    return project;
  }

  public async removeMember(projectId: string, userId: string): Promise<IProject> {
    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project id is not exist');

    const user = await UserSchema.findById(userId).select('-password').exec();
    if (!user) throw new HttpException(400, 'User id is not exist');

    if (
      project.members &&
      project.members.findIndex(
        (item: IMember) => item.user.toString() === userId
      ) == -1
    ) {
      throw new HttpException(400, 'You has not yet been member of this group');
    }

    if (project.members.length == 1) {
      throw new HttpException(400, 'You are last member of this group. Cannot delete');
    }

    project.members = project.members.filter(
      ({ user }) => user.toString() !== userId
    );

    await project.save();
    return project;
  }
  

}
export default ProjectService;