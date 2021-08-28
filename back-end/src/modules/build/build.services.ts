import { HttpException } from "@core/exceptions";
import { IProject, ProjectSchema } from "@modules/project";
import { ITestPlan, TestPlanSchema } from "@modules/testplan";
import { IBuild, BuildSchema } from "@modules/build";
import CreateBuildDto from "./dtos/create_build.dto";
import { ITestExecution, TestExecutionSchema } from "@modules/testexecution";
import { UserSchema } from "@modules/users";
import TestExecutionService from "@modules/testexecution/testexecution.services";

class BuildService {
  public buildSchema = BuildSchema;
  private testexecutionServices = new TestExecutionService();

  public async createBuildAndAddProject(
    create_buildDto: CreateBuildDto,
    projectId: string)
  {  
    const project = await ProjectSchema.findById(projectId, 'build')
    .populate({
      path: 'build',
      select: 'buildname'
    })
    .exec();
    if (!project) throw new HttpException(400, 'Project is not exist');

    const testplan = await TestPlanSchema.findOne({testplanname: create_buildDto.testplanname, project: projectId}, 'build')
    .populate({
      path: 'build',
      select: 'buildname'
    })
    .exec();
    if (!testplan) throw new HttpException(400, 'Testplan is not exist');
    
    if(
    testplan.build && testplan.build.some(item => item.buildname === create_buildDto.buildname)
    ) {throw new HttpException(400, 'Name build existed in testplan');}
  
      const newBuild = new BuildSchema({
        ...create_buildDto,
        is_open: create_buildDto.isPublic,
        is_active: create_buildDto.isActive,
        releasedate: create_buildDto.releasedate,
        buildname: create_buildDto.buildname,
        description: create_buildDto.description,
        project:projectId,
        created_date: Date.now(),
        updated_date: Date.now(),
      });
      const build = await newBuild.save();

    const addBuildForProject = await ProjectSchema.findByIdAndUpdate(
      projectId,
        { $push: { build: build._id } },
        { new: true, useFindAndModify: false }
      );
    await project.save();

    const addBuildForTestPlan = await TestPlanSchema.findOneAndUpdate(
        {testplanname: create_buildDto.testplanname, project: projectId},
        { $push: { build: build._id } },
        { new: true, useFindAndModify: false }
      );
      if(!addBuildForTestPlan){throw new HttpException(400, 'Name testplan not existed in project');}

      const buildReferenceToTestplan = await BuildSchema.findByIdAndUpdate(
        build._id,
        { testplan: addBuildForTestPlan._id },
        { new: true, useFindAndModify: false }
      );

    return build;
  }

  // not use
  public async addBuildForTestPlan(
    testplanId: string,
    buildId: string): Promise<ITestPlan> 
  {    
    const testplan = await TestPlanSchema.findById(testplanId).exec();
    if (!testplan) throw new HttpException(400, 'TestPlan is not exist');

    const build = await BuildSchema.findById(buildId).exec();
    if (!build) throw new HttpException(400, 'Build is not exist');

    if (
        testplan.build &&
        testplan.build.some((item: IBuild) => item._id.toString() === buildId)
      ) {throw new HttpException(400, 'This build has already been in testplan');}

    const addBuildForTestPlan = await TestPlanSchema.findByIdAndUpdate(
        testplanId,
        { $push: { build: build._id } },
        { new: true, useFindAndModify: false }
      );

    await testplan.save();

    return testplan;
  }

  // not use
  public async createBuildAndAddTestPlan(
    create_buildDto: CreateBuildDto,
    projectId: string,
    testplanId: string): Promise<ITestPlan> 
  {  
    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project is not exist');

    const testplan = await TestPlanSchema.findById(testplanId).exec();
    if (!testplan) throw new HttpException(400, 'TestPlan is not exist');

    const existingBuild = await BuildSchema.findOne(
        { name: create_buildDto.buildname, testplan: testplanId}).exec();
      if (existingBuild)
        throw new HttpException(400, 'Name Build existed');
  
      const newBuild = new BuildSchema({
        ...create_buildDto
      });
      const build = await newBuild.save();

      const addBuildForProject = await ProjectSchema.findByIdAndUpdate(
        projectId,
          { $push: { build: build._id } },
          { new: true, useFindAndModify: false }
        );
        await project.save();

    const addBuildForTestplan = await TestPlanSchema.findByIdAndUpdate(
        testplanId,
        { $push: { build: build._id } },
        { new: true, useFindAndModify: false }
      );
        await testplan.save();

    return testplan;
  }

