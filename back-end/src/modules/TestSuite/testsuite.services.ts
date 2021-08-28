import { HttpException } from "@core/exceptions";
import { IProject, ProjectSchema } from "@modules/project";
import { TestCaseSchema } from "@modules/testcase";
import { ITestPlan, TestPlanSchema } from "@modules/testplan";
import CreateTestSuiteDto from "./dtos/create_testsuite.dto";
import { ITestSuite } from "./testsuite.interface";
import TestSuiteSchema from "./testsuite.model";

class TestSuiteService {
  public testsuiteSchema = TestSuiteSchema;
  private listDescendants: any = [];

  public async createTestSuiteAndAddProject(
    create_testsuiteDto: CreateTestSuiteDto,
    projectId: string): Promise<IProject> {
    const project = await ProjectSchema.findById(projectId, 'testsuite')
      .populate({
        path: 'testsuite',
        select: 'testsuitename'
      })
      .exec();
    if (!project) throw new HttpException(400, 'Project is not exist');

    if (
      project.testsuite && project.testsuite.some(item => item.testsuitename === create_testsuiteDto.testsuitename)
    ) { throw new HttpException(400, 'Name testsuite existed in project'); }

    const newTestSuite = new TestSuiteSchema({
      ...create_testsuiteDto,
      project: projectId
    });
    const testsuite = await newTestSuite.save();

    const addTestSuiteForProject = await ProjectSchema.findByIdAndUpdate(
      projectId,
      { $push: { testsuite: testsuite._id } },
      { new: true, useFindAndModify: false }
    );

    await project.save();

    if (create_testsuiteDto.parent === undefined || create_testsuiteDto.parent === "") {
      return project;
    }

    const addTestSuite = await TestSuiteSchema.findOne(
      { testsuitename: create_testsuiteDto.parent, project: projectId }).exec();
    if (!addTestSuite)
      throw new HttpException(400, 'TestSuite is not existed');


    const addTestSuiteForTestSuiteDestination = await TestSuiteSchema.findByIdAndUpdate(
      addTestSuite._id,
      { $push: { testsuite_child: testsuite._id } },
      { new: true, useFindAndModify: false }
    );
    await addTestSuite.save();

    const updatedTestSuite = await TestSuiteSchema.findOneAndUpdate(
      { _id: newTestSuite._id },
      {
        $set: {
          testsuite_parent: addTestSuite._id
        }
      },
      { new: true }
    ).exec();
    if (!updatedTestSuite) throw new HttpException(400, 'Update TestSuite is not success');
    return project;
  }

  public async addTestSuiteForTestPlan(
    testplanId: string,
    testsuiteId: string): Promise<ITestPlan> {
    const testplan1 = TestPlanSchema.findById(testplanId).exec();
    const testsuite1 = TestSuiteSchema.findById(testsuiteId).exec();

    const testplan = await testplan1;
    if (!testplan) throw new HttpException(400, 'TestPlan is not exist');
    const testsuite = await testsuite1;
    if (!testsuite) throw new HttpException(400, 'TestSuite is not exist');

    if (
      testplan.testsuite &&
      testplan.testsuite.some((item: ITestSuite) => item._id.toString() === testsuiteId)
    ) { throw new HttpException(400, 'This testsuite has already been in testplan'); }

    const addTestSuiteForTestPlan = await TestPlanSchema.findByIdAndUpdate(
      testplanId,
      { $push: { testsuite: testsuite._id } },
      { new: true, useFindAndModify: false }
    );

    await testplan.save();

    return testplan;
  }

