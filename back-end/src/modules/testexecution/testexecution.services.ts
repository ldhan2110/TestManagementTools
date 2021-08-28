import { HttpException } from "@core/exceptions";
import { IProject, ProjectSchema } from "@modules/project";
import { ITestPlan, TestPlanSchema } from "@modules/testplan";
import { ITestExecution, TestExecutionRoute, TestExecutionSchema } from "@modules/testexecution";
import CreateTestExecutionDto from "./dtos/create_testexecution.dto";
import { UserSchema } from "@modules/users";
import ExecTestcaseDto from "./dtos/exec_testcase.dto";
import ExecTestexecutionDto from "./dtos/exec_testexecution.dto";
import { TestSuiteSchema } from "@modules/TestSuite";
import { ITestCase, TestCaseSchema } from "@modules/testcase";
import { BuildSchema } from "@modules/build";
import DuplicateTestExecutionDto from "./dtos/duplicate_testexecution.dto";
import CreateNotificationDto from "@modules/notification/dtos/create_notification.dto";
import NotificationService from "@modules/notification/notification.services";
import { ProjectRequirementSchema } from "@modules/projectrequirement";
import UpdateTestExecutionDto from "./dtos/update_testexecution.dto";
import AddIssueToExecutionDto from "./dtos/add_issue.dto";
import { IIssue_Execution } from "./testexecution.interface";

class TestExecutionService {
  public testexecutionSchema = TestExecutionSchema;
  private notificationService = new NotificationService();

  public async createTestExecutionAndAddProject(
    createtestexecutionDto: CreateTestExecutionDto,
    projectId: string): Promise<ITestExecution> 
  {
    // check project  
    const project = await ProjectSchema.findById(projectId, 'projectname testexecution testplan members')
    .populate({
      path: 'testexecution',
      select: 'testexecutionname'
    })
    .populate({
      path: 'testplan',
      select: 'testplanname'
    })
    .populate({
      path: 'build',
      select: 'buildname'
    })
    .exec();
    if (!project) throw new HttpException(400, 'Project is not exist');

    //check name testplan in project
    const testplan:any = project.testplan.find
    (element => element.testplanname === createtestexecutionDto.testplanname);
    if(testplan === "" || testplan === undefined)
    {throw new HttpException(400, 'Name testplan not existed in project');}

    // check build name in project
    const build:any = project.build.find
    (element => element.buildname === createtestexecutionDto.buildname);
    if(build === "" || build === undefined)
    {throw new HttpException(400, 'Name build not existed in project');}

    // check name test execution in build
    const buildOfProject = await BuildSchema.findOne({buildname: createtestexecutionDto.buildname, testplan: testplan._id})
    .populate({
      path: 'testexecution',
      select: 'testexecutionname'
    }).exec();
    if (!buildOfProject) throw new HttpException(400, 'build is not exist in testplan');
    if(buildOfProject.testexecution && buildOfProject.testexecution.some
    (item => item.testexecutionname === createtestexecutionDto.testexecutionname)) 
    {throw new HttpException(400, 'Name testexecution existed in build');}

    // copy list testcaseid selected to variable list_testcase
    const array1:any = createtestexecutionDto.listexectestcases;
    const list_testcase = [];
    for (let element in array1) list_testcase.push( array1[element].testcaseid);

   // select infor list testcaseid
   const before = await TestCaseSchema.find({
    '_id': { $in: list_testcase}})
    .select('type testcaseName description priority testsuite listStep precondition postcondition')
    .populate({
      path: 'listStep',
      select: 'stepDefine expectResult type -_id'
    })
    .exec();
  
    // new testexecution
    if(createtestexecutionDto.assigntester !== "" && createtestexecutionDto.assigntester !== undefined){
      const tester:any = project.members.find
      (element => element.username === createtestexecutionDto.assigntester);

      const newTestExecution = new TestExecutionSchema({
        ...createtestexecutionDto,
        is_active: createtestexecutionDto.is_active,
        is_public: createtestexecutionDto.is_public,
        description: createtestexecutionDto.description,
        testexecutionname: createtestexecutionDto.testexecutionname,
        project: projectId,
        listtestcases: list_testcase,
        testplan: testplan._id,
        tester: tester.user,
        build: build._id,
        exectestcases: before
      });
      const testexecution = await newTestExecution.save();
  
      // add to list testcase
      for(let element of list_testcase){
        const addTestExecutionForTestcase = await TestCaseSchema.findByIdAndUpdate(
          element,
          { $push: { testexecution: testexecution._id } },
          { new: true, useFindAndModify: false }
        );
      }
      //add to project
      const addTestExecutionForProject = await ProjectSchema.findByIdAndUpdate(
          projectId,
          { $push: { testexecution: testexecution._id } },
          { new: true, useFindAndModify: false }
        );
  
      //add to testplan
      const addTestExecutionForTestplan = await TestPlanSchema.findOneAndUpdate(
        {testplanname: createtestexecutionDto.testplanname, project: projectId},
        { $push: { testexecution: testexecution._id } },
        { new: true, useFindAndModify: false }
      );

      //add to build
      const addTestExecutionForBuild = await BuildSchema.findOneAndUpdate(
        {buildname: createtestexecutionDto.buildname, testplan: testplan._id},
        { $push: { testexecution: testexecution._id } },
        { new: true, useFindAndModify: false }
      );
  
      //add to user tester
      if(createtestexecutionDto.assigntester !== "" && createtestexecutionDto.assigntester !== undefined){
        const addTestExecutionForUser = await UserSchema.findOneAndUpdate(
          {username: createtestexecutionDto.assigntester},
          { $push: { testexecution: testexecution._id } },
          { new: true, useFindAndModify: false }
        );    
      }

      //add to requirement
      async function addTestExecutionForProjectRequirement(idProjectRequirement: string) {
        const addTestExecutionForProjectRequirement = await ProjectRequirementSchema.findOneAndUpdate(
          {_id: idProjectRequirement},
          { $push: { testexecution: testexecution._id } },
          { new: true, useFindAndModify: false }
        ); 
      }
      if(createtestexecutionDto.listrequirement.length > 0 && createtestexecutionDto.listrequirement !== undefined){
        createtestexecutionDto.listrequirement.forEach(element => {
          addTestExecutionForProjectRequirement(element);
        });
      }

      // set testcase is assigned
      for (let element of list_testcase) {
        const totalAssigned:any = await TestCaseSchema.findById(element, 'total_assigned').exec();

        const updateAssignTestcase = await TestCaseSchema.findOneAndUpdate(
          {_id: element},
          {$set: {
            is_assigned: true,
            total_assigned: totalAssigned.total_assigned + 1
          }},{new: true}).exec();
      }

      let requirement = {id: "sss"};
      //add requirement to execution
      async function addProjectRequirementForExecution(idProjectRequirement: any) {
        const addTestExecutionForProjectRequirement = await TestExecutionSchema.findOneAndUpdate(
          {_id: testexecution._id},
          { $push: { listprojectrequirement: idProjectRequirement.id } },
          { new: true, useFindAndModify: false }
        );
        
        const updateProjectRequirement = await ProjectRequirementSchema.findOneAndUpdate(
        {_id: idProjectRequirement.id},
        {$set: {
          status : false,
          updated_date: Date.now()
        }},{new: true}).exec();
        if (!updateProjectRequirement) throw new HttpException(400, 'Update updateProjectRequirement is not success');
      }
      if(createtestexecutionDto.listrequirement.length > 0 && createtestexecutionDto.listrequirement !== undefined){
        createtestexecutionDto.listrequirement.forEach(element => {
          requirement.id = element;
          addProjectRequirementForExecution(requirement);
        });
      }

      const model: CreateNotificationDto = {
        description: `you has already been assigned for test execution ${testexecution.testexecutionname} in project ${project.projectname}`,
        is_read: false,
        url: `https://testcontrols.herokuapp.com/projects/${projectId}/test-execution/${testexecution._id}`,
        user: tester.user
      }

      const newNotification = await this.notificationService.createNotification(model, projectId);
  
      return testexecution;
    } else{
      const newTestExecution = new TestExecutionSchema({
        ...createtestexecutionDto,
        is_active: createtestexecutionDto.is_active,
        is_public: createtestexecutionDto.is_public,
        description: createtestexecutionDto.description,
        testexecutionname: createtestexecutionDto.testexecutionname,
        project: projectId,
        listtestcases: list_testcase,
        testplan: testplan._id,
        build: build._id,
        exectestcases: before
      });
      const testexecution = await newTestExecution.save();
  
      // add to list testcase
      for(let element of list_testcase){
        const addTestExecutionForTestcase = await TestCaseSchema.findByIdAndUpdate(
          element,
          { $push: { testexecution: testexecution._id } },
          { new: true, useFindAndModify: false }
        );
      }

      //add to project
      const addTestExecutionForProject = await ProjectSchema.findByIdAndUpdate(
          projectId,
          { $push: { testexecution: testexecution._id } },
          { new: true, useFindAndModify: false }
        );
  
      //add to testplan
      const addTestExecutionForTestplan = await TestPlanSchema.findOneAndUpdate(
        {testplanname: createtestexecutionDto.testplanname, project: projectId},
        { $push: { testexecution: testexecution._id } },
        { new: true, useFindAndModify: false }
      );

      //add to build
      const addTestExecutionForBuild = await BuildSchema.findOneAndUpdate(
        {buildname: createtestexecutionDto.buildname, testplan: testplan._id},
        { $push: { testexecution: testexecution._id } },
        { new: true, useFindAndModify: false }
      );

      //add to requirement
      async function addTestExecutionForProjectRequirement(idProjectRequirement: string) {
        const addTestExecutionForProjectRequirement = await ProjectRequirementSchema.findOneAndUpdate(
          {_id: idProjectRequirement},
          { $push: { testexecution: testexecution._id } },
          { new: true, useFindAndModify: false }
        ); 
      }
      if(createtestexecutionDto.listrequirement.length > 0 && createtestexecutionDto.listrequirement !== undefined){
        createtestexecutionDto.listrequirement.forEach(element => {
          addTestExecutionForProjectRequirement(element);
        });
      }
      
      // set testcase is assigned
      for (let element of list_testcase) {
        const totalAssigned:any = await TestCaseSchema.findById(element, 'total_assigned').exec();

        const updateAssignTestcase = await TestCaseSchema.findOneAndUpdate(
          {_id: element},
          {$set: {
            is_assigned: true,
            total_assigned: totalAssigned.total_assigned + 1
          }},{new: true}).exec();
      }

      let requirement = {id: "sss"};
      //add requirement to execution
      async function addProjectRequirementForExecution(idProjectRequirement: any) {
        const addTestExecutionForProjectRequirement = await TestExecutionSchema.findOneAndUpdate(
          {_id: testexecution._id},
          { $push: { listprojectrequirement: idProjectRequirement.id } },
          { new: true, useFindAndModify: false }
        );
        
        const updateProjectRequirement = await ProjectRequirementSchema.findOneAndUpdate(
        {_id: idProjectRequirement.id},
        {$set: {
          status : false,
          updated_date: Date.now()
        }},{new: true}).exec();
        if (!updateProjectRequirement) throw new HttpException(400, 'Update updateProjectRequirement is not success');
      }
      if(createtestexecutionDto.listrequirement.length > 0 && createtestexecutionDto.listrequirement !== undefined){
        createtestexecutionDto.listrequirement.forEach(element => {
          requirement.id = element;
          addProjectRequirementForExecution(requirement);
        });
      }

      return testexecution;
    }

  }

