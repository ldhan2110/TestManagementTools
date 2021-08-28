import { HttpException } from '@core/exceptions';
import bcryptjs from 'bcryptjs';
import gravatar from 'gravatar';
import TestCaseSchema from './testcase.model';
import CreateTestCaseDto from './dtos/create_testcase.dto';
import { ITestCase, ITestStep } from './testcase.interface';
import { IUser, UserSchema } from '@modules/users';
import { ITestSuite, TestSuiteSchema } from '@modules/TestSuite';
import TestCaseRoute from './testcase.route';
import { ProjectSchema } from '@modules/project';
import SearchTestcaseDto from './dtos/search_testcase.dto';
import TestSuiteService from '@modules/TestSuite/testsuite.services';
var mongoose = require('mongoose');

class TestCaseService {
  public testcaseSchema = TestCaseSchema;
  private testsuiteServices = new TestSuiteService();

  public async createTestCase(
    userId: string,
    projectId: string,
    testcaseDto: CreateTestCaseDto
  ): Promise<ITestCase> {
    const user = await UserSchema.findById(userId).select('-password').exec();
    if (!user) throw new HttpException(400, 'User id is not exist');

    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project is not exist');

    const existingTestCase = await TestCaseSchema.find({
      name: testcaseDto.testcaseName,
    }).exec();
    if (existingTestCase.length > 0)
      throw new HttpException(400, 'Name TestCase existed');

    const newTestCase = new TestCaseSchema({
      ...testcaseDto,
      project: projectId,
      created_user: userId,
      updated_user: userId,
    });
    const testcase = await newTestCase.save();

    const addTestCaseForProject = await ProjectSchema.findByIdAndUpdate(
      projectId,
      { $push: { testcase: testcase._id } },
      { new: true, useFindAndModify: false }
    );
    await project.save();

    const TestSuite = await TestSuiteSchema.findOne(
      { testsuitename: testcaseDto.testsuite, project: projectId }).exec();
    if (!TestSuite)
      throw new HttpException(400, 'TestSuite is not existed');

    const addTestCaseForTestSuite = await TestSuiteSchema.findByIdAndUpdate(
      TestSuite._id,
      { $push: { testcase: testcase._id } },
      { new: true, useFindAndModify: false }
    );
    // const addProjectForUser = await UserSchema.findByIdAndUpdate(
    //   userId,
    //   { $push: { project: post._id } },
    //   { new: true, useFindAndModify: false }
    // );

    return testcase;
  }

  public async createTestStepAndAddTestCase(
    testcaseDto: CreateTestCaseDto,
    userId: string,
    projectId: string): Promise<ITestCase> {
    const session = await mongoose.startSession();
    await session.startTransaction();
    try {

      const user = await UserSchema.findById(userId).select('-password').exec();
      if (!user) throw new HttpException(400, 'User id is not exist');

      const project = await ProjectSchema.findById(projectId, 'testcase')
        .populate({
          path: 'testcase',
          select: 'testcaseName'
        })
        .exec();
      if (!project) throw new HttpException(400, 'Project is not exist');

      if (
        project.testcase && project.testcase.some(item => item.testcaseName === testcaseDto.testcaseName)
      ) { throw new HttpException(400, 'Name testcase existed in project'); }

      /*const existingTestCase = await TestCaseSchema.find({
        testcaseName: testcaseDto.testcaseName,
      }).exec();
      if (existingTestCase.length > 0)
        throw new HttpException(400, 'Name TestCase existed');*/

      const TestSuiteParent = await TestSuiteSchema.findOne(
        { testsuitename: testcaseDto.testsuite, project: projectId }).exec();
      if (!TestSuiteParent)
        throw new HttpException(400, 'TestSuite is not existed');

      const newTestCase = new TestCaseSchema({
        testcaseName: testcaseDto.testcaseName,
        description: testcaseDto.description,
        testsuite: TestSuiteParent._id,
        priority: testcaseDto.priority,
        precondition: testcaseDto.precondition,
        postcondition: testcaseDto.postcondition,
        project: projectId,
        created_user: userId,
        updated_user: userId,
      });
      const testcase = await newTestCase.save();

      const teststeps = testcaseDto.listStep;
      teststeps.forEach(element => {
        const newTestStep = {
          ...element
        };
        testcase.listStep.push(newTestStep as ITestStep);
        testcase.save();
      });

      const addTestCaseForProject = await ProjectSchema.findByIdAndUpdate(
        projectId,
        { $push: { testcase: testcase._id } },
        { new: true, useFindAndModify: false }
      );
      await project.save();

      const TestSuite = await TestSuiteSchema.findOne(
        { testsuitename: testcaseDto.testsuite, project: projectId }).exec();
      if (!TestSuite)
        throw new HttpException(400, 'TestSuite is not existed');

      const addTestCaseForTestSuite = await TestSuiteSchema.findByIdAndUpdate(
        TestSuite._id,
        { $push: { testcase: testcase._id } },
        { new: true, useFindAndModify: false }
      );

      await session.commitTransaction();
      session.endSession();
      return testcase;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw new HttpException(400, error.toString());
    }

  }