  public async addTestSuiteForTestSuite(
    testsuiteDestinationId: string,
    testsuiteId: string): Promise<ITestSuite> {
    const testsuiteDestination1 = TestSuiteSchema.findById(testsuiteDestinationId).exec();
    const testsuite1 = TestSuiteSchema.findById(testsuiteId).exec();

    const testsuiteDestination = await testsuiteDestination1;
    if (!testsuiteDestination) throw new HttpException(400, 'TestsuiteDestination is not exist');
    const testsuite = await testsuite1;
    if (!testsuite) throw new HttpException(400, 'TestSuite is not exist');

    if (
      testsuiteDestination.testsuite_child &&
      testsuiteDestination.testsuite_child.some((item: ITestSuite) => item._id.toString() === testsuiteId)
    ) { throw new HttpException(400, 'This testsuite has already been in testsuiteDestination'); }

    const addTestSuiteForTestSuiteDestination = await TestSuiteSchema.findByIdAndUpdate(
      testsuiteDestinationId,
      { $push: { testsuite_child: testsuite._id } },
      { new: true, useFindAndModify: false }
    );
    await testsuiteDestination.save();

    const updatedTestSuite = await TestSuiteSchema.findOneAndUpdate(
      { _id: testsuiteId },
      {
        $set: {
          testsuite_parent: testsuiteDestinationId
        }
      },
      { new: true }
    ).exec();
    if (!updatedTestSuite) throw new HttpException(400, 'Update TestSuite is not success');

    return testsuiteDestination;
  }

  public async createTestSuiteAndAddTestPlan(
    create_testsuiteDto: CreateTestSuiteDto,
    projectId: string,
    testplanId: string): Promise<ITestPlan> {
    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project is not exist');

    const testplan = await TestPlanSchema.findById(testplanId).exec();
    if (!testplan) throw new HttpException(400, 'TestPlan is not exist');

    const existingTestSuite = await TestSuiteSchema.findOne(
      { testsuitename: create_testsuiteDto.testsuitename, project: projectId }).exec();
    if (existingTestSuite)
      throw new HttpException(400, 'Name TestSuite existed');

    const newTestSuite = new TestSuiteSchema({
      ...create_testsuiteDto,
      project: projectId
    });
    const testsuite = await newTestSuite.save();

    const addTestSuiteForProject = await ProjectSchema.findByIdAndUpdate(
      projectId,
      { $push: { testsuite: testsuite._id } },
      { new: true, useFindAndModify: false }
    );
    await project.save();

    const addTestSuiteForTestplan = await TestPlanSchema.findByIdAndUpdate(
      testplanId,
      { $push: { testsuite: testsuite._id } },
      { new: true, useFindAndModify: false }
    );
    await testplan.save();

    return testplan;
  }

  public async getAllTestSuiteOfProject(projectId: string) {
    const updateAssign = await this.updateAssignTestSuite(projectId);

    const testsuites = await ProjectSchema.findOne({ _id: projectId }, 'testsuite projectname description')
      .populate({
        path: 'testsuite',
        select: 'testsuitename testcase description priority testsuite_child testsuite_parent type is_assigned total_testcase numberof_testcaseuntest',
        populate: [{
          path: 'testcase', select: 'testcaseName description testsuite listStep type priority precondition postcondition is_assigned testexecution',
          populate: [{ path: 'testexecution', select: 'testexecutionname status project' }]
        },
        { path: 'testsuite_parent', select: 'testsuitename' }]
      }).exec();

      //console.log(JSON.stringify(testsuites, null, ' '));

    return {
      testsuites: testsuites,
      totalTCOfProject: updateAssign.totalTCOfProject,
      totalTNUntestOfProject: updateAssign.totalTNUntestOfProject,
      totalTestsuiteOfProject: updateAssign.totalTSOfProject
    };
  }

