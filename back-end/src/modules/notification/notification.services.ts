import { HttpException } from "@core/exceptions";
import { INotification, NotificationSchema } from "@modules/notification"
import { IProject, ProjectSchema } from "@modules/project";
import { ITestPlan, TestPlanSchema } from "@modules/testplan";
import CreateNotificationDto from "./dtos/create_notification.dto";
import UpdateNotificationDto from "./dtos/update_notification.dto";

class NotificationService {
  public notificationSchema = NotificationSchema;

  public async createNotification(
    create_notificationDto: CreateNotificationDto,
    projectId: string)
  {  
    //const project = await ProjectSchema.findById(projectId).exec();
    //if (!project) throw new HttpException(400, 'Project is not exist');

      const newNotification = new NotificationSchema({
        ...create_notificationDto,
        project: projectId
      });
      const notification = await newNotification.save();
  
    //   const addNotificationForProject = await ProjectSchema.findByIdAndUpdate(
    //     projectId,
    //     { $push: { notification: newNotification._id } },
    //     { new: true, useFindAndModify: false }
    //   );

    //await project.save();

    return newNotification;
  }

  public async getAllNotificationOfUser(userId: string){

    const notifications = await this.notificationSchema
    .find({user: userId}, 'description created_date is_read url')
    .sort({ created_date: 'desc' })
    //.limit(10)
    .exec();
    return notifications;
  }

  public async updateNotification(update_notificationDto: UpdateNotificationDto)
  {  
    const updateNotification = await this.notificationSchema.findOneAndUpdate(
      { _id: update_notificationDto.id },
      {$set: {         
        is_read: true,  
      }},
      { new: true} //get notification after update
    ).exec();
    if (!updateNotification) throw new HttpException(400, 'Update Notification is not success');
    //console.log(updatedTestPlan);

    return updateNotification;
  }

}
export default NotificationService;