  public async importTestcase(
    testcaseDto: CreateTestCaseDto[],
    userId: string,
    projectId: string) {
    const session = await mongoose.startSession();
    await session.startTransaction();
    try {

      const user = await UserSchema.findById(userId).select('-password').exec();
      if (!user) throw new HttpException(400, 'User id is not exist');

      const project = await ProjectSchema.findById(projectId, 'testcase')
        .populate({
          path: 'testcase',
          select: 'testcaseName'
        })
        .exec();
      if (!project) throw new HttpException(400, 'Project is not exist');

      for (let i in testcaseDto) {

        //check name testcase
        if (project.testcase && project.testcase.some(item => item.testcaseName === testcaseDto[i].testcaseName)) { throw new HttpException(400, `Testcase ${testcaseDto[i].testcaseName} existed in project`); }

        //check name testsuite parent
        const TestSuiteParent = await TestSuiteSchema.findOne(
          { testsuitename: testcaseDto[i].testsuite, project: projectId }).exec();
        if (!TestSuiteParent)
          throw new HttpException(400, 'TestSuite is not existed');

        // import testcase
        const newTestCase = new TestCaseSchema({
          testcaseName: testcaseDto[i].testcaseName,
          description: testcaseDto[i].description,
          testsuite: TestSuiteParent._id,
          priority: testcaseDto[i].priority,
          precondition: testcaseDto[i].precondition,
          postcondition: testcaseDto[i].postcondition,
          project: projectId,
          created_user: userId,
          updated_user: userId,
        });
        const testcase = await newTestCase.save();

        // add teststep to testcase
        const teststeps = testcaseDto[i].listStep;
        teststeps.forEach(element => {
          const newTestStep = {
            ...element
          };
          testcase.listStep.push(newTestStep as ITestStep);
          testcase.save();
        });

        // add to project
        const addTestCaseForProject = await ProjectSchema.findByIdAndUpdate(
          projectId,
          { $push: { testcase: testcase._id } },
          { new: true, useFindAndModify: false }
        ); await project.save();

        const TestSuite = await TestSuiteSchema.findOne(
          { testsuitename: testcaseDto[i].testsuite, project: projectId }).exec();
        if (!TestSuite)
          throw new HttpException(400, 'TestSuite is not existed');

        // add to testsuite
        const addTestCaseForTestSuite = await TestSuiteSchema.findByIdAndUpdate(
          TestSuite._id,
          { $push: { testcase: testcase._id } },
          { new: true, useFindAndModify: false }
        );
      }
      await session.commitTransaction();
      session.endSession();
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw new HttpException(400, error.toString());
    }

  }

  public async readFileExcel() {
    return "true";

    // -> Log Excel Data to Console

  }