  public async updateAssignTestSuite(projectId: string) {
    let totalTCOfProject = 0;
    let totalTNUntestOfProject = 0;
    let totalTestSuiteOfProject = 0;

    const testsuites: any = await ProjectSchema.findOne({ _id: projectId }, 'testsuite -_id')
      .populate({
        path: 'testsuite',
        select: 'testsuitename is_assigned total_testcase numberof_testcaseuntest',
        populate: [{ path: 'testcase', select: 'is_assigned' }]
      }).exec();
    if (!testsuites) throw new HttpException(400, 'Load Testsuite tree error!');

    let listTestsuite: any = testsuites.testsuite;
    let countTCNotAssign = 0;
    let totalTC = 0;
    for (let i in listTestsuite) {
      totalTestSuiteOfProject++;
      countTCNotAssign = 0;
      totalTC = 0;

      for (let k in listTestsuite[i]["testcase"]) {
        if (!listTestsuite[i]["testcase"][k]["is_assigned"]) {
          totalTNUntestOfProject++;
          countTCNotAssign++;
        }
        totalTC++;
        totalTCOfProject++;
      }

      if (countTCNotAssign == 0 && totalTC != 0) {
        const updateTestsuite = await TestSuiteSchema.findOneAndUpdate(
          { _id: listTestsuite[i]["_id"] },
          {
            $set: {
              numberof_testcaseuntest: countTCNotAssign,
              total_testcase: totalTC,
              is_assigned: true
            }
          }, { new: true }).exec();
      }
      else if (countTCNotAssign == 0 && totalTC == 0) {
        const updateTestsuite = await TestSuiteSchema.findOneAndUpdate(
          { _id: listTestsuite[i]["_id"] },
          {
            $set: {
              numberof_testcaseuntest: countTCNotAssign,
              total_testcase: totalTC,
              is_assigned: false
            }
          }, { new: true }).exec();
      }
      else {
        const updateTestsuite = await TestSuiteSchema.findOneAndUpdate(
          { _id: listTestsuite[i]["_id"] },
          {
            $set: {
              numberof_testcaseuntest: countTCNotAssign,
              total_testcase: totalTC,
              is_assigned: false
            }
          }, { new: true }).exec();
      }
      //}
    }

    return {
      totalTCOfProject: totalTCOfProject,
      totalTNUntestOfProject: totalTNUntestOfProject,
      totalTSOfProject: totalTestSuiteOfProject
    };
  }

  public async getAllTestSuiteOfProjectOnlyName(projectId: string): Promise<Partial<ITestSuite>[]> {
    const testsuites = ProjectSchema.find({ _id: projectId }, 'testsuite projectname description')
      .populate({
        path: 'testsuite',
        select: 'testsuitename',
      })
      .exec();

    return testsuites;
  }

  public async getAllTestSuiteOfTestPlan(testplanId: string): Promise<Partial<ITestSuite>[]> {
    const testsuites = TestPlanSchema.find({ _id: testplanId })
      .populate('testsuite', ['testsuitename', 'description', 'priority'])
      .exec();
    return testsuites;
  }

  public async getTestSuiteById(testsuiteId: string): Promise<ITestSuite> {
    const testsuite = await this.testsuiteSchema.findById(testsuiteId)
      .populate('testsuite_parent', ['testsuitename'])
      .exec();
    if (!testsuite) {
      throw new HttpException(404, `TestSuite is not exists`);
    }
    return testsuite;
  }

  public async findDescendants(testsuiteId: string) {
    this.listDescendants = this.listDescendants.filter((word: string | any[]) => word == '0');
    const findDes = await this.loopDescendants(testsuiteId);
    return findDes;
  }

  public async loopDescendants(testsuiteId: string) {
    let list: any = [];
    const testsuiteCurrent = await TestSuiteSchema.findById(testsuiteId).exec();
    if (!testsuiteCurrent) { return true };

    if (testsuiteCurrent.testsuite_child.length == 0)
      return list;
    else {
      for (let element of testsuiteCurrent.testsuite_child) {
        await this.listDescendants.push(element);
        const temp: any = await this.loopDescendants(element.toString());
      }
      return list;
    }
  }