  public async getAllBuildOfProjectActive(projectId: string) {
    const builds = ProjectSchema.find({ _id: projectId }, 'build')
    .populate({path: 'build', 
               select: ['_id', 'buildname', 'is_active'],
               match:  {is_active : true, is_disable: true}
              })
    .exec();
    return builds;
  }

  public async getAllBuildOfTestPlanActive(projectId: string, testplanId: string) {
    const builds = TestPlanSchema.find({ _id: testplanId }, 'build')
    .populate({path: 'build', 
               select: ['_id', 'buildname', 'is_active'],
               match:  {is_active : true, is_disable: true}
              })
    .exec();
    if(!builds){throw new HttpException(404, `Testplan is not exists`);}

    return builds;
  }

  public async getAllBuildOfProject(projectId: string) {
    const builds = ProjectSchema.find({ _id: projectId }, 'build')
    .populate({
      path:'build',
      select: ['_id', 'buildname', 'description', 'is_active', 'is_open', 'releasedate'],
      populate: [{ path: 'testplan', select: 'testplanname -_id' }],
      match: {is_disable: true}
  })
    .exec();
    return builds;
  }

  public async searchBuildOfProject(projectId: string, keyword: string) {
    const builds = ProjectSchema.find({ _id: projectId }, 'build')
    .populate({
      path:'build',
      select: ['_id', 'buildname', 'description', 'is_active', 'is_open', 'releasedate'],
      match: { buildname: new RegExp(keyword, 'i'), is_disable: true},
      populate: [{ path: 'testplan', select: 'testplanname -_id' }]
    }).exec();
    return builds;
  }

  public async getAllBuildOfTestPlan(testplanId: string): Promise<Partial<IBuild>[]> {
    const builds = TestPlanSchema.find({ _id: testplanId }, 'build')
    .populate({path: 'build', 
               select: ['_id', 'buildname', 'description', 'is_active', 'is_open', 'releasedate', 'testplan'],
               match: {is_disable: true}
              }).exec();
    return builds;
  }

  public async getBuildById(buildId: string): Promise<IBuild> {
    const build = await this.buildSchema.findOne({_id: buildId, is_disable: true}).exec();
    if (!build) {
      throw new HttpException(404, `Build is not exists`);
    }
    return build;
  }

  public async updateBuild(
    create_buildDto: CreateBuildDto,
    buildId: string,
    projectId: string): Promise<IBuild> 
  {
    const build = await BuildSchema.findById(buildId).exec();
    if (!build) throw new HttpException(400, 'Build id is not exist');

    if(build.buildname !== create_buildDto.buildname){
      const project = await ProjectSchema.findById(projectId, 'build')
      .populate({
        path: 'build',
        select: 'buildname'
      })
      .exec();
      if (!project) throw new HttpException(400, 'Project is not exist');
      
      if(
      project.build && project.build.some(item => item.buildname === create_buildDto.buildname)
      ) {throw new HttpException(400, 'Name build existed in project');}
    }


    const updatedBuild = await BuildSchema.findOneAndUpdate(
      { _id: buildId },
      {$set: {         
        buildname: create_buildDto.buildname,
        description: create_buildDto.description,
        is_open: create_buildDto.isPublic,
        is_active: create_buildDto.isActive,   
        releasedate: create_buildDto.releasedate ,
        updated_date: Date.now(),
       }},
      { new: true}
    ).exec();
    if (!updatedBuild) throw new HttpException(400, 'Update Build is not success');

    return updatedBuild;
  }