  public async updateTestCase(
    testcaseDto: CreateTestCaseDto,
    testcaseId: string,
    userId: string,
    projectId: string
  ): Promise<ITestCase> {
    const testcase = await TestCaseSchema.findById(testcaseId).exec();
    if (!testcase) throw new HttpException(400, 'TestCase id is not exist');

    if (testcase.testcaseName !== testcaseDto.testcaseName) {
      const project = await ProjectSchema.findById(projectId, 'testcase')
        .populate({
          path: 'testcase',
          select: 'testcaseName'
        })
        .exec();
      if (!project) throw new HttpException(400, 'Project is not exist');

      if (
        project.testcase && project.testcase.some(item => item.testcaseName === testcaseDto.testcaseName)
      ) { throw new HttpException(400, 'Name testcase existed in project'); }
    }

    const TestSuiteNew = await TestSuiteSchema.findOne(
      { testsuitename: testcaseDto.testsuite, project: projectId }).exec();
    if (!TestSuiteNew)
      throw new HttpException(400, 'TestSuite is not existed');

    if (testcase.testsuite.toString() !== TestSuiteNew._id.toString()) {

      const TestSuiteOld = await TestSuiteSchema.findOne(
        { _id: testcase.testsuite }).exec();
      if (!TestSuiteOld)
        throw new HttpException(400, 'TestSuite is not existed');

      if (
        TestSuiteNew.testcase &&
        TestSuiteNew.testcase.findIndex(
          (item: ITestCase) => item._id.toString() === testcase._id.toString()
        ) == -1
      ) {// No testcase in testsuiteNew

        //Remove testcase in testsuite Old
        TestSuiteOld.testcase = TestSuiteOld.testcase.filter(
          ({ _id }) => _id.toString() !== testcase._id.toString()
        );
        await TestSuiteOld.save();

        // add testcase to testsuite new
        const addTestCaseForTestSuite = await TestSuiteSchema.findByIdAndUpdate(
          TestSuiteNew._id,
          { $push: { testcase: testcase._id } },
          { new: true, useFindAndModify: false }
        );
      }
      else {
        throw new HttpException(400, 'Have this testcase in testsuite ');
      }
    }

    //remove lis step old
    testcase.listStep = testcase.listStep.filter(
      ({ _id }) => _id.toString() === '1'
    );
    await testcase.save();
    //push list step new
    const teststeps = testcaseDto.listStep;
    teststeps.forEach(element => {
      const newTestStep = {
        ...element
      };
      testcase.listStep.push(newTestStep as ITestStep);
      testcase.save();
    });

    const updatedTestCase = await TestCaseSchema.findOneAndUpdate(
      { _id: testcaseId },
      {
        $set: {
          testcaseName: testcaseDto.testcaseName,
          description: testcaseDto.description,
          testsuite: TestSuiteNew._id,
          priority: testcaseDto.priority,
          precondition: testcaseDto.precondition,
          postcondition: testcaseDto.postcondition,
          updated_date: Date.now(),
          updated_user: userId
        }
      },
      { new: true }
    ).exec();
    if (!updatedTestCase) throw new HttpException(400, 'Update is not success');

    return updatedTestCase;
  }

  public async deleteTestCaseFromProject(testcaseId: string): Promise<ITestCase> {
    const testcase = await TestCaseSchema.findById(testcaseId).exec();
    if (!testcase) throw new HttpException(400, 'testcase id is not exist');

    const deletedTestSuite = await TestCaseSchema.findOneAndDelete({
      _id: testcaseId,
    }).exec();
    if (!deletedTestSuite) throw new HttpException(400, 'Delete TestCase is not success');

    const testsuite = await TestSuiteSchema.findOne(
      { _id: testcase.testsuite }).exec();
    if (!testsuite)
      throw new HttpException(400, 'TestSuite is not existed');

    testsuite.testcase = testsuite.testcase.filter(
      ({ _id }) => _id.toString() !== testcase._id.toString()
    );
    await testsuite.save();

    return testcase;
  }

  public async getAllTestCaseOfTestSuite(testsuite: string): Promise<Partial<ITestCase>[]> {
    const testcases = TestSuiteSchema.find({ _id: testsuite })
      .populate('testcase', ['name', 'description', 'priority'])
      .exec();
    return testcases;
  }