  public async updateTestSuite(
    create_testsuiteDto: CreateTestSuiteDto,
    testsuiteId: string,
    projectId: string) {

    const testsuite = await TestSuiteSchema.findById(testsuiteId).exec();
    if (!testsuite) throw new HttpException(400, 'This TestSuite is not exist');

    if (create_testsuiteDto.parent != "" && create_testsuiteDto.parent != null && create_testsuiteDto.parent != undefined) {
      const testsuiteParent = await TestSuiteSchema.findOne
        ({ testsuitename: create_testsuiteDto.parent, project: projectId }, 'testsuite_parent testsuite_child').exec();
      if (!testsuiteParent) throw new HttpException(400, 'This TestSuite is not exist');

      if (testsuiteParent._id.toString() == testsuiteId.toString())
        throw new HttpException(400, 'testsuite parent is illegal');

      const checkDescendants = await this.findDescendants(testsuiteId);

      const checkTestsuiteParentIsDescendant = (element: any) => element.toString() == testsuiteParent._id.toString();
      if (this.listDescendants && this.listDescendants.findIndex(checkTestsuiteParentIsDescendant) != -1)
        throw new HttpException(400, 'Testsuite parent is descendant of this testsuite');
    }

    // check loop parent
    /*if(create_testsuiteDto.parent != "" && create_testsuiteDto.parent != null && create_testsuiteDto.parent != undefined){
      const testsuiteCurrent = await TestSuiteSchema.findById(testsuiteId, '_id testsuite_child').exec();
      if(!testsuiteCurrent) throw new HttpException(400, 'Update TestSuite is not success');
      
      const testsuiteParent = await TestSuiteSchema.findOne({testsuitename: create_testsuiteDto.parent, project: projectId}, 'testsuite_parent testsuite_child' ).exec();
      if(testsuiteParent){
        if(testsuiteParent.testsuite_parent != undefined && testsuiteParent.testsuite_parent != null && testsuiteParent.testsuite_parent != ""){
          if(testsuiteParent.testsuite_parent.toString() == testsuiteCurrent._id.toString() ){
            throw new HttpException(400, 'Update TestSuite is not success'); 
          }
        }
      }
      else throw new HttpException(400, 'TestSuite parent is not exist'); 

      if(testsuiteCurrent.testsuite_child.length > 0)
      throw new HttpException(400, 'You can not change testsuite parent because this testsuite have testsuite children');
    }*/

    if (testsuite.testsuitename !== create_testsuiteDto.testsuitename) {
      const project = await ProjectSchema.findById(projectId, 'testsuite')
        .populate({
          path: 'testsuite',
          select: 'testsuitename'
        })
        .exec();
      if (!project) throw new HttpException(400, 'Project is not exist');

      if (
        project.testsuite && project.testsuite.some(item => item.testsuitename === create_testsuiteDto.testsuitename)
      ) { throw new HttpException(400, 'Name testsuite existed in project'); }
    }

    const updatedTestSuite = await TestSuiteSchema.findOneAndUpdate(
      { _id: testsuiteId },
      {
        $set: {
          testsuitename: create_testsuiteDto.testsuitename,
          description: create_testsuiteDto.description,
          priority: create_testsuiteDto.priority,
          updated_date: Date.now()
        }
      },
      { new: true }
    ).exec();
    if (!updatedTestSuite) throw new HttpException(400, 'Update TestSuite is not success');

    //if(create_testsuiteDto.parent){
    if (create_testsuiteDto.parent === '' || create_testsuiteDto.parent === undefined) {
      // before: no parent,     after: no parent
      if (testsuite.testsuite_parent === '' || testsuite.testsuite_parent === undefined) {
        return testsuite;
      }
      else {
        // before: have a parent,     after: no parent
        const testsuiteparent = await TestSuiteSchema.findById(testsuite.testsuite_parent).exec();
        if (!testsuiteparent) throw new HttpException(400, 'This TestSuite parent is not exist');


        testsuiteparent.testsuite_child = testsuiteparent.testsuite_child.filter(
          ({ _id }) => _id.toString() !== testsuite._id.toString()
        );
        await testsuiteparent.save();

        const updatedTestSuite = await TestSuiteSchema.findOneAndUpdate(
          { _id: testsuite._id },
          {
            $unset: {
              testsuite_parent: 1
            }
          },
          { new: true }
        ).exec();
        if (!updatedTestSuite) throw new HttpException(400, 'Update TestSuite is not success');
        return updatedTestSuite;
      }

    } else {
      // before: no parent,     after: have a parent
      if (testsuite.testsuite_parent === '' || testsuite.testsuite_parent === undefined) {
        const testsuiteparent = await TestSuiteSchema.findOne({ testsuitename: create_testsuiteDto.parent, project: projectId }).exec();
        if (!testsuiteparent) throw new HttpException(400, 'This TestSuite parent is not exist');

        const addTestSuiteForTestSuiteDestination = await TestSuiteSchema.findByIdAndUpdate(
          testsuiteparent._id,
          { $push: { testsuite_child: testsuite._id } },
          { new: true, useFindAndModify: false }
        );

        const updatedTestSuite = await TestSuiteSchema.findOneAndUpdate(
          { _id: testsuite._id },
          {
            $set: {
              testsuite_parent: testsuiteparent._id,
              updated_date: Date.now()
            }
          },
          { new: true }
        ).exec();
        if (!updatedTestSuite) throw new HttpException(400, 'Update TestSuite is not success');
        return updatedTestSuite;
      }
      else {
        // before: have a parent,     after: have a parent
        const testsuiteparent_new = await TestSuiteSchema.findOne({ testsuitename: create_testsuiteDto.parent, project: projectId }).exec();
        if (!testsuiteparent_new) throw new HttpException(400, 'This TestSuite parent is not exist');

        if (testsuiteparent_new._id.toString() === testsuite.testsuite_parent.toString()) {
          return testsuite;
        } else {
          const addTestSuiteForTestSuiteDestination = await TestSuiteSchema.findByIdAndUpdate(
            testsuiteparent_new._id,
            { $push: { testsuite_child: testsuite._id } },
            { new: true, useFindAndModify: false }
          );

          const testsuiteparent_old = await TestSuiteSchema.findById(testsuite.testsuite_parent).exec();
          if (!testsuiteparent_old) throw new HttpException(400, 'This TestSuite parent is not exist');

          testsuiteparent_old.testsuite_child = testsuiteparent_old.testsuite_child.filter(
            ({ _id }) => _id.toString() !== testsuite._id.toString()
          );
          await testsuiteparent_old.save();

          const updatedTestSuite = await TestSuiteSchema.findOneAndUpdate(
            { _id: testsuite._id },
            {
              $set: {
                testsuite_parent: testsuiteparent_new._id,
                updated_date: Date.now()
              }
            },
            { new: true }
          ).exec();
          if (!updatedTestSuite) throw new HttpException(400, 'Update TestSuite is not success');
          return updatedTestSuite;
        }


      }
    }
    //}
    return testsuite;
  }