  public async addProjectRequirementForExecution(idProjectRequirement: any, testexecutionid: string) {
    const addTestExecutionForProjectRequirement = await TestExecutionSchema.findOneAndUpdate(
      {_id: testexecutionid},
      { $push: { listprojectrequirement: idProjectRequirement.id } },
      { new: true, useFindAndModify: false }
    );
    
    const updateProjectRequirement = await ProjectRequirementSchema.findOneAndUpdate(
    {_id: idProjectRequirement.id},
    {$set: {
      status : false,
      updated_date: Date.now()
    }},{new: true}).exec();
    if (!updateProjectRequirement) throw new HttpException(400, 'Update updateProjectRequirement is not success');
  }

  public async getAllTestExecutionOfProject(projectId: string) {
    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project id is not exist');
    
    const testexecutionIds = project.testexecution.map((testexecutionid) => {
      return testexecutionid._id;
    });

    const testexecutions:any = await TestExecutionSchema.find({_id: testexecutionIds}, 
    'testexecutionname description testplan status is_public is_active tester build exectestcases listprojectrequirement created_user issue')
    .populate({
      path: 'exectestcases',
      select: 'status note -_id'
      //populate: [{ path: 'testcaseid', select: 'testcaseName description testsuite listStep type priority' }]
    })
    .populate({
      path: 'testplan',
      select: 'testplanname'
    })
    .populate({
      path: 'issue',
      select: 'issue_id url'
    })
    .populate({
      path: 'tester',
      select: 'username'
    })
    .populate({
      path: 'build',
      select: 'buildname'
    })
    .populate({
      path: 'listprojectrequirement',
      select: 'projectrequirementname'
    })
    .exec();

    let list_execution:any = [{
      is_active: {type: Boolean},
      is_public: {type: Boolean},
      status: {type: String},
      _id: {type: String},
      testexecutionname: {type: String},
      description: {type: String},
      testplan: {
        _id:{type: String},
        testplanname:{type: String}
      },
      tester: {
        _id:"",
        user:""
      },
      listprojectrequirement: {
        _id:"",
        projectrequirementname:""
      },
      build: {
        _id: {type: String},
        builname: {type: String}
      },
      exectestcases:[
        {
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
        }
      ],
      issue:[
        {
          issue_id: {type:String},
          url: {type:String},
          
        }
      ]
    }]; list_execution.pop();

    for(let element in testexecutions){
      list_execution.push({
        is_active: testexecutions[element]["is_active"],
        is_public: testexecutions[element]["is_public"],
        status: testexecutions[element]["status"],
        _id: testexecutions[element]["_id"],
        testexecutionname: testexecutions[element]["testexecutionname"],
        description: testexecutions[element]["description"],
        testplan: testexecutions[element]["testplan"],
        tester: testexecutions[element]["tester"],
        listprojectrequirement: testexecutions[element]["listprojectrequirement"],
        build: testexecutions[element]["build"],
        exectestcases: [],
        issue: []
      });
      
      if(testexecutions[element]["tester"] == undefined || testexecutions[element]["tester"] == "" || testexecutions[element]["tester"] == null){
        list_execution[element]["tester"] = {
          id:"",
          username:""
        };
        //list_execution[element]["tester"]["user"] = "";
      }

      if(testexecutions[element]["listprojectrequirement"] == undefined || testexecutions[element]["listprojectrequirement"] == "" || testexecutions[element]["listprojectrequirement"] == null){
        list_execution[element]["listprojectrequirement"] = []
        //list_execution[element]["listprojectrequirement"]["user"] = "";
      }

      for(let j in testexecutions[element]["exectestcases"]){
        list_execution[element].exectestcases.push(testexecutions[element]["exectestcases"][j]);
      }

      for(let j in testexecutions[element]["issue"]){
        list_execution[element].issue.push(testexecutions[element]["issue"][j]);
      }

    }

    return list_execution;
    
  }

