import { HttpException } from "@core/exceptions";
import { IMilestone, MilestoneSchema } from "@modules/milestone"
import { ITestPlan, TestPlanSchema } from "@modules/testplan";
import CreateMilestoneDto from "./dtos/create_milestone.dto";

class MilestoneService {
  public milestoneSchema = MilestoneSchema;

  public async CreateMilestone(
    create_milestoneDto: CreateMilestoneDto,
    testplanId: string): Promise<ITestPlan> 
  {  
    console.log(testplanId);  
    const project = await TestPlanSchema.findById(testplanId).exec();
    if (!project) throw new HttpException(400, 'TestPlan is not exist');

    const existingMilestone = await MilestoneSchema.findOne(
        { name: create_milestoneDto.name}).exec();
      if (existingMilestone)
        throw new HttpException(400, 'Name Milestone existed');
  
      const newMilestone = new MilestoneSchema({
        ...create_milestoneDto
      });
      const milestone = await newMilestone.save();

    const addMilestoneForTestplan = await TestPlanSchema.findByIdAndUpdate(
        testplanId,
        { $push: { milestone: milestone._id } },
        { new: true, useFindAndModify: false }
      );

    await project.save();

    return project;
  }

  public async removeMilestone(testplanId: string, milestoneId: string): Promise<ITestPlan> 
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

    const deletedMilestone = await MilestoneSchema.findOneAndDelete({
        _id: milestoneId,
      }).exec();
      if (!deletedMilestone) throw new HttpException(400, 'Delete Milestone is not success');
    return testplan;
  }

  public async updateMilestone(
    create_milestoneDto: CreateMilestoneDto,
    milestoneId: string): Promise<IMilestone> 
  {
    const milestone = await MilestoneSchema.findById(milestoneId).exec();
    if (!milestone) throw new HttpException(400, 'Milestone id is not exist');

    const existingMilestone = await MilestoneSchema.find(
        { name: create_milestoneDto.name } 
    ).exec();

    if (existingMilestone.length > 0)
      throw new HttpException(400, 'Name existed');


    const updatedMilestone = await MilestoneSchema.findOneAndUpdate(
      { _id: milestoneId },
      {$set: {         
        name: create_milestoneDto.name,
        target_date: create_milestoneDto.target_date,
        start_date: create_milestoneDto.start_date  
       }},
      { new: true}
    ).exec();
    if (!updatedMilestone) throw new HttpException(400, 'Update Milestone is not success');

    return updatedMilestone;
  }

  public async getAllMilestoneOfProject(projectId: string): Promise<Partial<IMilestone>[]> {
    const requirements = TestPlanSchema.find({ _id: projectId })
    .populate('milestone', ['name', 'start_date', 'target_date'])
    .exec();
    return requirements;
  }
  

}
export default MilestoneService;