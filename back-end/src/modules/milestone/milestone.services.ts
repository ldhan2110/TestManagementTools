import { HttpException } from "@core/exceptions";
import { IMilestone, MilestoneSchema } from "@modules/milestone"
import { IProject, ProjectSchema } from "@modules/project";
import { IMilestoneMember } from "@modules/project/project.interface";
import { ITestPlan, TestPlanSchema } from "@modules/testplan";
import CreateMilestoneDto from "./dtos/create_milestone.dto";

class MilestoneService {
  public milestoneSchema = MilestoneSchema;

  public async createMilestoneAndAddProject(
    create_milestoneDto: CreateMilestoneDto,
    projectId: string): Promise<IProject> 
  {  
    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project is not exist');

    if (
      project.milestone &&
      project.milestone.some((item: IMilestoneMember) => item.milestonename === create_milestoneDto.milestonetitle)
    ) {throw new HttpException(400, 'Name milestone existed in project');}

    const startDate = Date.parse(create_milestoneDto.start_date.toString());
    const endDate = Date.parse(create_milestoneDto.end_date.toString()) + 6000000;
    if(startDate > endDate)
    {throw new HttpException(400, 'Start Date can not more than End Date');}

      const newMilestone = new MilestoneSchema({
        ...create_milestoneDto,
        project: projectId
      });
      const milestone = await newMilestone.save();

    // const addMilestoneForProject = await ProjectSchema.findByIdAndUpdate(
    //   projectId,
    //     { $push: { milestone: milestone._id } },
    //     { new: true, useFindAndModify: false }
    //   );
  
      project.milestone.unshift({ 
        milestoneid: newMilestone._id,
        milestonename: newMilestone.milestonetitle,
       } as IMilestoneMember);
      await project.save();

    await project.save();

    return project;
  }

  public async addMilestoneForTestPlan(
    testplanId: string,
    milestoneId: string): Promise<ITestPlan> 
  {    
    const testplan = await TestPlanSchema.findById(testplanId).exec();
    if (!testplan) throw new HttpException(400, 'TestPlan is not exist');

    const milestone = await MilestoneSchema.findById(milestoneId).exec();
    if (!milestone) throw new HttpException(400, 'Milestone is not exist');

    if (
        testplan.milestone &&
        testplan.milestone.some((item: IMilestone) => item._id.toString() === milestoneId)
      ) {throw new HttpException(400, 'This milestone has already been in testplan');}

    const addMilestoneForTestPlan = await TestPlanSchema.findByIdAndUpdate(
        testplanId,
        { $push: { milestone: milestone._id } },
        { new: true, useFindAndModify: false }
      );

    await testplan.save();

    return testplan;
  }

  public async createMilestoneAndAddTestPlan(
    create_milestoneDto: CreateMilestoneDto,
    projectId: string,
    testplanId: string): Promise<ITestPlan> 
  {  
    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project is not exist');

    const testplan = await TestPlanSchema.findById(testplanId).exec();
    if (!testplan) throw new HttpException(400, 'TestPlan is not exist');

    const existingMilestone = await MilestoneSchema.findOne(
        { name: create_milestoneDto.milestonetitle, project: projectId}).exec();
      if (existingMilestone)
        throw new HttpException(400, 'Name Milestone existed');
  
      const newMilestone = new MilestoneSchema({
        ...create_milestoneDto,
        project: projectId
      });
      const milestone = await newMilestone.save();

      const addMilestoneForProject = await ProjectSchema.findByIdAndUpdate(
        projectId,
          { $push: { milestone: milestone._id } },
          { new: true, useFindAndModify: false }
        );
        await project.save();

    const addMilestoneForTestplan = await TestPlanSchema.findByIdAndUpdate(
        testplanId,
        { $push: { milestone: milestone._id } },
        { new: true, useFindAndModify: false }
      );
        await testplan.save();

    return testplan;
  }

  public async getAllMilestoneOfProject(projectId: string): Promise<Partial<IMilestone>[]> {
    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project id is not exist');

    const milestoneIds = project.milestone.map((milestoneid) => {
      return milestoneid.milestoneid;
    });


    const milestones = MilestoneSchema
    .find({_id: milestoneIds}, 'milestonetitle description start_date end_date is_completed')
    .sort({ start_date: 'asc' })
    .exec();
    return milestones;
  }

  public async searchMilestoneOfProject(projectId: string, keyword: string): Promise<Partial<IMilestone>[]> {
    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project id is not exist');

    const milestoneIds = project.milestone.map((milestoneid) => {
      return milestoneid.milestoneid;
    });

    const milestones = MilestoneSchema.find({_id: milestoneIds, milestonetitle: new RegExp(keyword, 'i')}, 'milestonetitle description start_date end_date is_completed').exec();
    return milestones;
  }

  public async getAllMilestoneOfTestPlan(testplanId: string): Promise<Partial<IMilestone>[]> {
    const milestones = TestPlanSchema.find({ _id: testplanId })
    .populate('milestone', ['name', 'start_date', 'target_date'])
    .exec();
    if(!milestones){throw new HttpException(400, 'Testplan id is not exist');}
    return milestones;
  }