  public async getSixTestExecutionNewest(projectId: string) {
    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project id is not exist');
    
    const testexecutionIds = project.testexecution.map((testexecutionid) => {
      return testexecutionid._id;
    });

    const testexecutions:any = await TestExecutionSchema.find({_id: testexecutionIds, is_active: true}, 
    'testexecutionname status tester created_date updated_date -_id')
    .populate({
      path: 'tester',
      select: 'username'
    })
    .sort({ updated_date: 'desc' })
    .limit(6)
    .exec();

    let list_execution:any = [{
      created_date: {type: String},
      updated_date: {type: String},
      status: {type: String},
      testexecutionname: {type: String},
      tester: {type: String, required: true, default:{
        _id: {required: true, default:"s"},
        user: {required: true, default:"s"}
      }},
    }]; list_execution.pop();

    for(let element in testexecutions){

      var day_created = testexecutions[element]["created_date"].getDate();
            if(day_created<10){
              day_created = '0'+day_created;
            }
            var month_created = testexecutions[element]["created_date"].getMonth()+1;
            if(month_created<10){
              month_created = '0'+month_created;
            }
            var year_created = testexecutions[element]["created_date"].getFullYear();

            var day_updated = testexecutions[element]["updated_date"].getDate();
            if(day_updated<10){
              day_updated = '0'+day_updated;
            }
            var month_updated = testexecutions[element]["updated_date"].getMonth()+1;
            if(month_updated<10){
              month_updated = '0'+month_updated;
            }
            var year_updated = testexecutions[element]["updated_date"].getFullYear();

      if(testexecutions[element]["tester"] == undefined || testexecutions[element]["tester"] == "" 
        || testexecutions[element]["tester"] == null){
        list_execution.push({
          id: element,
          created_date: day_created+'-'+month_created+'-'+year_created,
          updated_date: day_updated+'-'+month_updated+'-'+year_updated,
          status: testexecutions[element]["status"],
          testexecutionname: testexecutions[element]["testexecutionname"],
          tester: {
            _id: "",
            tester: ""
          }
        });
      } 
      else{
        list_execution.push({
          id: element,
          created_date: day_created+'-'+month_created+'-'+year_created,
          updated_date: day_updated+'-'+month_updated+'-'+year_updated,
          status: testexecutions[element]["status"],
          testexecutionname: testexecutions[element]["testexecutionname"],
          tester: testexecutions[element]["tester"],
        });
      }
    }
    return list_execution;
    
  }

  public async searchTestExecutionOfProject(projectId: string, keyword: string): Promise<Partial<ITestExecution>[]> {
    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project id is not exist');
    
    const testexecutionIds = project.testexecution.map((testexecutionid) => {
      return testexecutionid._id;
    });

    const testexecutions:any = await TestExecutionSchema.find({_id: testexecutionIds, testexecutionname: new RegExp(keyword, 'i')}, 
    'testexecutionname description testplan status is_public is_active tester build exectestcases created_user')
    .populate({
      path: 'exectestcases',
      select: 'status note -_id'
      //populate: [{ path: 'testcaseid', select: 'testcaseName description testsuite listStep type priority' }]
    })
    .populate({
      path: 'testplan',
      select: 'testplanname'
    })
    .populate({
      path: 'tester',
      select: 'username'
    })
    .populate({
      path: 'build',
      select: 'buildname'
    })
    .exec();

    return testexecutions;
  }

  public async execTestcase(
    execTestcaseDto: ExecTestcaseDto,
    exectestcaseId: string,
    projectId: string,
    userId: string)
  {
    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Execution is not exist');
    //const testcase = await TestCaseSchema.findById(execTestcaseDto.testcaseid).exec();
    //if (!testcase) throw new HttpException(400, 'TestcaseId is not exist'); 
    if(execTestcaseDto.status == "Untest")
    throw new HttpException(400, 'Status of testcase can not be Untest');

    const execution = await TestExecutionSchema.findById(exectestcaseId, 'exectestcases tester')
    .populate({
      path: 'exectestcases',
      select: 'status note testcaseid'
    })
    .exec();
    if (!execution) throw new HttpException(400, 'Testexecution is not exist');

    if(userId == execution.tester || execution.tester == "" || execution == undefined || execution.tester == null){
      const updateExecution = await TestExecutionSchema.updateOne(
        {_id: execution._id, "exectestcases._id": execTestcaseDto.testcaseid},
        {$set: {
        "exectestcases.$.listStep": execTestcaseDto.listStep,
        "exectestcases.$.status": execTestcaseDto.status,
        "exectestcases.$.note": execTestcaseDto.note
        }})
        .exec();
        if (!updateExecution) throw new HttpException(400, 'Update TestExecution is not success');
        execution.save();
        
        return execution;
    }
    else{
      throw new HttpException(400, 'you not allowed to execute this testcase');
    }

  }