  public async removeAndDeleteBuildFromProject(projectId: string, buildId: string): Promise<IProject> 
  {
    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project id is not exist');

    const build = await BuildSchema.findById(buildId).exec();
    if (!build) throw new HttpException(400, 'Build id is not exist');

    //delete testexecution of build
    if(build.testplan !== undefined && build.testplan !== "" && build.testplan !== null){
      if(build.testexecution !== undefined || build.testexecution > 0){
        for(let element of build.testexecution){
          const deleteExecution = await this.testexecutionServices.deleteTestExecutionFromProject(projectId,element.toString());
        }
        //const listTesexecution = await TestExecutionSchema.deleteMany({ _id: [...build.testexecution] }).exec();
        //if (!listTesexecution.ok) throw new HttpException(409, 'List execution is invalid');
      }
    }

    if(build.testplan !== undefined){
      const testplan = await TestPlanSchema.findById(build.testplan).exec();
      if (testplan){
        // remove build from testplan
          testplan.build = testplan.build.filter(({ _id }) => _id.toString() !== buildId);
          await testplan.save();     

        // remove testexecution from testplan
        for(let element of build.testexecution){
          testplan.testexecution = testplan.testexecution.filter(({ _id }) => _id.toString() !== element.toString());
          await testplan.save();
        }
      }
    }

    // remove build from project
    project.build = project.build.filter(({ _id }) => _id.toString() !== buildId);
    await project.save();

    const deletedBuild = await BuildSchema.findOneAndDelete({_id: buildId,}).exec();
    if (!deletedBuild) throw new HttpException(400, 'Delete Build is not success');

    return project;
  }

  // not use
  public async disableBuildFromProject(projectId: string, buildId: string)
  {
    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project id is not exist');

    const build = await BuildSchema.findById(buildId).exec();
    if (!build) throw new HttpException(400, 'Build id is not exist');

    const updatedBuild = await BuildSchema.findOneAndUpdate(
      { _id: buildId },
      {$set: {         
        is_disable: false
       }},
      { new: true}
    ).exec();
    if (!updatedBuild) throw new HttpException(400, 'Disable Build is not success');

    return updatedBuild;
  }

  // not use
  public async removeAndDeleteBuildFromTestPlan(projectId: string, testplanId: string, buildId: string): Promise<ITestPlan> 
  {
    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project id is not exist');

    const testplan = await TestPlanSchema.findById(testplanId).exec();
    if (!testplan) throw new HttpException(400, 'TestPlan id is not exist');

    const build = await BuildSchema.findById(buildId).exec();
    if (!build) throw new HttpException(400, 'Build id is not exist');

    if (
      project.build &&
      project.build.findIndex(
      (item: IBuild) => item._id.toString() === buildId
      ) == -1
       ) {
          throw new HttpException(400, 'You has not yet been build of this project');
         }
         project.build = project.build.filter(
          ({ _id }) => _id.toString() !== buildId
        );
        await project.save();

    if (
        testplan.build &&
        testplan.build.findIndex(
        (item: IBuild) => item._id.toString() === buildId
      ) == -1
    ) {
        throw new HttpException(400, 'You has not yet been build of this testplan');
      }
    testplan.build = testplan.build.filter(
      ({ _id }) => _id.toString() !== buildId
    );
    await testplan.save();

    const deletedBuild = await BuildSchema.findOneAndDelete({
        _id: buildId,
      }).exec();
      if (!deletedBuild) throw new HttpException(400, 'Delete Build is not success');

    return testplan;
  }

  // not use
  public async removeBuildFromTestPlan(testplanId: string, buildId: string): Promise<ITestPlan> 
  {
    const testplan = await TestPlanSchema.findById(testplanId).exec();
    if (!testplan) throw new HttpException(400, 'TestPlan id is not exist');

    const build = await BuildSchema.findById(buildId).exec();
    if (!build) throw new HttpException(400, 'Build id is not exist');

    if (
        testplan.build &&
        testplan.build.findIndex(
        (item: IBuild) => item._id.toString() === buildId
      ) == -1
    ) {
      throw new HttpException(400, 'You has not yet been build of this testplan');
    }

    testplan.build = testplan.build.filter(
      ({ _id }) => _id.toString() !== buildId
    );
    await testplan.save();
    return testplan;
  }