  public async searchTestcaseOfProject(projectId: string, keyword: SearchTestcaseDto) {
    const updateAssign = await this.testsuiteServices.updateAssignTestSuite(projectId);

    if (keyword.testsuite == "") {

      const testsuites = await ProjectSchema.findOne({ _id: projectId }, 'testsuite projectname description')
        .populate({
          path: 'testsuite',
          select: 'testsuitename testcase description priority testsuite_child testsuite_parent type is_assigned total_testcase numberof_testcaseuntest',
          populate: [{
            path: 'testcase',
            select: 'testcaseName description testsuite listStep type priority precondition postcondition is_assigned testexecution',
            match: {
              testcaseName: new RegExp(keyword.testcasename, 'i'),
              //testsuite: new RegExp(keyword.testsuite, 'i'),
              priority: new RegExp(keyword.important, 'i')
            },
            populate: [{ path: 'testexecution', select: 'testexecutionname status project' }]
          },
          { path: 'testsuite_parent', select: 'testsuitename' }]
        }).exec();

      return {
        testsuites: testsuites,
        totalTCOfProject: updateAssign.totalTCOfProject,
        totalTNUntestOfProject: updateAssign.totalTNUntestOfProject,
        totalTestsuiteOfProject: updateAssign.totalTSOfProject
      };
    }
    else {

      const testsuites = await ProjectSchema.findOne({ _id: projectId }, 'testsuite projectname description')
        .populate({
          path: 'testsuite',
          match: { testsuitename: new RegExp(keyword.testsuite, 'i') },
          select: 'testsuitename testcase description priority testsuite_child testsuite_parent type is_assigned total_testcase numberof_testcaseuntest',
          populate: [{
            path: 'testcase',
            select: 'testcaseName description testsuite listStep type priority precondition postcondition is_assigned testexecution',
            match: {
              testcaseName: new RegExp(keyword.testcasename, 'i'),
              //testsuite: new RegExp(keyword.testsuite, 'i'),
              priority: new RegExp(keyword.important, 'i')
            },
            populate: [{ path: 'testexecution', select: 'testexecutionname status project' }]
          },
          { path: 'testsuite_parent', select: 'testsuitename' }]
        }).exec();

      return {
        testsuites: testsuites,
        totalTCOfProject: updateAssign.totalTCOfProject,
        totalTNUntestOfProject: updateAssign.totalTNUntestOfProject
      };
    }
  }

  public async getAllTestCaseOfProject(projectId: string): Promise<Partial<ITestCase>[]> {
    //const testcases = ProjectSchema.find({ _id: projectId }, 'testcase projectname description')
    //.populate('testcase', ['testcasename', 'description', 'priority', 'listStep', 'type', 'testsuite'])
    //.exec();
    //return testcases;
    const testcases = TestSuiteSchema.find({ _id: projectId })
      .populate('testcase', ['name', 'description', 'priority'])
      .exec();
    return testcases;
  }

  public async getListTestCase(listselect: string[]) {
    let data: any = [];
    const input_data = JSON.parse(JSON.stringify(listselect))

    const testcases = await TestCaseSchema.find({}, 'testcaseName').exec()
    if (!testcases) throw new HttpException(400, 'list testcase is not exist');

    for (let i in input_data.listselect) {
      for (let testcase of testcases) {
        if (testcase._id.toString() === input_data.listselect[i].toString())
          data.push(testcase);
      }
    }
    return data;
  }

  public async addTestCaseForTestSuite(
    testsuiteId: string,
    testcaseId: string): Promise<ITestSuite> {
    const testsuite = await TestSuiteSchema.findById(testsuiteId).exec();
    if (!testsuite) throw new HttpException(400, 'TestSuite is not exist');

    const testcase = await TestCaseSchema.findById(testcaseId).exec();
    if (!testcase) throw new HttpException(400, 'TestCase is not exist');

    if (
      testsuite.testcase &&
      testsuite.testcase.some((item: ITestCase) => item._id.toString() === testcaseId)
    ) { throw new HttpException(400, 'This testcase has already been in testsuite'); }

    const addTestCaseForTestSuite = await TestSuiteSchema.findByIdAndUpdate(
      testsuiteId,
      { $push: { testsuite: testcase._id } },
      { new: true, useFindAndModify: false }
    );

    await testsuite.save();

    return testsuite;
  }

  public async removeTestCaseFromTestSuite(testsuiteId: string, testcaseId: string): Promise<ITestSuite> {
    const testsuite = await TestSuiteSchema.findById(testsuiteId).exec();
    if (!testsuite) throw new HttpException(400, 'testsuite id is not exist');

    const testcase = await TestCaseSchema.findById(testcaseId).exec();
    if (!testcase) throw new HttpException(400, 'testcase id is not exist');

    if (
      testsuite.testcase &&
      testsuite.testcase.findIndex(
        (item: ITestCase) => item._id.toString() === testcaseId
      ) == -1
    ) {
      throw new HttpException(400, 'You has not yet been testcase of this testsuite');
    }

    testsuite.testcase = testsuite.testcase.filter(
      ({ _id }) => _id.toString() !== testcaseId
    );

    await testsuite.save();
    return testsuite;
  }

}
export default TestCaseService;