  public async execTestExecution(
    execTestcaseDto: ExecTestexecutionDto,
    exectestexecutionId: string,
    projectId: string,
    userId: string)
  {
    const project = await ProjectSchema.findById(projectId)
    .exec();
    if (!project) throw new HttpException(400, 'Execution is not exist');

    const execution:any = await TestExecutionSchema.findById(exectestexecutionId).exec();
    if (!execution) throw new HttpException(400, 'Test execution is not exist');

    for(let i in execution.exectestcases){
      if(execution.exectestcases[i]["status"] == "Pass" || execution.exectestcases[i]["status"] == "Fail"
      || execution.exectestcases[i]["status"] == "Blocked"){

      }
      else{
        throw new HttpException(400, 'You have not tested all the testcases');
      }
    }

    if(execTestcaseDto.status == "Untest")
    throw new HttpException(400, 'Status of test execution can not be Untest');

    if(userId == execution.tester || execution.tester == "" || execution.tester == undefined || execution.tester == null){
    const updateTestexecution = await TestExecutionSchema.findOneAndUpdate(
    {_id: execution._id},
    {$set: {
      status: execTestcaseDto.status,
      updated_date: Date.now(),
      updated_user: userId
    }},
    {new: true})
    .exec();
    if (!execution) throw new HttpException(400, 'Update TestExecution is not success');

    //check requirement complete?
    if(execution.listprojectrequirement.length > 0 && execution.listprojectrequirement !== undefined){
      //let isComplete = false;
      execution.listprojectrequirement.forEach(async (element: string) => {
        const isComplete = await this.checkStatusListExecutionOfProjectRequirement(element);
        if(isComplete){
            const updateProjectRequirement = await ProjectRequirementSchema.findOneAndUpdate(
              {_id: element},
              {$set: {
                status : true,
                updated_date: Date.now()
              }},
              {new: true})
              .exec();
              if (!updateProjectRequirement) throw new HttpException(400, 'Update updateProjectRequirement is not success');
        }
        else{
          const updateProjectRequirement = await ProjectRequirementSchema.findOneAndUpdate(
            {_id: element},
            {$set: {
              status : false,
              updated_date: Date.now()
            }},
            {new: true})
            .exec();
            if (!updateProjectRequirement) throw new HttpException(400, 'Update updateProjectRequirement is not success');
        }
      });
    }
    return execution;
    }
    else{
     throw new HttpException(400, 'you not allowed to execute this testexecution');
    }

  }

//start funtion of update test execution
  public async changeBuildAndTestPlanOfTestExecution(
    testplanId: string,
    buildId: string,
    exectestexecutionId: string,)
  {

    const execution:any = await TestExecutionSchema.findById(exectestexecutionId).exec();
    if (!execution) throw new HttpException(400, 'Test execution is not exist');

    const oldtestplan = await TestPlanSchema.findById(execution.testplan)
    .populate({
      path: 'build',
      select: 'buildname'
    }).exec();
    if (!oldtestplan) throw new HttpException(400, 'Testplan is not exist');

    const oldbuild = await BuildSchema.findById(execution.build)
    .populate({
      path: 'testexecution',
      select: 'testexecutionname'
    }).exec();
    if (!oldbuild) throw new HttpException(400, 'Build is not exist');

    const newbuild = await BuildSchema.findById(buildId)
    .populate({
      path: 'testexecution',
      select: 'testexecutionname'
    }).exec();
    if (!newbuild) throw new HttpException(400, 'Build is not exist');

    if(execution.build == buildId){}
    else{
      if(execution.testplan == testplanId){
        if(oldtestplan.build && oldtestplan.build.some
          (item => item._id === buildId)) 
        {throw new HttpException(400, `Build ${newbuild.buildname} doesn't belong to testplan  ${oldtestplan.testplanname}`);}

        const updateTestexecution = await TestExecutionSchema.findOneAndUpdate(
          {_id: execution._id},
          {$set: {
            build: buildId,
            updated_date: Date.now()
          }},
          {new: true}).exec();
          if (!execution) throw new HttpException(400, 'Update TestExecution is not success');
        //remove  oldbuild 
        const removeOldbuild = await BuildSchema.findById(execution.build).exec();
        if (!removeOldbuild){throw new HttpException(400, 'Build is not success');}
        else{
          removeOldbuild.testexecution = removeOldbuild.testexecution.filter(({ _id }) => _id?.toString() !== execution._id?.toString());
          await removeOldbuild.save();
        }
        //add new build
        const addNewBuild = await BuildSchema.findOneAndUpdate(
          {_id: buildId},
          { $push: { testexecution: execution._id } },
          { new: true, useFindAndModify: false }
        );
        if (!execution) throw new HttpException(400, 'Change Build is not success');
      }
      else{
        if(oldtestplan.build && oldtestplan.build.some
          (item => item._id === buildId)) 
        {throw new HttpException(400, `Build ${newbuild.buildname} doesn't belong to testplan  ${oldtestplan.testplanname}`);}

        const updateTestexecution = await TestExecutionSchema.findOneAndUpdate(
          {_id: execution._id},
          {$set: {
            build: buildId,
            testplan: testplanId,
            updated_date: Date.now()
          }},
          {new: true}).exec();
          if (!execution) throw new HttpException(400, 'Update TestExecution is not success');
        //remove  oldbuild 
        const removeOldbuild = await BuildSchema.findById(execution.build).exec();
        if (!removeOldbuild){throw new HttpException(400, 'Build is not exist');}
        else{
          removeOldbuild.testexecution = removeOldbuild.testexecution.filter(({ _id }) => _id?.toString() !== execution._id?.toString());
          await removeOldbuild.save();
        }
        //add new build
        const addNewBuild = await BuildSchema.findOneAndUpdate(
          {_id: buildId},
          { $push: { testexecution: execution._id } },
          { new: true, useFindAndModify: false }
        );
        if (!execution) throw new HttpException(400, 'Change Build is not success');

        //remove oldtestplan
        const removeOldTestplan = await TestPlanSchema.findById(execution.testplan).exec();
        if (!removeOldTestplan){throw new HttpException(400, 'Testplan is not exist');}
        else{
          removeOldTestplan.testexecution = removeOldTestplan.testexecution.filter(({ _id }) => _id?.toString() !== execution._id?.toString());
          await removeOldTestplan.save();
        }

        //add new testplan
        const addNewTestplan = await TestPlanSchema.findOneAndUpdate(
          {_id: testplanId},
          { $push: { testexecution: execution._id } },
          { new: true, useFindAndModify: false }
        );
        if (!execution) throw new HttpException(400, 'Change Testplan is not success');
      }
    }
  }

  public async updateSingleFieldOfTestExecution(
    testexecutionname: string,
    is_active: boolean,
    is_public: boolean,
    description: string,
    testexecutionId: string)
  {

    const execution:any = await TestExecutionSchema.findById(testexecutionId).exec();
    if (!execution) throw new HttpException(400, 'Test execution is not exist');



    const updateTestexecution = await TestExecutionSchema.findOneAndUpdate(
      {_id: execution._id},
      {$set: {  
        testexecutionname: testexecutionname,
        is_active: is_active,
        is_public: is_public,
        description: description,       
        updated_date: Date.now()
      }},
      {new: true}).exec();
      if (!execution) throw new HttpException(400, 'Update TestExecution is not success');
        
  }