  public async getMilestoneById(milestoneId: string): Promise<IMilestone> {
    const milestone = await this.milestoneSchema.findById(milestoneId).exec();
    if (!milestone) {
      throw new HttpException(404, `Milestone is not exists`);
    }
    return milestone;
  }

  public async updateMilestone(
    create_milestoneDto: CreateMilestoneDto,
    milestoneId: string,
    projectId: string): Promise<IMilestone> 
    {
      const milestone = await MilestoneSchema.findById(milestoneId).exec();
      if (!milestone) throw new HttpException(400, 'Milestone id is not exist');

      const startDate = Date.parse(create_milestoneDto.start_date.toString());
      const endDate = Date.parse(create_milestoneDto.end_date.toString()) + 10000;

      if(startDate > endDate)
      {throw new HttpException(400, 'Start Date can not more than End Date');}
  
      const existingMilestone = await MilestoneSchema.find(
          { milestonetitle: create_milestoneDto.milestonetitle } 
      ).exec();
  
      if (existingMilestone.length > 1)
        throw new HttpException(400, 'Name Milestone existed');
  
        if(existingMilestone.length == 0){}
        else{
          if(existingMilestone[0].milestonetitle === milestone.milestonetitle){}
          else{ throw new HttpException(400, 'Name Milestone existed'); }
        }
  
  
      const updatedMilestone = await MilestoneSchema.findOneAndUpdate(
        { _id: milestoneId },
        {$set: {         
          milestonetitle: create_milestoneDto.milestonetitle,
          description: create_milestoneDto.description,
          start_date: create_milestoneDto.start_date,
          is_completed: create_milestoneDto.is_completed,
          end_date: create_milestoneDto.end_date,
          updated_date: Date.now(),    
         }},
        { new: true}
      ).exec();
      if (!updatedMilestone) throw new HttpException(400, 'Update Milestone is not success');
  
      return updatedMilestone;
    }

  public async removeMilestoneFromTestPlan(testplanId: string, milestoneId: string): Promise<ITestPlan> 
  {
    const testplan = await TestPlanSchema.findById(testplanId).exec();
    if (!testplan) throw new HttpException(400, 'TestPlan id is not exist');

    const milestone = await MilestoneSchema.findById(milestoneId).exec();
    if (!milestone) throw new HttpException(400, 'Milestone id is not exist');

    if (
        testplan.milestone &&
        testplan.milestone.findIndex(
        (item: IMilestone) => item._id.toString() === milestoneId
      ) == -1
    ) {
      throw new HttpException(400, 'You has not yet been milestone of this testplan');
    }

    testplan.milestone = testplan.milestone.filter(
      ({ _id }) => _id.toString() !== milestoneId
    );
    await testplan.save();
    return testplan;
  }

  public async removeAndDeleteMilestoneFromProject(projectId: string, milestoneId: string): Promise<IProject> 
  {
    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project id is not exist');

    const milestones = await MilestoneSchema.findById(milestoneId).exec();
    if (!milestones) throw new HttpException(400, 'Milestone is not exist');

    if (
        project.milestone &&
        project.milestone.findIndex(
        (item: IMilestoneMember) => item.milestoneid.toString() === milestoneId
      ) == -1
    ) {
      throw new HttpException(400, 'You has not yet been milestone of this project');
    }

    project.milestone = project.milestone.filter(
      ({ milestoneid }) => milestoneid.toString() !== milestoneId
    );
    await project.save();

    const deletedMilestone = await MilestoneSchema.findOneAndDelete({
        _id: milestoneId,
      }).exec();
      if (!deletedMilestone) throw new HttpException(400, 'Delete Milestone is not success');
    return project;
  }

  public async removeAndDeleteMilestoneFromTestPlan(projectId: string, testplanId: string, milestoneId: string): Promise<ITestPlan> 
  {
    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project id is not exist');

    const testplan = await TestPlanSchema.findById(testplanId).exec();
    if (!testplan) throw new HttpException(400, 'TestPlan id is not exist');

    const milestone = await MilestoneSchema.findById(milestoneId).exec();
    if (!milestone) throw new HttpException(400, 'Milestone id is not exist');

    if (
      project.milestone &&
      project.milestone.findIndex(
      (item: IMilestoneMember) => item.milestoneid.toString() === milestoneId
      ) == -1
       ) {
          throw new HttpException(400, 'You has not yet been milestone of this project');
         }
         project.milestone = project.milestone.filter(
          ({ milestoneid }) => milestoneid.toString() !== milestoneId
        );
        await project.save();

    if (
        testplan.milestone &&
        testplan.milestone.findIndex(
        (item: IMilestone) => item._id.toString() === milestoneId
      ) == -1
    ) {
        throw new HttpException(400, 'You has not yet been milestone of this testplan');
      }
    testplan.milestone = testplan.milestone.filter(
      ({ _id }) => _id.toString() !== milestoneId
    );
    await testplan.save();

    const deletedMilestone = await MilestoneSchema.findOneAndDelete({
        _id: milestoneId,
      }).exec();
      if (!deletedMilestone) throw new HttpException(400, 'Delete Milestone is not success');

    return testplan;
  }

}
export default MilestoneService;