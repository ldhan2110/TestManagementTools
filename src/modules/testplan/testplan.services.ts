import { HttpException } from "@core/exceptions";
import { IProject, ProjectSchema } from "@modules/project";
import { ITestPlan, TestPlanSchema } from "@modules/testplan";
import CreateTestPlanDto from "./dtos/create_testplan.dto";

class TestPlanService {
  public testplanSchema = TestPlanSchema;

  public async CreateTestPlan(
    createtestplantDto: CreateTestPlanDto,
    projectId: string): Promise<IProject> 
  {    
    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project is not exist');

    const existingTestPlan = await TestPlanSchema.findOne(
        { name: createtestplantDto.name}).exec();
      if (existingTestPlan)
        throw new HttpException(400, 'Name TestPlan existed');
        console.log(existingTestPlan);
  
      const newTestPlan = new TestPlanSchema({
        ...createtestplantDto
      });
      const testplan = await newTestPlan.save();

    const addTestPlanForProject = await ProjectSchema.findByIdAndUpdate(
        projectId,
        { $push: { testplan: testplan._id } },
        { new: true, useFindAndModify: false }
      );

    await project.save();

    return project;
  }

  public async removeTestPlan(projectId: string, testplanId: string): Promise<IProject> 
  {
    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project id is not exist');

    const testplan = await TestPlanSchema.findById(testplanId).exec();
    if (!testplan) throw new HttpException(400, 'testplan id is not exist');

    if (
      project.testplan &&
      project.testplan.findIndex(
        (item: ITestPlan) => item._id.toString() === testplanId
      ) == -1
    ) {
      throw new HttpException(400, 'You has not yet been testplan of this project');
    }

    project.testplan = project.testplan.filter(
      ({ _id }) => _id.toString() !== testplanId
    );
    await project.save();

    const deletedTestPlan = await TestPlanSchema.findOneAndDelete({
        _id: testplanId,
      }).exec();
      if (!deletedTestPlan) throw new HttpException(400, 'Delete Testplan is not success');
    return project;
  }

  public async updateTestPlan(
    createtestplantDto: CreateTestPlanDto,
    testplanId: string): Promise<ITestPlan> 
  {
    const testplan = await TestPlanSchema.findById(testplanId).exec();
    if (!testplan) throw new HttpException(400, 'Testplan id is not exist');

    const existingTestPlan = await TestPlanSchema.find(
        { name: createtestplantDto.name } 
    ).exec();

    if (existingTestPlan.length > 0)
      throw new HttpException(400, 'Name existed');


    const updatedTestPlan = await TestPlanSchema.findOneAndUpdate(
      { _id: testplanId },
      {$set: {         
        name: createtestplantDto.name,
        description: createtestplantDto.description,
        scope: createtestplantDto.isActive,
        type: createtestplantDto.isPublic      
       }},
      { new: true}
    ).exec();
    if (!updatedTestPlan) throw new HttpException(400, 'Update Requirement is not success');

    return updatedTestPlan;
  }

  public async getAllTestPlanOfProject(projectId: string): Promise<Partial<ITestPlan>[]> {
    const requirements = ProjectSchema.find({ _id: projectId })
    .populate('testplan', ['name', 'description'])
    .exec();
    return requirements;
  }
  

}
export default TestPlanService;