  public async updateListProjectRequirementOfTestExecution(
    list_projectrequirement: string[],
    testexecutionId: string)
  {
  
    const execution:any = await TestExecutionSchema.findById(testexecutionId).exec();
    if (!execution) throw new HttpException(400, 'Test execution is not exist');

    // replace list projectrequirement
    const removeProjectRequirementFromExecution = await this.removeProjectRequirementFromExecution(execution._id);
    
    const updateTestexecution = await TestExecutionSchema.findOneAndUpdate(
      {_id: execution._id},
      {$set: {        
        listprojectrequirement: [],
        updated_date: Date.now()
      }},
      {new: true}).exec();
      if (!execution) throw new HttpException(400, 'Update list Project Requirement TestExecution is not success');

    //add to requirement
    async function addTestExecutionForProjectRequirement(idProjectRequirement: string) {
      const addTestExecutionForProjectRequirement = await ProjectRequirementSchema.findOneAndUpdate(
        {_id: idProjectRequirement},
        { $push: { testexecution: execution._id } },
        { new: true, useFindAndModify: false }
      ); 
    }
    if(list_projectrequirement.length > 0 && list_projectrequirement !== undefined){
      list_projectrequirement.forEach(element => {
        if(element != null && element != undefined){
          addTestExecutionForProjectRequirement(element);
        }
      });
    }

    let requirement = {id: "sss"};
    //add requirement to execution
    async function addProjectRequirementForExecution(idProjectRequirement: any) {
      const addTestExecutionForProjectRequirement = await TestExecutionSchema.findOneAndUpdate(
        {_id: execution._id},
        { $push: { listprojectrequirement: idProjectRequirement.id } },
        { new: true, useFindAndModify: false }
      );
      
      const updateProjectRequirement = await ProjectRequirementSchema.findOneAndUpdate(
      {_id: idProjectRequirement.id},
      {$set: {
        status : false,
        updated_date: Date.now()
      }},{new: true}).exec();
      if (!updateProjectRequirement) throw new HttpException(400, 'Update Status ProjectRequirement is not success');
    }
    if(list_projectrequirement.length > 0 && list_projectrequirement !== undefined){
      list_projectrequirement.forEach(element => {
        if(element != null && element != undefined ){
          requirement.id = element;
          addProjectRequirementForExecution(requirement);
        }

      });
    }
        
  }

  public async changeTesterOfTestExecution(
    newTester: {_id: string, username: string},
    testexecutionId: string,
    projectId: string)
  {

    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Execution is not exist');

    const execution:any = await TestExecutionSchema.findById(testexecutionId).exec();
    if (!execution) throw new HttpException(400, 'Test execution is not exist');

        // type change tester
        let haveTester = -1;
        if(execution.tester == undefined || execution.tester == null || execution.tester == "")
        {
          if(newTester._id == ""){
            haveTester == 1
    
          }
          else{
            haveTester = 2;        
          }
        }
        else{
          const tester = await UserSchema.findById(execution.tester).exec();
          if (!tester){}
          else{
            tester.testexecution = tester.testexecution.filter(({ _id }) => _id.toString() !== testexecutionId.toString());
            await tester.save();
          }
    
          if(newTester._id == ""){
            haveTester = 3
          }
          else{
            haveTester = 4;      
          }
        }

        if(newTester._id == undefined || newTester._id == null || newTester._id == ""){
          const updateTestexecution = await TestExecutionSchema.findOneAndUpdate(
            {_id: execution._id},
            {$set: {
              tester: undefined,
              updated_date: Date.now()
            }},{new: true}).exec();
            if (!execution) throw new HttpException(400, 'Update TestExecution is not success');     
          
          if(haveTester == 3){
            const model2: CreateNotificationDto = {
              description: `you has already been revoked test execution ${execution.testexecutionname} in project ${project.projectname}`,
              is_read: false,
              url: `https://testcontrols.herokuapp.com/projects/${projectId}/test-execution/${execution._id}`,
              user: execution.tester
            }
            const newNotification2 = await this.notificationService.createNotification(model2, projectId);
          }
        }
        else{
          const updateTestexecution = await TestExecutionSchema.findOneAndUpdate(
            {_id: execution._id},
            {$set: {
              tester: newTester._id,
              updated_date: Date.now()
            }},{new: true}).exec();
            if (!execution) throw new HttpException(400, 'Update TestExecution is not success');   

          //add to user tester
          if(newTester._id != "" && newTester._id != undefined){
            const addTestExecutionForUser = await UserSchema.findOneAndUpdate(
              {username: newTester._id},
              { $push: { testexecution: execution._id } },
              { new: true, useFindAndModify: false }
            );    
          }

          if(haveTester == 2){
            const model: CreateNotificationDto = {
              description: `you has already been assigned for test execution ${execution.testexecutionname} in project ${project.projectname}`,
              is_read: false,
              url: `https://testcontrols.herokuapp.com/projects/${projectId}/test-execution/${execution._id}`,
              user: newTester._id
            }
            const newNotification = await this.notificationService.createNotification(model, projectId);
          }
          if(haveTester == 4){
            const model: CreateNotificationDto = {
              description: `you has already been assigned for test execution ${execution.testexecutionname} in project ${project.projectname}`,
              is_read: false,
              url: `https://testcontrols.herokuapp.com/projects/${projectId}/test-execution/${execution._id}`,
              user: newTester._id
            }
            const newNotification = await this.notificationService.createNotification(model, projectId);

            const model2: CreateNotificationDto = {
              description: `you has already been revoked test execution ${execution.testexecutionname} in project ${project.projectname}`,
              is_read: false,
              url: `https://testcontrols.herokuapp.com/projects/${projectId}/test-execution/${execution._id}`,
              user: execution.tester
            }
            const newNotification2 = await this.notificationService.createNotification(model2, projectId);
          }
        }   
  }

  public async updateListTestcaseOfTestExecution(
    list_testcase: ITestCase[],
    testexecutionId: string)
  {
    const execution:any = await TestExecutionSchema.findById(testexecutionId).exec();
    if (!execution) throw new HttpException(400, 'Test execution is not exist');

    const removeTestcaseFromExecution = await this.removeTestcaseFromExecution(execution._id)

    // replace list_testcase
    const listTestcaseExec:any = list_testcase;
    const list_testcase_untest_id = [];
    const list_testcaseId = [];
    for (let element of listTestcaseExec){
      if(element != null && element != undefined){
        if(element.type != "TC")
          list_testcase_untest_id.push( element._id);
        list_testcaseId.push( element._id);
      }
    }
    const list_testcase_not_untest = [];
    for (let element of listTestcaseExec){
      if(element.type == "TC")
      list_testcase_not_untest.push( element);
    }  
    // select infor list testcaseid
    const list_testcase_untest = await TestCaseSchema.find({'_id': { $in: list_testcase_untest_id}})
    .select('type testcaseName description priority testsuite listStep precondition postcondition')
    .populate({
      path: 'listStep',
      select: 'stepDefine expectResult type -_id'
    }).exec();

    //update execution
      const updateTestexecution = await TestExecutionSchema.findOneAndUpdate(
        {_id: execution._id},
        {$set: {
          listtestcases: list_testcaseId,
          exectestcases: list_testcase_not_untest.concat(list_testcase_untest),
          updated_date: Date.now()
        }},{new: true}).exec();
        if (!execution) throw new HttpException(400, 'Update TestExecution is not success');     
      // set testcase is assigned
      const updateAssignTestcase = await this.updateAssignTestcase(list_testcaseId, execution._id);
  }

