import { HttpException } from "@core/exceptions";
import { BuildSchema } from "@modules/build";
import BuildService from "@modules/build/build.services";
import { IProject, ProjectSchema } from "@modules/project";
import { TestExecutionSchema } from "@modules/testexecution";
import { ITestPlan, TestPlanSchema } from "@modules/testplan";
import CreateTestPlanDto from "./dtos/create_testplan.dto";

class TestPlanService {
  public testplanSchema = TestPlanSchema;
  private buildSrvices = new BuildService();

  public async createTestPlanAndAddProject(
    createtestplantDto: CreateTestPlanDto,
    projectId: string): Promise<IProject> 
  {    
    const project = await ProjectSchema.findById(projectId, 'testplan')
    .populate({
      path: 'testplan',
      select: 'testplanname'
    })
    .exec();
    if (!project) throw new HttpException(400, 'Project is not exist');
    
    if(
    project.testplan && project.testplan.some(item => item.testplanname === createtestplantDto.testplanname)
    ) {throw new HttpException(400, 'Name testplan existed in project');}
  
      const newTestPlan = new TestPlanSchema({
        ...createtestplantDto,
        is_active: createtestplantDto.isActive,
        is_public: createtestplantDto.isPublic,
        description: createtestplantDto.description,
        testplanname: createtestplantDto.testplanname,
        project: projectId
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

  public async getAllTestPlanOfProject(projectId: string): Promise<Partial<ITestPlan>[]> {
    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project id is not exist');
    
    const testplanIds = project.testplan.map((testplanid) => {return testplanid._id;});
    const testplans = TestPlanSchema.find(
      {_id: testplanIds, is_disable: true}, 
      'testplanname testplan_id description is_active is_public created_date'
      ).exec();

    return testplans;
  }

  public async getAllBuildOfTestplan(projectId: string, testplan_name: string): Promise<Partial<ITestPlan>[]> {
    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project id is not exist');

    const testplan = await TestPlanSchema.findOne({testplanname: testplan_name, project: projectId}).exec();
    if (!testplan) throw new HttpException(400, 'Testplan id is not exist');
    
    const buildIds = testplan.build.map((item) => {return item._id;});
    const builds = BuildSchema.find(
      {_id: buildIds, is_active: true}, 
      'buildname'
      ).exec();

    if(!builds){throw new HttpException(400, 'ListBuild empty or is not exist')};
    return builds;
  }

  public async getAllTestPlanOfProjectActive(projectId: string): Promise<Partial<ITestPlan>[]> {
    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project id is not exist');
    
    const testplanIds = project.testplan.map((testplanid) => {
      return testplanid._id;
    });

    const testplans = TestPlanSchema.find({_id: testplanIds, is_active: true, is_disable: true}, 'testplanname').exec();

    return testplans;
  }

  public async searchTestPlanOfProject(projectId: string, keyword: string): Promise<Partial<ITestPlan>[]> {
    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project id is not exist');
    
    const testplanIds = project.testplan.map((testplanid) => {return testplanid._id;});
    const testplans = TestPlanSchema.find(
      {_id: testplanIds, testplanname: new RegExp(keyword, 'i'), is_disable: true}, 
      'testplanname testplan_id description is_active is_public created_date'
      ).exec();


      return testplans;
  }

  public async updateTestPlan(
    createtestplantDto: CreateTestPlanDto,
    testplanId: string,
    projectId: string): Promise<ITestPlan> 
  {
    const testplan = await TestPlanSchema.findById(testplanId).exec();
    if (!testplan) throw new HttpException(400, 'TestPlan id is not exist');

    if(testplan.testplanname !== createtestplantDto.testplanname){
      const project = await ProjectSchema.findById(projectId, 'testplan')
      .populate({
        path: 'testplan',
        select: 'testplanname'
      })
      .exec();
      if (!project) throw new HttpException(400, 'Project is not exist');
      
      if(
      project.testplan && project.testplan.some(item => item.testplanname === createtestplantDto.testplanname)
      ) {throw new HttpException(400, 'Name testplan existed in project');}
    }

    const updatedTestPlan = await TestPlanSchema.findOneAndUpdate(
      { _id: testplanId },
      {$set: {         
        testplanname: createtestplantDto.testplanname,
        description: createtestplantDto.description,
        is_active: createtestplantDto.isActive,
        is_public: createtestplantDto.isPublic   ,
        updated_date: Date.now(),   
       }},
      { new: true} //get testplan after update
    ).exec();
    if (!updatedTestPlan) throw new HttpException(400, 'Update Testplan is not success');

    return updatedTestPlan;
  }

  public async removeAndDeleteTestPlan(projectId: string, testplanId: string): Promise<IProject> 
  {
    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project id is not exist');

    const testplan = await TestPlanSchema.findById(testplanId).exec();
    if (!testplan) throw new HttpException(400, 'testplan id is not exist');

    //delete build of testplan
    if(testplan.build !== undefined && testplan.build !== null){
      for(let element of testplan.build){
        const deletebuild = await this.buildSrvices.removeAndDeleteBuildFromProject(projectId, element.toString());
      }
      //const result = await BuildSchema.deleteMany({ _id: [...testplan.build] }).exec();
      //if (!result.ok) throw new HttpException(409, 'List Build is invalid');
    }

    //remove from project
    if (project.testplan && project.testplan.findIndex((item: ITestPlan) => item._id.toString() === testplanId) == -1)
    {throw new HttpException(400, 'You has not yet been testplan of this project');}
    project.testplan = project.testplan.filter(({ _id }) => _id.toString() !== testplanId);
    await project.save();

    const deletedTestPlan = await TestPlanSchema.findOneAndDelete({_id: testplanId,}).exec();
      if (!deletedTestPlan) throw new HttpException(400, 'Delete Testplan is not success');
    return project;
  }

  public async disableTestPlan(
    testplanId: string,
    projectId: string): Promise<ITestPlan> {
    const testplan = await TestPlanSchema.findById(testplanId).exec();
    if (!testplan) throw new HttpException(400, 'TestPlan id is not exist');

    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project is not exist');
    
      const updatedTestPlan = await TestPlanSchema.findOneAndUpdate(
        { _id: testplanId },
        {$set: {         
          is_disable: false     
          }},{ new: true} //get testplan after update
      ).exec();
      if (!updatedTestPlan) throw new HttpException(400, 'Disable Testplan is not success');
      return updatedTestPlan;
  }

  public async duplicateTestPlan(
    testplanId: string,
    projectId: string) {
      const builds = TestPlanSchema.find({ _id: testplanId }, 'build')
      .populate({path: 'build', 
                 select: ['build_id', 'buildname', 'description', 'is_active', 'is_open', 'releasedate', 'testplan'],
                 match: {is_disable: true}
                }).exec();
                
      return builds;
  }

}
export default TestPlanService;