  public async removeTestSuiteFromTestPlan(testplanId: string, testsuiteId: string): Promise<ITestPlan> {
    const testplan = await TestPlanSchema.findById(testplanId).exec();
    if (!testplan) throw new HttpException(400, 'TestPlan id is not exist');

    const testsuite = await TestSuiteSchema.findById(testsuiteId).exec();
    if (!testsuite) throw new HttpException(400, 'TestSuite id is not exist');

    if (
      testplan.testsuite &&
      testplan.testsuite.findIndex(
        (item: ITestSuite) => item._id.toString() === testsuiteId
      ) == -1
    ) {
      throw new HttpException(400, 'You has not yet been testsuite of this testplan');
    }

    testplan.testsuite = testplan.testsuite.filter(
      ({ _id }) => _id.toString() !== testsuiteId
    );
    await testplan.save();
    return testplan;
  }

  public async removeAndDeleteTestSuiteFromProject(projectId: string, testsuiteId: string) {
    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project id is not exist');

    const testsuite = await TestSuiteSchema.findById(testsuiteId).exec();
    if (!testsuite) throw new HttpException(400, 'TestSuite id is not exist');

    if (testsuite.testsuite_child !== undefined && testsuite.testsuite_child.length > 0)
      throw new HttpException(400, 'You must delete all testsuite child before delete this testsuite');

    // delete all testcase
    if (testsuite.testcase !== undefined || testsuite.testcase > 0) {
      const listTestcase = await TestCaseSchema.deleteMany({ _id: [...testsuite.testcase] }).exec();
      if (!listTestcase.ok) throw new HttpException(409, 'Your id is invalid');

      project.testcase = project.testcase.filter(
        item => !testsuite.testcase.includes(item)
      );
      await project.save();
    }

    // delete testsuite
    if (project.testsuite && project.testsuite.findIndex(
      (item: ITestSuite) => item._id.toString() === testsuiteId) == -1) {
      throw new HttpException(400, 'You has not yet been testsuite of this project');
    }

    project.testsuite = project.testsuite.filter(({ _id }) => _id.toString() !== testsuiteId);
    await project.save();

    if (testsuite.testsuite_parent !== undefined) {
      const testsuiteparent = await TestSuiteSchema.findById(testsuite.testsuite_parent).exec();
      if (!testsuiteparent) throw new HttpException(400, 'TestSuite id is not exist');

      testsuiteparent.testsuite_child = testsuiteparent.testsuite_child.filter(
        ({ _id }) => _id.toString() !== testsuiteId);
      await testsuiteparent.save();
    }

    const deletedTestSuite = await TestSuiteSchema.findOneAndDelete({ _id: testsuiteId, }).exec();
    if (!deletedTestSuite) throw new HttpException(400, 'Delete TestSuite is not success');

    return "delete successfully";
  }

