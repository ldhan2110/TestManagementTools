import { HttpException } from "@core/exceptions";
import { IProject, ProjectSchema } from "@modules/project";
import CreateProjectRequirementDto from "./dtos/create_projectrequirement.dto";
import { IProjectRequirement } from "./projectrequirement.interface";
import ProjectRequirementSchema from './projectrequirement.model';

class ProjectRequirementService {
  public projectrequirementSchema = ProjectRequirementSchema;

  public async CreateRequirement(
    createrequirementDto: CreateProjectRequirementDto,
    projectId: string): Promise<IProject> 
  {    
    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project is not exist');

    const existingProjectRequirement = await ProjectRequirementSchema.findOne(
        { name: createrequirementDto.name }).exec();
      if (existingProjectRequirement)
        throw new HttpException(400, 'Name ProjectRequirement existed');
        console.log(existingProjectRequirement);
  
      const newProjectRequirement = new ProjectRequirementSchema({
        ...createrequirementDto
      });
      const requirement = await newProjectRequirement.save();

    const addProjectForUser = await ProjectSchema.findByIdAndUpdate(
        projectId,
        { $push: { projectrequirement: requirement._id } },
        { new: true, useFindAndModify: false }
      );

    await project.save();

    return project;
  }

  public async removeRequirement(projectId: string, projectrequirementId: string): Promise<IProject> 
  {
    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project id is not exist');

    const projectrequirement = await ProjectRequirementSchema.findById(projectrequirementId).exec();
    if (!projectrequirement) throw new HttpException(400, 'requirement id is not exist');

    if (
      project.projectrequirement &&
      project.projectrequirement.findIndex(
        (item: IProjectRequirement) => item._id.toString() === projectrequirementId
      ) == -1
    ) {
      throw new HttpException(400, 'You has not yet been requirement of this project');
    }

    project.projectrequirement = project.projectrequirement.filter(
      ({ _id }) => _id.toString() !== projectrequirementId
    );
    await project.save();

    const deletedProjectRequirement = await ProjectRequirementSchema.findOneAndDelete({
        _id: projectrequirementId,
      }).exec();
      if (!deletedProjectRequirement) throw new HttpException(400, 'Delete Requirement is not success');
    return project;
  }

  public async updateRequirement(
    createrequirementDto: CreateProjectRequirementDto,
    projectrequirementId: string): Promise<IProjectRequirement> 
  {
    const projectrequirement = await ProjectRequirementSchema.findById(projectrequirementId).exec();
    if (!projectrequirement) throw new HttpException(400, 'Requirement id is not exist');

    const existingProjectRequirement = await ProjectRequirementSchema.find(
        { name: createrequirementDto.name } 
    ).exec();

    if (existingProjectRequirement.length > 0)
      throw new HttpException(400, 'Name existed');


    const updatedProjectRequirement = await ProjectRequirementSchema.findOneAndUpdate(
      { _id: projectrequirementId },
      {$set: {         
        name: createrequirementDto.name,
        description: createrequirementDto.description,
        scope: createrequirementDto.scope,
        type: createrequirementDto.type      
       }},
      { new: true}
    ).exec();
    if (!updatedProjectRequirement) throw new HttpException(400, 'Update Requirement is not success');

    return updatedProjectRequirement;
  }

  public async getAllRequirementOfProject(projectId: string): Promise<Partial<IProjectRequirement>[]> {
    const requirements = ProjectSchema.find({ _id: projectId })
    .populate('projectrequirement', ['name', 'description', 'scope'])
    .exec();
    return requirements;
  }
  

}
export default ProjectRequirementService;