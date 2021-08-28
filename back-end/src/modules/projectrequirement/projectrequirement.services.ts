import { HttpException } from "@core/exceptions";
import { IProject, ProjectSchema } from "@modules/project";
import CreateProjectRequirementDto from "./dtos/create_projectrequirement.dto";
import { IProjectRequirement } from "./projectrequirement.interface";
import ProjectRequirementSchema from './projectrequirement.model';

class ProjectRequirementService {
  public projectrequirementSchema = ProjectRequirementSchema;

  public async createProjectRequirementAndAddProject(
    createprojectrequirementtDto: CreateProjectRequirementDto,
    projectId: string) 
  {    
    const project = await ProjectSchema.findById(projectId, 'projectrequirement')
    .populate({
      path: 'projectrequirement',
      select: 'projectrequirementname'
    }).exec();
    if (!project) throw new HttpException(400, 'Project is not exist');

    const newProjectRequirement = new ProjectRequirementSchema({
      ...createprojectrequirementtDto,
      is_active: createprojectrequirementtDto.isActive,
      is_public: createprojectrequirementtDto.isPublic,
      is_disable: false,
      status: false,
      description: createprojectrequirementtDto.description,
      projectrequirementname: createprojectrequirementtDto.projectrequirementname,
      project: projectId
    }); 
    const projectrequirement = await newProjectRequirement.save();

    const addProjectRequirementForProject = await ProjectSchema.findByIdAndUpdate(
        projectId,
        { $push: { projectrequirement: projectrequirement._id } },
        { new: true, useFindAndModify: false }
    );
    await project.save();

    return projectrequirement;
  }

  public async getAllProjectRequirementOfProject(projectId: string): Promise<Partial<IProjectRequirement>[]> {

    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project id is not exist');
    
    const projectrequirementIds = project.projectrequirement.map((projectrequirementid) => {return projectrequirementid._id;});
    const projectrequirements = ProjectRequirementSchema.find(
      {_id: projectrequirementIds, is_disable: false}, 
      'projectrequirementname description is_active is_public status created_date testexecution'
      ).populate({
        path: 'testexecution',
        select: 'testexecutionname status is_active',
        //match: { is_active: true},
      }).exec();

    return projectrequirements;
  }

  /*public async getAllBuildOfProjectRequirement(projectId: string, projectrequirement_name: string): Promise<Partial<IProjectRequirement>[]> {
    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project id is not exist');

    const projectrequirement = await ProjectRequirementSchema.findOne({projectrequirementname: projectrequirement_name, project: projectId}).exec();
    if (!projectrequirement) throw new HttpException(400, 'ProjectRequirement id is not exist');
    
    const buildIds = projectrequirement.build.map((item) => {return item._id;});
    const builds = BuildSchema.find(
      {_id: buildIds, is_active: true}, 
      'buildname -_id'
      ).exec();

    if(!builds){throw new HttpException(400, 'ListBuild empty or is not exist')};
    return builds;
  }*/

  public async getAllProjectRequirementOfProjectActive(projectId: string): Promise<Partial<IProjectRequirement>[]> {
    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project id is not exist');
    
    const projectrequirementIds = project.projectrequirement.map((projectrequirementid) => {
      return projectrequirementid._id;
    });

    const projectrequirements = ProjectRequirementSchema.find({_id: projectrequirementIds, is_active: true, is_disable: false}, 'projectrequirementname').exec();

    return projectrequirements;
  }

  public async searchProjectRequirementOfProject(projectId: string, keyword: string): Promise<Partial<IProjectRequirement>[]> {
    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project id is not exist');
    
    const projectrequirementIds = project.projectrequirement.map((projectrequirementid) => {return projectrequirementid._id;});
    const projectrequirements = ProjectRequirementSchema.find(
      {_id: projectrequirementIds, projectrequirementname: new RegExp(keyword, 'i'), is_disable: true}, 
      'projectrequirementname projectrequirement_id description is_active is_public created_date'
      ).exec();

    return projectrequirements;
  }

  public async updateProjectRequirement(
    createprojectrequirementtDto: CreateProjectRequirementDto,
    projectrequirementId: string,
    projectId: string): Promise<IProjectRequirement> 
  {
    const projectrequirement = await ProjectRequirementSchema.findById(projectrequirementId).exec();
    if (!projectrequirement) throw new HttpException(400, 'ProjectRequirement id is not exist');

    const project = await ProjectSchema.findById(projectId, 'projectrequirement')
    .populate({
      path: 'projectrequirement',
      select: 'projectrequirementname'
    }).exec();
    if (!project) throw new HttpException(400, 'Project is not exist');

    const updatedProjectRequirement = await ProjectRequirementSchema.findOneAndUpdate(
      { _id: projectrequirementId },
      {$set: {         
        projectrequirementname: createprojectrequirementtDto.projectrequirementname,
        description: createprojectrequirementtDto.description,
        is_active: createprojectrequirementtDto.isActive,
        is_public: createprojectrequirementtDto.isPublic   ,
        updated_date: Date.now(),   
       }},
      { new: true} //get projectrequirement after update
    ).exec();
    if (!updatedProjectRequirement) throw new HttpException(400, 'Update ProjectRequirement is not success');

    return updatedProjectRequirement;
  }

  public async removeAndDeleteProjectRequirement(projectId: string, projectrequirementId: string): Promise<IProject> 
  {
    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project id is not exist');

    const projectrequirement = await ProjectRequirementSchema.findById(projectrequirementId).exec();
    if (!projectrequirement) throw new HttpException(400, 'projectrequirement id is not exist');

    //remove from project
    if (project.projectrequirement && project.projectrequirement.findIndex((item: IProjectRequirement) => item._id.toString() === projectrequirementId) == -1)
    {throw new HttpException(400, 'You has not yet been projectrequirement of this project');}
    project.projectrequirement = project.projectrequirement.filter(({ _id }) => _id.toString() !== projectrequirementId);
    await project.save();

    const deletedProjectRequirement = await ProjectRequirementSchema.findOneAndDelete({_id: projectrequirementId,}).exec();
      if (!deletedProjectRequirement) throw new HttpException(400, 'Delete ProjectRequirement is not success');

    return project;
  }

  public async disableProjectRequirement(
    projectrequirementId: string,
    projectId: string): Promise<IProjectRequirement> {
    const projectrequirement = await ProjectRequirementSchema.findById(projectrequirementId).exec();
    if (!projectrequirement) throw new HttpException(400, 'ProjectRequirement id is not exist');

    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project is not exist');
    
    const updatedProjectRequirement = await ProjectRequirementSchema.findOneAndUpdate(
      { _id: projectrequirementId },
      {$set: {         
        is_disable: false     
        }},{ new: true} //get projectrequirement after update
    ).exec();
    if (!updatedProjectRequirement) throw new HttpException(400, 'Disable ProjectRequirement is not success');

    return updatedProjectRequirement;
  }

  /*public async duplicateProjectRequirement(
    projectrequirementId: string,
    projectId: string) {
      const builds = ProjectRequirementSchema.find({ _id: projectrequirementId }, 'build')
      .populate({path: 'build', 
                 select: ['build_id', 'buildname', 'description', 'is_active', 'is_open', 'releasedate', 'projectrequirement'],
                 match: {is_disable: true}
                }).exec();
                
      return builds;
  }*/

}
export default ProjectRequirementService;