  public async removeAndDeleteTestSuiteFromTestPlan(projectId: string, testplanId: string, testsuiteId: string): Promise<ITestPlan> {
    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project id is not exist');

    const testplan = await TestPlanSchema.findById(testplanId).exec();
    if (!testplan) throw new HttpException(400, 'TestPlan id is not exist');

    const testsuite = await TestSuiteSchema.findById(testsuiteId).exec();
    if (!testsuite) throw new HttpException(400, 'TestSuite id is not exist');

    if (
      project.testsuite &&
      project.testsuite.findIndex(
        (item: ITestSuite) => item._id.toString() === testsuiteId
      ) == -1
    ) {
      throw new HttpException(400, 'You has not yet been testsuite of this project');
    }
    project.testsuite = project.testsuite.filter(
      ({ _id }) => _id.toString() !== testsuiteId
    );
    await project.save();

    if (
      testplan.testsuite &&
      testplan.testsuite.findIndex(
        (item: ITestSuite) => item._id.toString() === testsuiteId
      ) == -1
    ) {
      throw new HttpException(400, 'You has not yet been testsuite of this testplan');
    }
    testplan.testsuite = testplan.testsuite.filter(
      ({ _id }) => _id.toString() !== testsuiteId
    );
    await testplan.save();

    const deletedTestSuite = await TestSuiteSchema.findOneAndDelete({
      _id: testsuiteId,
    }).exec();
    if (!deletedTestSuite) throw new HttpException(400, 'Delete TestSuite is not success');

    return testplan;
  }

  public async getAllTestSuiteHierachyOfTestPlan(testplanId: string): Promise<Partial<ITestSuite>[]> {
    const testsuites = TestPlanSchema.find({ _id: testplanId })
      .populate('testsuite', ['name', 'start_date', 'target_date'])
      .exec();
    return testsuites;
  }


}
export default TestSuiteService;