  public async updateTestExecution(
    updateTestcaseDto: UpdateTestExecutionDto,
    exectestexecutionId: string,
    projectId: string,
    userId: string)
  {
    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Execution is not exist');

    const build = await BuildSchema.findById(updateTestcaseDto.build._id)
    .populate({
      path: 'testexecution',
      select: 'testexecutionname'
    }).exec();
    if (!build) throw new HttpException(400, 'Build is not exist');

    const testplan:any = await TestPlanSchema.findById(updateTestcaseDto.testplan._id).exec();
    if (!testplan) throw new HttpException(400, 'Testplan is not exist');

    const execution:any = await TestExecutionSchema.findById(exectestexecutionId).exec();
    if (!execution) throw new HttpException(400, 'Test execution is not exist');

    //check name testexecution
    if(updateTestcaseDto.testexecutionname !== execution.testexecutionname){
      if(build.testexecution && build.testexecution.some
        (item => item.testexecutionname === updateTestcaseDto.testexecutionname)) 
      {throw new HttpException(400, 'Name testexecution existed in build');}
    }

    // update execution: change build and testplan
    const changeBuildAndTestplan = await this.changeBuildAndTestPlanOfTestExecution(updateTestcaseDto.testplan._id, updateTestcaseDto.build._id, execution._id);

    //update execution: singe Field
    if(updateTestcaseDto.testexecutionname != execution.testexecutionname || updateTestcaseDto.is_active != execution.is_active
      || updateTestcaseDto.is_public != execution.is_public || updateTestcaseDto.description != execution.description){
        const updateSingelField = await this.updateSingleFieldOfTestExecution(updateTestcaseDto.testexecutionname, updateTestcaseDto.is_active, updateTestcaseDto.is_public,updateTestcaseDto.description, execution._id);
      }

    //update execution: List Project Requirement
    if( updateTestcaseDto.listprojectrequirement != execution.listprojectrequirement){
      const updateListProjectRequirement = await this.updateListProjectRequirementOfTestExecution(updateTestcaseDto.listprojectrequirement, execution._id);
    }

    //update execution: update tester
    if(updateTestcaseDto.tester._id != execution.tester){
      const changeTester = await this.changeTesterOfTestExecution(updateTestcaseDto.tester, execution._id, projectId);
    }

    //update execution: update list testcase
      const updateListTestcase = await this.updateListTestcaseOfTestExecution(updateTestcaseDto.exectestcases, execution._id);

    //check requirement complete?
    if(execution.listprojectrequirement.length > 0 && execution.listprojectrequirement != undefined){
      //let isComplete = false;
      execution.listprojectrequirement.forEach(async (element: string) => {
        const isComplete = await this.checkStatusListExecutionOfProjectRequirement(element);
        if(isComplete){
            const updateProjectRequirement = await ProjectRequirementSchema.findOneAndUpdate(
              {_id: element},
              {$set: {
                status : true,
                updated_date: Date.now()
              }},
              {new: true})
              .exec();
              if (!updateProjectRequirement) throw new HttpException(400, 'Update updateProjectRequirement is not success');
        }
        else{
          const updateProjectRequirement = await ProjectRequirementSchema.findOneAndUpdate(
            {_id: element},
            {$set: {
              status : false,
              updated_date: Date.now()
            }},
            {new: true})
            .exec();
            if (!updateProjectRequirement) throw new HttpException(400, 'Update updateProjectRequirement is not success');
        }
      });
    }

  }

  public async updateAssignTestcase(list_testcaseId: string[], testexecutionId: any) {
    for (let element of list_testcaseId) {

      const addTestExecutionForTestcase = await TestCaseSchema.findByIdAndUpdate(
        element,
        { $push: { testexecution: testexecutionId } },
        { new: true, useFindAndModify: false }
      );
      const updateAssignTestcase = await TestCaseSchema.findOneAndUpdate(
        {_id: element},
        {$set: {
          is_assigned: true
        }},{new: true}).exec();
    }
    return true; 
  }

  public async removeIssueFromTestExecution(projectId: string, testexecutionId: string, issueId: string) 
  {
    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project id is not exist');

    const testexecution = await TestExecutionSchema.findById(testexecutionId)
    .populate({
      path: 'issue',
      select: 'issue_id url'
    }).exec();
    if (!testexecution) throw new HttpException(400, 'Testexecution id is not exist');

    testexecution.issue = testexecution.issue.filter(({ issue_id }) => issue_id?.toString() !== issueId);
    await testexecution.save();

    return true;
  }

  public async addIssueFromTestExecution(projectId: string, testexecutionId: string, model: AddIssueToExecutionDto) 
  {
    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project id is not exist');

    const testexecution = await TestExecutionSchema.findById(testexecutionId).exec();
    if (!testexecution) throw new HttpException(400, 'Testexecution id is not exist');

    testexecution.issue.unshift({ 
      issue_id: model.issue_id,
      url: model.url,
     } as IIssue_Execution);
    await testexecution.save();

    return true;
  }
//end function of update test execution

  public async checkProjectRequirementIsComplete(projectRequirementId: string) {
    const isComplete = await this.checkStatusListExecutionOfProjectRequirement(projectRequirementId);
        if(isComplete){
            const updateProjectRequirement = await ProjectRequirementSchema.findOneAndUpdate(
              {_id: projectRequirementId},
              {$set: {
                status : true,
                updated_date: Date.now()
              }},
              {new: true})
              .exec();
              if (!updateProjectRequirement) throw new HttpException(400, 'Update updateProjectRequirement is not success');
        }
        else{
          const updateProjectRequirement = await ProjectRequirementSchema.findOneAndUpdate(
            {_id: projectRequirementId},
            {$set: {
              status : false,
              updated_date: Date.now()
            }},
            {new: true})
            .exec();
            if (!updateProjectRequirement) throw new HttpException(400, 'Update updateProjectRequirement is not success');
        }
  }

  public async checkStatusListExecutionOfProjectRequirement(projectRequirementId: string) {
    let requirementComplete = false;
    const ProjectRequirement:any = await ProjectRequirementSchema
    .findById(projectRequirementId, 'projectrequirementname testexecution')
    .populate({
      path: 'testexecution'
    }).exec();
    if (!ProjectRequirement) return false;

    for (let element of ProjectRequirement.testexecution) {
      const testExecution = await TestExecutionSchema.findById(element, 'status').exec();
      if (!testExecution) return true;
      if(testExecution.status != "Pass")
        return false;
    }


    return true;
  }