  public async duplicateBuild(
    create_buildDto: CreateBuildDto,
    projectId: string)
  {  
    // check exist project
    const project = await ProjectSchema.findById(projectId, 'build members')
    .populate({
      path: 'build',
      select: 'buildname'
    }).exec();
    if (!project) throw new HttpException(400, 'Project is not exist');

    // check exist build
    const exist_build = await BuildSchema.findById(create_buildDto.id_exist_build)
    .populate({
      path: 'testexecution',
      select: 'is_active is_public status testexecutionname description project testplan tester build exectestcases',
      populate: [{ path: 'tester', select: 'username _id' }]
    }).exec();
    if (!exist_build) {throw new HttpException(400, 'name build from create existing is not exist')};

    // get testplan of build
    const testplan = await TestPlanSchema.findOne({_id: exist_build.testplan}, 'build testplanname')
    .populate({
      path: 'build',
      select: 'buildname'
    }).exec();
    if (!testplan) {throw new HttpException(400, 'Testplan is not exist')};

    //check name build when duplicate
    if(testplan.build && testplan.build.some(item => item.buildname === create_buildDto.buildname)) 
    {throw new HttpException(400, 'Name build existed in testplan');}

    //structe build 
    let build_infor:any = {
      is_open: {type:Boolean},
      is_active: {type:Boolean},
      is_disable: {type:Boolean},
      releasedate: {type:String},
      buildname: {type:String},
      description: {type:String},
      project: {type:String},
      testplan: {type:String},
    };
    // save infor build
    build_infor={
      is_open: create_buildDto.isPublic,
      is_active: create_buildDto.isActive,
      is_disable: exist_build.is_disable,
      releasedate: create_buildDto.releasedate,
      buildname: create_buildDto.buildname,
      description: create_buildDto.description,
      project: exist_build.project,
      testplan: exist_build.testplan
    }

     // create build
    const inforBuild: CreateBuildDto = {
      buildname: create_buildDto.buildname,
      description: build_infor.description,
      isActive: build_infor.is_active,
      isPublic: build_infor.is_open,
      releasedate: build_infor.releasedate,
      testplanname: testplan.testplanname,
      id_exist_build: ""
    }
    //call api create build
    const newbuild = await this.createBuildAndAddProject(inforBuild, build_infor.project);

    // add test execution to build
    let list_testcase:any = [{
      _id: {type:String},
      type: {type:String},
      status: {type:String},
      note: {type:String},
      testcaseName: {type:String},
      description: {type:String},
      precondition: {type:String},
      postcondition: {type:String},
      testsuite: {type:String},
      priority: {type:String},
      listStep:[
       {
        status: {type:String},
        note: {type:String},
        _id: {type:String},
        stepDefine: {type:String},
        expectResult : {type: String} ,
        type: {type: String}
       }
      ]
    }]; list_testcase.pop();

    let execution_infor_temp:any = [{
      testexecutionname: {type:String},
      description: {type:String},
      testplanname: {type:String},
      buildname: {type:String},
      is_public: {type:String},
      is_active: {type:String},
      assigntester: {type:String},
      listexectestcases: {type:String},
      exist_testexecution: {type:String}
    }]; execution_infor_temp.pop();
    for(let i in exist_build["testexecution"]){
    // create exectestcase
      const array1:any = JSON.parse(JSON.stringify(exist_build["testexecution"][i]["exectestcases"]));
      for (let el_testcase in array1){
        list_testcase.push({
          type: array1[el_testcase]["type"],
          status: "Untest",
          note: "",
          _id: array1[el_testcase]["_id"],
          testcaseName: array1[el_testcase]["testcaseName"],
          description: array1[el_testcase]["description"],
          testsuite: array1[el_testcase]["testsuite"],
          precondition: array1[el_testcase]["precondition"],
          postcondition: array1[el_testcase]["postcondition"],
          priority: array1[el_testcase]["priority"],
          listStep: []
        });
        for(let el_Step in array1[el_testcase]["listStep"]){
          list_testcase[el_testcase].listStep.push({
            status: "Untest",
            note: "",
            _id: array1[el_testcase]["listStep"][el_Step]["_id"],
            stepDefine: array1[el_testcase]["listStep"][el_Step]["stepDefine"],
            expectResult: array1[el_testcase]["listStep"][el_Step]["expectResult"],
            type: array1[el_testcase]["listStep"][el_Step]["type"]
          });
        }
      }

      execution_infor_temp.push({
        testexecutionname: exist_build["testexecution"][i]["testexecutionname"],
        description: exist_build["testexecution"][i]["description"],
        testplanname: inforBuild.testplanname,
        buildname: newbuild,
        is_public: exist_build["testexecution"][i]["is_public"],
        is_active: exist_build["testexecution"][i]["is_active"],
        assigntester: exist_build["testexecution"][i]["tester"],
        listexectestcases: list_testcase,
        exist_testexecution: ""
      })
      list_testcase = [];
    }

    for(let i in execution_infor_temp){
      
      if(execution_infor_temp[i]["assigntester"] !== "" && execution_infor_temp[i]["assigntester"] !== undefined){
        
        const tester:any = project.members.find
        (element => element.username === execution_infor_temp[i]["assigntester"]["username"]);

        const newTestExecution = new TestExecutionSchema({
          is_active: execution_infor_temp[i]["is_active"],
          is_public: execution_infor_temp[i]["is_public"],
          description: execution_infor_temp[i]["description"],
          testexecutionname: execution_infor_temp[i]["testexecutionname"],
          testplan: exist_build.testplan,
          tester: execution_infor_temp[i]["assigntester"]["_id"],
          build: newbuild._id,
          exectestcases: execution_infor_temp[i]["listexectestcases"]
        });
        const testexecution = await newTestExecution.save();
    
        //add to project
        const addTestExecutionForProject = await ProjectSchema.findByIdAndUpdate(
            projectId,
            { $push: { testexecution: testexecution._id } },
            { new: true, useFindAndModify: false }
          );
    
        //add to testplan
        const addTestExecutionForTestplan = await TestPlanSchema.findOneAndUpdate(
          {_id: exist_build.testplan},
          { $push: { testexecution: testexecution._id } },
          { new: true, useFindAndModify: false }
        );

        //add to build
        const addTestExecutionForBuild = await BuildSchema.findOneAndUpdate(
          {_id: newbuild._id},
          { $push: { testexecution: testexecution._id } },
          { new: true, useFindAndModify: false }
        );
    
        //add to user tester
          const addTestExecutionForUser = await UserSchema.findOneAndUpdate(
            {_id: execution_infor_temp[i]["assigntester"]["_id"]},
            { $push: { testexecution: testexecution._id } },
            { new: true, useFindAndModify: false }
          );  

    
      } else{
        const newTestExecution = new TestExecutionSchema({
          is_active: execution_infor_temp[i]["is_active"],
          is_public: execution_infor_temp[i]["is_public"],
          description: execution_infor_temp[i]["description"],
          testexecutionname: execution_infor_temp[i]["testexecutionname"],
          testplan: exist_build.testplan,
          build: newbuild._id,
          exectestcases: execution_infor_temp[i]["listexectestcases"]
        });
        const testexecution = await newTestExecution.save();
    
        //add to project
        const addTestExecutionForProject = await ProjectSchema.findByIdAndUpdate(
            projectId,
            { $push: { testexecution: testexecution._id } },
            { new: true, useFindAndModify: false }
          );
    
        //add to testplan
        const addTestExecutionForTestplan = await TestPlanSchema.findOneAndUpdate(
          {_id: exist_build.testplan},
          { $push: { testexecution: testexecution._id } },
          { new: true, useFindAndModify: false }
        );

        //add to build
        const addTestExecutionForBuild = await BuildSchema.findOneAndUpdate(
          {_id: newbuild._id},
          { $push: { testexecution: testexecution._id } },
          { new: true, useFindAndModify: false }
        );

      }
      
    }

  }


}
export default BuildService;