  public async duplicateTestExecution(
    createtestexecutionDto: DuplicateTestExecutionDto,
    projectId: string)
  {    
    //check project exist
    const project = await ProjectSchema.findById(projectId, 'projectname testexecution testplan members build')
    .populate({
      path: 'testexecution',
      select: 'testexecutionname'
    })
    .populate({
      path: 'testplan',
      select: 'testplanname'
    })
    .populate({
      path: 'build',
      select: 'buildname'
    })
    .exec();
    if (!project) throw new HttpException(400, 'Project is not exist');

    const exist_execution:any = await TestExecutionSchema.findOne(
      {_id: createtestexecutionDto.exist_testexecution}, 'exectestcases build testplan listtestcases')
    .exec();
    if (!exist_execution) throw new HttpException(400, 'Testexecution is not exist');

    // check name execution in build
    const buildOfProject = await BuildSchema.findById(exist_execution.build)
    .populate({
      path: 'testexecution',
      select: 'testexecutionname'
    })
    .exec();
    if (!buildOfProject) throw new HttpException(400, 'build is not exist in testplan');

    if(buildOfProject.testexecution && buildOfProject.testexecution.some
    (item => item.testexecutionname === createtestexecutionDto.testexecutionname)) 
    {throw new HttpException(400, 'Name testexecution existed in build');}
    
    // create exectestcase
    const array1:any = JSON.parse(JSON.stringify(exist_execution.exectestcases));
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
  
    if(createtestexecutionDto.assigntester !== "" && createtestexecutionDto.assigntester !== undefined){
      const tester:any = project.members.find
      (element => element.username === createtestexecutionDto.assigntester);

      const newTestExecution = new TestExecutionSchema({
        ...createtestexecutionDto,
        is_active: createtestexecutionDto.is_active,
        is_public: createtestexecutionDto.is_public,
        description: createtestexecutionDto.description,
        testexecutionname: createtestexecutionDto.testexecutionname,
        testplan: exist_execution.testplan,
        tester: tester.user,
        build: exist_execution.build,
        listtestcases: exist_execution.listtestcases,
        exectestcases: list_testcase
      });
      const testexecution = await newTestExecution.save();

      // add to list testcase
      for(let element of list_testcase){
        const addTestExecutionForTestcase = await TestCaseSchema.findByIdAndUpdate(
          element,
          { $push: { testexecution: testexecution._id } },
          { new: true, useFindAndModify: false }
        );
      }
      //add to project
      const addTestExecutionForProject = await ProjectSchema.findByIdAndUpdate(
          projectId,
          { $push: { testexecution: testexecution._id } },
          { new: true, useFindAndModify: false }
        );
  
      //add to testplan
      const addTestExecutionForTestplan = await TestPlanSchema.findOneAndUpdate(
        {_id: exist_execution.testplan},
        { $push: { testexecution: testexecution._id } },
        { new: true, useFindAndModify: false }
      );

      //add to build
      const addTestExecutionForBuild = await BuildSchema.findOneAndUpdate(
        {_id: exist_execution.build},
        { $push: { testexecution: testexecution._id } },
        { new: true, useFindAndModify: false }
      );
  
      //add to user tester
      if(createtestexecutionDto.assigntester !== "" && createtestexecutionDto.assigntester !== undefined){
        const addTestExecutionForUser = await UserSchema.findOneAndUpdate(
          {username: createtestexecutionDto.assigntester},
          { $push: { testexecution: testexecution._id } },
          { new: true, useFindAndModify: false }
        );    
      }

      //add to requirement
      async function addTestExecutionForProjectRequirement(idProjectRequirement: string) {
        const addTestExecutionForProjectRequirement = await ProjectRequirementSchema.findOneAndUpdate(
          {_id: idProjectRequirement},
          { $push: { testexecution: testexecution._id } },
          { new: true, useFindAndModify: false }
        ); 
      }
      if(createtestexecutionDto.listrequirement.length > 0 && createtestexecutionDto.listrequirement !== undefined){
        createtestexecutionDto.listrequirement.forEach(element => {
          addTestExecutionForProjectRequirement(element);
        });
      }

      // set testcase is assigned
      for (let element of list_testcase) {
        const totalAssigned:any = await TestCaseSchema.findById(element, 'total_assigned').exec();

        const updateAssignTestcase = await TestCaseSchema.findOneAndUpdate(
          {_id: element},
          {$set: {
            is_assigned: true,
            total_assigned: totalAssigned.total_assigned + 1
          }},{new: true}).exec();
      }

      let requirement = {id: "sss"};
      //add requirement to execution
      async function addProjectRequirementForExecution(idProjectRequirement: any) {
        const addTestExecutionForProjectRequirement = await TestExecutionSchema.findOneAndUpdate(
          {_id: testexecution._id},
          { $push: { listprojectrequirement: idProjectRequirement.id } },
          { new: true, useFindAndModify: false }
        );
        
        const updateProjectRequirement = await ProjectRequirementSchema.findOneAndUpdate(
        {_id: idProjectRequirement.id},
        {$set: {
          status : false,
          updated_date: Date.now()
        }},{new: true}).exec();
        if (!updateProjectRequirement) throw new HttpException(400, 'Update updateProjectRequirement is not success');
      }
      if(createtestexecutionDto.listrequirement.length > 0 && createtestexecutionDto.listrequirement !== undefined){
        createtestexecutionDto.listrequirement.forEach(element => {
          requirement.id = element;
          addProjectRequirementForExecution(requirement);
        });
      }

      const model: CreateNotificationDto = {
        description: `you has already been assigned for test execution ${testexecution.testexecutionname} in project ${project.projectname}`,
        is_read: false,
        url: `https://testcontrols.herokuapp.com/projects/${projectId}/test-execution/${testexecution._id}`,
        user: tester.user
      }

      const newNotification = await this.notificationService.createNotification(model, projectId);
  
      return testexecution;
    } else{
      const newTestExecution = new TestExecutionSchema({
        ...createtestexecutionDto,
        is_active: createtestexecutionDto.is_active,
        is_public: createtestexecutionDto.is_public,
        description: createtestexecutionDto.description,
        testexecutionname: createtestexecutionDto.testexecutionname,
        testplan: exist_execution.testplan,
        build: exist_execution.build,
        listtestcases: exist_execution.listtestcases,
        exectestcases: list_testcase
      });
      const testexecution = await newTestExecution.save();

      // add to list testcase
      for(let element of list_testcase){
        const addTestExecutionForTestcase = await TestCaseSchema.findByIdAndUpdate(
          element,
          { $push: { testexecution: testexecution._id } },
          { new: true, useFindAndModify: false }
        );
      }

      //add to project
      const addTestExecutionForProject = await ProjectSchema.findByIdAndUpdate(
          projectId,
          { $push: { testexecution: testexecution._id } },
          { new: true, useFindAndModify: false }
        );
  
      //add to testplan
      const addTestExecutionForTestplan = await TestPlanSchema.findOneAndUpdate(
        {_id: exist_execution.testplan},
        { $push: { testexecution: testexecution._id } },
        { new: true, useFindAndModify: false }
      );

      //add to build
      const addTestExecutionForBuild = await BuildSchema.findOneAndUpdate(
        {_id: exist_execution.build},
        { $push: { testexecution: testexecution._id } },
        { new: true, useFindAndModify: false }
      );

      //add to requirement
      async function addTestExecutionForProjectRequirement(idProjectRequirement: string) {
        const addTestExecutionForProjectRequirement = await ProjectRequirementSchema.findOneAndUpdate(
          {_id: idProjectRequirement},
          { $push: { testexecution: testexecution._id } },
          { new: true, useFindAndModify: false }
        ); 
      }
      if(createtestexecutionDto.listrequirement.length > 0 && createtestexecutionDto.listrequirement !== undefined){
        createtestexecutionDto.listrequirement.forEach(element => {
          addTestExecutionForProjectRequirement(element);
        });
      }

      // set testcase is assigned
      for (let element of list_testcase) {
        const totalAssigned:any = await TestCaseSchema.findById(element, 'total_assigned').exec();

        const updateAssignTestcase = await TestCaseSchema.findOneAndUpdate(
          {_id: element},
          {$set: {
            is_assigned: true,
            total_assigned: totalAssigned.total_assigned + 1
          }},{new: true}).exec();
      }

      let requirement = {id: "sss"};
      //add requirement to execution
      async function addProjectRequirementForExecution(idProjectRequirement: any) {
        const addTestExecutionForProjectRequirement = await TestExecutionSchema.findOneAndUpdate(
          {_id: testexecution._id},
          { $push: { listprojectrequirement: idProjectRequirement.id } },
          { new: true, useFindAndModify: false }
        );
        
        const updateProjectRequirement = await ProjectRequirementSchema.findOneAndUpdate(
        {_id: idProjectRequirement.id},
        {$set: {
          status : false,
          updated_date: Date.now()
        }},{new: true}).exec();
        if (!updateProjectRequirement) throw new HttpException(400, 'Update updateProjectRequirement is not success');
      }
      if(createtestexecutionDto.listrequirement.length > 0 && createtestexecutionDto.listrequirement !== undefined){
        createtestexecutionDto.listrequirement.forEach(element => {
          requirement.id = element;
          addProjectRequirementForExecution(requirement);
        });
      }

      return testexecution;
    }

  }

  public async deleteTestExecutionFromProject(projectId: string, testexecutionId: string) 
  {
    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project id is not exist');

    const testexecution = await TestExecutionSchema.findById(testexecutionId).exec();
    if (!testexecution) throw new HttpException(400, 'Testexecution id is not exist');

    const testplan = await TestPlanSchema.findById(testexecution.testplan).exec();
    if (!testplan){}
    else{
      testplan.testexecution = testplan.testexecution.filter(({ _id }) => _id?.toString() !== testexecutionId?.toString());
      await testplan.save();
    }

    const build = await BuildSchema.findById(testexecution.build).exec();
    if (!build){}
    else{
      build.testexecution = build.testexecution.filter(({ _id }) => _id?.toString() !== testexecutionId?.toString());
      await build.save();
    }

    for(let element of testexecution.listprojectrequirement){
      if(element != null && element != undefined && element || ""){
        const projectrequirement = await ProjectRequirementSchema.findById(element.toString()).exec();
        if (!projectrequirement){}
        else{
          projectrequirement.testexecution = projectrequirement.testexecution.filter(({ _id }) => _id?.toString() !== testexecutionId);
          await projectrequirement.save();
          const updateStatusProjectRequirement = await this.checkProjectRequirementIsComplete(element?.toString());
        }
      }

    }

    const removeTestcaseFromExecution = await this.removeTestcaseFromExecution(testexecutionId)

    const deletedExecution = await TestExecutionSchema.findOneAndDelete({_id: testexecutionId,}).exec();
    if (!deletedExecution) throw new HttpException(400, 'Delete Test Execution is not success');

    return true;
  }

  public async removeTestcaseFromExecution(testexecutionId: string)
  {
    const testexecutions = await TestExecutionSchema.findById(testexecutionId).exec();
    if (!testexecutions) return false;

    for(let element of testexecutions.listtestcases){

      const testcase = await TestCaseSchema.findById(element.toString()).exec();
      if (!testcase){}
      else{
      //remove execution from testcase
      testcase.testexecution = testcase.testexecution.filter(({ _id }) => _id?.toString() != testexecutionId);
      await testcase.save();

        if(testcase.testexecution.length > 0){
          const updateAssignTestcase = await TestCaseSchema.findOneAndUpdate(
            {_id: element.toString()},
            {$set: {
              is_assigned: true
            }},{new: true}).exec();        
        }
        else if(testcase.total_assigned == 0){
          const updateAssignTestcase = await TestCaseSchema.findOneAndUpdate(
            {_id: element.toString()},
            {$set: {
              is_assigned: false
            }},{new: true}).exec();       
        }
        else{
          const updateAssignTestcase = await TestCaseSchema.findOneAndUpdate(
            {_id: element},
            {$set: {
              is_assigned: false
            }},{new: true}).exec();
        }
      }
    }
  }

  public async removeProjectRequirementFromExecution(testexecutionId: string)
  {
    const testexecution = await TestExecutionSchema.findById(testexecutionId).exec();
    if (!testexecution) return false;
  
    for(let element of testexecution.listprojectrequirement){
      const projectrequirement = await ProjectRequirementSchema.findById(element).exec();
      if (!projectrequirement){}
      else{
        projectrequirement.testexecution = projectrequirement.testexecution.filter(({ _id }) => _id.toString() != testexecutionId);
        await projectrequirement.save();
        const updateStatusProjectRequirement = await this.checkProjectRequirementIsComplete(element.toString());
      }
    }

  }

  public async removeExecutionFromProjectRequirement(testexecutionId: string)
  {
    const testexecution = await TestExecutionSchema.findById(testexecutionId).exec();
    if (!testexecution) return false;
  
    for(let element of testexecution.listprojectrequirement){
      const projectrequirement = await ProjectRequirementSchema.findById(element.toString()).exec();
      if (!projectrequirement){}
      else{
        projectrequirement.testexecution = projectrequirement.testexecution.filter(({ _id }) => _id.toString() !== testexecutionId);
        await projectrequirement.save();
        const updateStatusProjectRequirement = await this.checkProjectRequirementIsComplete(element.toString());
      }
    }

  }

}
export default TestExecutionService;