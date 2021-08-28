import { HttpException } from '@core/exceptions';
import bcryptjs from 'bcryptjs';
import gravatar from 'gravatar';
import ProjectSchema from './project.model';
import CreateProjectDto from './dtos/create_project.dto';
import IProject, { IMember } from './project.interface';
import { IUser, UserSchema } from '@modules/users';
import SetMemberDto from './dtos/set_member.dto';
import { isNotEmpty } from 'class-validator';
import UpdateProjectDto from './dtos/update_project.dto';
import { TestPlanSchema } from '@modules/testplan';
import { BuildSchema } from '@modules/build';
import { MilestoneSchema } from '@modules/milestone';
import { TestSuiteSchema } from '@modules/TestSuite';
import { TestCaseSchema } from '@modules/testcase';
import { TestExecutionSchema } from '@modules/testexecution';
import { IProjectRole } from '@modules/users/users.interface';
import ChangeRoleMemberDto from './dtos/change_role.dto';
import jwt from 'jsonwebtoken';
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const nodeMailer = require('nodemailer')
const adminEmail = 'hung08596@gmail.com'
const adminPassword = '3982158sS@'
const mailHost = 'smtp.gmail.com'
const mailPort = 587

class ProjectService {
  public projectSchema = ProjectSchema;

  public async createProject(
    userId: string,
    projectDto: CreateProjectDto
  ){
    const user = await UserSchema.findById(userId).select('-password').exec();
    if (!user) throw new HttpException(400, 'User id is not exist');

    const existingProject = await ProjectSchema.findOne({projectname: projectDto.projectname, created_user: userId}).exec();
    if (existingProject)
      throw new HttpException(400, 'Name Project existed');

    const newProject = new ProjectSchema({
      ...projectDto,
      created_user: userId,
      updated_user: userId,
      created_date: Date.now(),
      updated_date: Date.now(),
    });
    const newproject = await newProject.save();

    const project = await ProjectSchema.findById(newproject._id).exec();
    if (!project) throw new HttpException(400, 'Project is not exist');

    const addMyProjectForUser = await UserSchema.findByIdAndUpdate(
      userId,
      { $push: { myproject: newproject._id } },
      { new: true, useFindAndModify: false }
    );

    // const addInProjectForUser = await UserSchema.findByIdAndUpdate(
    //   userId,
    //   { $push: { inproject: newproject._id } },
    //   { new: true, useFindAndModify: false }
    // );

    user.inproject.unshift({ 
      _id: newproject._id,
      projectname: newproject.projectname,
      role: 'Project Manager',
      description: newproject.description,
      status: newproject.status
     } as IProjectRole);
    await user.save();

    project.members.unshift({ 
      user: user._id,
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      role: 'Project Manager',
     } as IMember);
    await project.save();

    return true;
  }

  public async getAllProjectByCreatedUser(userId: string): Promise<Partial<IProject>[]> {
    const projects = ProjectSchema.find({created_user: userId}, 'projectname description status').exec();
    return projects;
  }

  public async getProjectById(projectId: string) {
    const project = ProjectSchema.findById(projectId, 'projectname active is_public status description').exec();
    //const project = ProjectSchema.findById(projectId).exec();
    return project;
  }

  public async getAllProjectByUserJoin(userId: string): Promise<Partial<IProject>[]> {

    const user = await UserSchema.findById(userId).exec();
    if (!user) throw new HttpException(400, 'User id is not exist');

    const projectIds = user.inproject.map((project) => {
      return project._id;
    });

    const projects = ProjectSchema.find({_id: projectIds}, 'projectname description status').exec();
    return projects;
  }

  public async getAllProject(): Promise<IProject[]> {
    const projects = ProjectSchema.find().exec();
    return projects;
  }

  public async getAllMembers(projectId: string) {
    const project = await ProjectSchema.find({_id: projectId}, 'members')
    .populate({
      path: 'members',
      select: 'user username email role'
    }).exec();
    if (!project) throw new HttpException(400, 'Project id is not exist');
    //const result = await UserSchema.deleteMany({ _id: [...userIds] }).exec();
    //if (!result.ok) throw new HttpException(409, 'Your id is invalid');
    return project;
  }

  public async getRoleUserJoin(userId: string){

    const user = await UserSchema.findById(userId, 'inproject -_id').exec();
    if (!user) throw new HttpException(400, 'User id is not exist');

    const projectIds = user.inproject.map((project) => {
      return project._id;
    });

    const projects:any = ProjectSchema.find({_id: projectIds}, 'projectname description status').exec();

    return projects;
  }

  public async updateProject(
    projectId: string,
    projectDto: UpdateProjectDto,
    userId: string
    ): Promise<IProject> {
    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project id is not exist');

    const existingProject = await ProjectSchema.find(
        { name: projectDto.projectname } 
    ).exec();

    if (existingProject.length > 0)
      throw new HttpException(400, 'Name existed');


    const updatedProject = await ProjectSchema.findOneAndUpdate(
      { _id: projectId },
      {$set: {         
        projectname: projectDto.projectname,
        description: projectDto.description,
        status: projectDto.status,
        active: projectDto.active,
        is_public: projectDto.is_public,
        updated_date: Date.now(),
        updated_user: userId        
       }},
      { new: true}
    ).exec();
    if (!updatedProject) throw new HttpException(400, 'Update is not success');

    const updateUser = await UserSchema.updateOne(
      {_id: userId, "inproject._id": projectId},
      {$set: {
      "inproject.$.projectname": projectDto.projectname,
      "inproject.$.description": projectDto.description,
      "inproject.$.status": projectDto.status
      }})
      .exec();
      if (!updateUser) throw new HttpException(400, 'Update Project is not success');

    return updatedProject;
  }

  public async deleteProject(projectId: string, userid: string){
    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project id is not exist');

    const user = await UserSchema.findById(userid).exec();
    if (!user) throw new HttpException(400, 'user is not exist');
      //const milestoneIds = project.milestone.map((item) => {return item.milestoneid;});

    // delete all testcase
    if(project.testcase !== undefined || project.testcase > 0){
      const listTestcase = await TestCaseSchema.deleteMany({ _id: [...project.testcase] }).exec();
      if (!listTestcase.ok) throw new HttpException(409, 'List testcase is invalid');
      project.testcase = project.testcase.filter(
        item =>  !project.testcase.includes(item)
      );
    }

        // delete all testsuite
    if(project.testsuite !== undefined || project.testsuite > 0){
      const listTestSuite = await TestSuiteSchema.deleteMany({ _id: [...project.testsuite] }).exec();
      if (!listTestSuite.ok) throw new HttpException(409, 'List Testsuite is invalid');
      project.testsuite = project.testsuite.filter(
        item =>  !project.testsuite.includes(item)
      );
    }

    // delete all execution
    if(project.testexecution !== undefined || project.testexecution > 0){
      const listTestcase = await TestExecutionSchema.deleteMany({ _id: [...project.testexecution] }).exec();
      if (!listTestcase.ok) throw new HttpException(409, 'List execution is invalid');
      project.testexecution = project.testexecution.filter(
        item =>  !project.testexecution.includes(item)
      );
    }

    // delete all build
    if(project.build !== undefined || project.build > 0){
      const listBuild = await BuildSchema.deleteMany({ _id: [...project.build] }).exec();
      if (!listBuild.ok) throw new HttpException(409, 'List Build is invalid');
      project.build = project.build.filter(
        item =>  !project.build.includes(item)
      );
    }

    // delete all milestone
    if(project.milestone !== undefined || project.milestone > 0){
      const milestoneIds = project.milestone.map((item) => {return item.milestoneid;});
      if(milestoneIds !== undefined && milestoneIds !== null){
        const listMilestone = await MilestoneSchema.deleteMany({ _id: [...milestoneIds] }).exec();
        if (!listMilestone.ok) throw new HttpException(409, 'List Milestone is invalid');
        project.milestone = project.milestone.filter(
          item =>  !project.milestone.includes(item)
        );
      }
    }

    // delete all testplan
    if(project.testplan !== undefined || project.testplan > 0){
      const listTestplan = await TestPlanSchema.deleteMany({ _id: [...project.testplan] }).exec();
      if (!listTestplan.ok) throw new HttpException(409, 'List testplan is invalid');
      project.testplan = project.testplan.filter(
        item =>  !project.testplan.includes(item)
      );
    }

    //remove from user
    if (user.inproject && user.inproject.findIndex((item) => item._id.toString() === projectId) == -1)
    {throw new HttpException(400, 'You has not yet been project of this user');}
    user.inproject = user.inproject.filter(({ _id }) => _id.toString() !== projectId);
    await user.save();

    // // update all user
    // const listUser = project.members.map((user) => {
    //   return user.user;
    // });
    //   const listTestplan = await UserSchema.updateMany(
    //     { _id: [...listUser] },{
    //       $set: {
    //         project
    //       }
    //   }).exec();
    //   if (!listTestplan.ok) throw new HttpException(409, 'List user is invalid');

    
    const deletedProject = await ProjectSchema.findOneAndDelete({
      _id: projectId,
    }).exec();
    if (!deletedProject) throw new HttpException(400, 'Delete project is not success');

    return deletedProject;
    //return true;
  }

  public async mailInviteMember(adduser: SetMemberDto, projectId: string, userInviteId: string): Promise<string> {
    const user = await UserSchema.findOne({ email: adduser.email }).exec();
    if (!user) throw new HttpException(409, 'Your email is invalid');

    const userInvite = await UserSchema.findOne({ _id: userInviteId }).exec();
    if (!userInvite) throw new HttpException(409, 'User invite is invalid');

    const project = await ProjectSchema.findOne({ _id: projectId }).exec();
    if (!project) throw new HttpException(409, 'Project is not exist');

    const secretkey: string = process.env.JWT_TOKEN_FORGOTPASSWORD!;
    const token = jwt.sign({_id: user._id}, secretkey, {expiresIn: '4320m'});
    let verificationLink = `https://testcontrols.herokuapp.com/auth/verify-member/${adduser.email}/${projectId}/${token}`;

    const msg = {
      to: adduser.email, // Change to your recipient
      from: adminEmail, // Change to your verified sender
      subject: 'Invite to Project',
      text: 'Invite to Project',
      html: `
      <title>Reset Password Email Template</title>
    <meta name="description" content="Reset Password Email Template.">
    <!-- <style type="text/css">
        a:hover {text-decoration: underline !important;}
    </style> -->
</head>

<body>
    <!--100% body table-->
    <table cellspacing="0" border="0" cellpadding="0" width="100%">
        <tr>
            <td>
                <table style="max-width:670px;  margin:0 auto;" width="100%" border="0"
                    align="center" cellpadding="0" cellspacing="0">
                   
                    <tr>
                        <td>
                            <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                style="max-width:670px;">
                                <tr>
                                    <td>                                        
                                        <h1 style="color:#333;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:300;
                                        text-align:center;line-height:1.2;word-break:normal;font-size:24px;margin:10px 0 25px;padding:0">
                                        <strong>${userInvite.fullname}</strong> has invited you to <strong>${project.projectname}</strong> project
                                        </h1>

                                        <hr style="color:#d9d9d9;background-color:#d9d9d9;height:1px;margin:20px 0;border:none">
                                        
                                        <h2>Dear ${user.fullname},</h2>

                                        <p>
                                            ${userInvite.fullname} invited you to ${project.projectname} to work on
                                        </p>
                                        <p>
                                            You can 
                                            <a href=${verificationLink} target="_blank">accept or decline</a>
                                            this invitation.
                                        </p>
                                        <p>
                                            This invitation will expire in 3 days.
                                        </p>

                                        <div style="text-align: center">
                                        <a href=${verificationLink}
                                            style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:15px; color:#fff;
                                            text-transform:uppercase; font-size:16px;padding:10px 24px;display:inline-block;border-radius:50px;">
                                            View invitation
                                        </a>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:30px">
                                        <p>
                                             <strong>Note:</strong>
                                             If you were not expecting this invitation, you can ignore this email.                                          
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <tr>
                            <td style="text-align:center;">
                                <p>&copy; <strong>Test Control, 2021</strong></p>
                            </td>
                        </tr>
                </table>
            </td>
        </tr>
    </table>
    <!--/100% body table-->
</body>
             `,
    }
    sgMail.send(msg)

    return 'Send mail successfully' ;
  }

  public async verifyMember(adduser: SetMemberDto, roleMember: string, projectId: string): Promise<IProject> {
    const existuser = await UserSchema.findOne(
      { email: adduser.email}).exec();
    if (!existuser) throw new HttpException(400, 'Email existed');

    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project is not exist');


    if (
      project.members &&
      project.members.some((item: IMember) => item.email === existuser.email)
    ) {throw new HttpException(400, 'This user has already been in project');}

    project.members.unshift({ 
      user: existuser._id,
      username: existuser.username,
      fullname: existuser.fullname,
      email: existuser.email,
      role: roleMember,
     } as IMember);
    await project.save();

    // const addProjectForUser = await UserSchema.findByIdAndUpdate(
    //   existuser._id,
    //   { $push: { inproject: project._id } },
    //   { new: true, useFindAndModify: false }
    // );

    const user = await UserSchema.findById(existuser._id).exec();
    if (!user) throw new HttpException(400, 'User is not exist');

    user.inproject.unshift({ 
      _id: project._id,
      projectname: project.projectname,
      role: roleMember,
      description: project.description,
      status: project.status
     } as IProjectRole);
    await user.save();

    return project;
  }

  public async removeMember(projectId: string, userId: string, userrequestId: string): Promise<IProject> {

    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project id is not exist');

    const user = await UserSchema.findById(userId).select('-password').exec();
    if (!user) throw new HttpException(400, 'User id is not exist');

    if( project.members 
        && project.members.some((item: IMember) =>item.user.toString() === userrequestId 
        &&item.role.toString() === 'Test Lead')){
        if( project.members 
          && project.members.some((item: IMember) => item.user.toString() === userId 
          && item.role.toString() === 'Project Manager')) 
        throw new HttpException(400, 'Test Lead can not remove Project Manager');
    }

    //user is PM
    if( project.members 
      && project.members.some((item: IMember) =>item.user.toString() === userrequestId 
      && item.role.toString() === 'Project Manager')){

        //if remove myselt
        if(userrequestId.toString() == userId.toString()){
          const checkExistMoreOnePM = project.members.filter(({ role }) => role?.toString() == "Project Manager");
          if(checkExistMoreOnePM.length == 1){ throw new HttpException(400, 'This project have been only one Project Manager');} 
        }
    }

    if (
      project.members &&
      project.members.findIndex(
        (item: IMember) => item.user.toString() === userId
      ) == -1
    ) {throw new HttpException(400, 'You has not yet been member of this group');}

    if (project.members.length == 1) {
      throw new HttpException(400, 'You are last member of this group. Cannot delete');
    }

    project.members = project.members.filter(
      ({ user }) => user.toString() !== userId
    );

    await project.save();

    user.inproject = user.inproject.filter(
      ({ _id }) => _id.toString() !== projectId
    );

    await user.save();

    return project;
  }

  public async changeRoleMember(changeRole: ChangeRoleMemberDto, projectId: string, userrequestId: string): Promise<IProject> {

    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project is not exist');

    const user = await UserSchema.findById(changeRole.userid).exec();
    if (!user) throw new HttpException(400, 'User is not exist');

    //check user exist in project
    if (project.members && project.members.findIndex((item) => item.user.toString() === changeRole.userid) == -1)
    {throw new HttpException(400, 'user not exist in project');}

    if( project.members &&
      project.members.some((item: IMember) =>
      item.user.toString() === userrequestId &&
      item.role.toString() === 'Test Lead')
    ){
      if( project.members &&
          project.members.some((item: IMember) =>
          item.user.toString() === changeRole.userid &&
          item.role.toString() === 'Project Manager')
        ) throw new HttpException(400, 'Test Lead can not change role Project Manager');
    }

     if(changeRole.role != "Project Manager" && changeRole.userid == userrequestId){
       const checkExistMoreOnePM = project.members.filter(({ role }) => role?.toString() == "Project Manager");
       if(checkExistMoreOnePM.length == 1){ throw new HttpException(400, 'This project have been only one Project Manager');}  
     }

    const updateInproject = await UserSchema.updateOne(
      {_id: changeRole.userid, "inproject._id": projectId},
      {$set: {
      "inproject.$.role": changeRole.role
      }})
      .exec();
      if (!updateInproject) throw new HttpException(400, 'Update role is not success');

      const updateMember = await ProjectSchema.updateOne(
        {_id: projectId, "members.user": changeRole.userid},
        {$set: {
        "members.$.role": changeRole.role
        }})
        .exec();
        if (!updateMember) throw new HttpException(400, 'Update role is not success');

    return project;
  }

  public async calEffortOverview(projectId: string){
    //check project exist
    const project = await ProjectSchema.findById(projectId, 'testexecution testplan members build')
    .populate({
      path: 'testexecution',
      select: 'testexecutionname updated_user status'
    })
    .exec();
    if (!project) throw new HttpException(400, 'Project is not exist');

    // get list labels
    let labels:any = [];
    for(let member of project.members){
      labels.push(member.fullname);
    }

    //get list test execution
    let list_execution:any=[{
      testexecutionname: {type: String},
      tester: {type: String},
      status: {type: String}
    }]; list_execution.pop();
    for(let element in project.testexecution){
      list_execution.push({
        testexecutionname: project.testexecution[element]["testexecutionname"],
        tester: project.testexecution[element]["updated_user"],
        status: project.testexecution[element]["status"]
      })
    }

    //get data
    let data:any = [];
    let count_execution = 0;
    for(let member of project.members){
      for(let element of list_execution){
        if(member.user != undefined && element.tester != undefined){
          if(member.user.toString() === element.tester.toString()){
            if(element.status === "Pass" || element.status === "Block" || element.status === "Fail"){
              count_execution +=1;
            }
          }
        }
      }
      data.push(count_execution);
      count_execution = 0;
    }

    let result:any = {
      labels: "",
      data: ""
    };
    result={
      labels: labels,
      data: data
    }

    return result;
      
  }

  public async dataOverview(projectId: string){
    //check project exist
    const project = await ProjectSchema.findById(projectId, 'testexecution testplan members build')
    .populate({
      path: 'testexecution',
      select: 'testexecutionname tester status updated_date'
    })
    .exec();
    if (!project) throw new HttpException(400, 'Project is not exist');

    //get list test execution
    let list_execution:any=[{
      testexecutionname: {type: String},
      tester: {type: String},
      status: {type: String}
    }]; list_execution.pop();

    let list_execution_temp:any=[{
      testexecutionname: {type: String},
      tester: {type: String},
      status: {type: String},
      time: {type: String}
    }]; list_execution_temp.pop();

    // get all execution
    for(let element in project.testexecution){
      list_execution_temp.push({
        testexecutionname: project.testexecution[element]["testexecutionname"],
        tester: project.testexecution[element]["tester"],
        status: project.testexecution[element]["status"],
        time: project.testexecution[element]["updated_date"]
      })
    }

    // get execution in this month
    let today = new Date();
    for(let element of list_execution_temp){
      if(today.getMonth() - element.time.getMonth() == 0){
        list_execution.push({
          testexecutionname: element.testexecutionname,
          tester: element.tester,
          status: element.status
        })        
      }
    }

    //get data
    let count_execution_valid = 0;
    let count_execution_pass = 0;
    let count_execution_fail = 0;
    let count_execution_block = 0;
    let count_execution_untest = 0;
    
    for(let element of list_execution){
          if(element.status === "Pass" || element.status === "Block" 
          || element.status === "Fail" || element.status === "Untest"){
            count_execution_valid +=1;
          }
          if(element.status === "Pass")
            count_execution_pass +=1;

          else if(element.status === "Fail")
            count_execution_fail +=1;

          else if(element.status === "Block")
            count_execution_block +=1;

          else if(element.status === "Untest")
            count_execution_untest +=1;   
    }

    let data:any =[];
    data.push(count_execution_pass);
    data.push(count_execution_fail);
    data.push(count_execution_block);
    data.push(count_execution_untest);

    let result:any = {
      overviewdata: {type: String},
      data: ""
    };
    return result = {
      overviewdata: count_execution_valid,
      data: data
    }
      
  }

  public async numberOfExecuteInEachMonth(projectId: string){
    //check project exist
    const project = await ProjectSchema.findById(projectId, 'testexecution testplan members build')
    .populate({
      path: 'testexecution',
      select: 'testexecutionname tester status updated_date'
    })
    .exec();
    if (!project) throw new HttpException(400, 'Project is not exist');

    //get list test execution
    let list_execution_temp:any=[{
      testexecutionname: {type: String},
      tester: {type: String},
      status: {type: String},
      time: {type: String}
    }]; list_execution_temp.pop();

    let list_execution_Jan:any=[{
      testexecutionname: {type: String},
      tester: {type: String},
      status: {type: String}
    }]; list_execution_Jan.pop();

    let list_execution_Feb:any=[{
      testexecutionname: {type: String},
      tester: {type: String},
      status: {type: String}
    }]; list_execution_Feb.pop();

    let list_execution_Mar:any=[{
      testexecutionname: {type: String},
      tester: {type: String},
      status: {type: String}
    }]; list_execution_Mar.pop();

    let list_execution_Apr:any=[{
      testexecutionname: {type: String},
      tester: {type: String},
      status: {type: String}
    }]; list_execution_Apr.pop();

    let list_execution_May:any=[{
      testexecutionname: {type: String},
      tester: {type: String},
      status: {type: String}
    }]; list_execution_May.pop();

    let list_execution_Jun:any=[{
      testexecutionname: {type: String},
      tester: {type: String},
      status: {type: String}
    }]; list_execution_Jun.pop();

    let list_execution_Junly:any=[{
      testexecutionname: {type: String},
      tester: {type: String},
      status: {type: String}
    }]; list_execution_Junly.pop();

    let list_execution_Aug:any=[{
      testexecutionname: {type: String},
      tester: {type: String},
      status: {type: String}
    }]; list_execution_Aug.pop();

    let list_execution_Sep:any=[{
      testexecutionname: {type: String},
      tester: {type: String},
      status: {type: String}
    }]; list_execution_Sep.pop();

    let list_execution_Oct:any=[{
      testexecutionname: {type: String},
      tester: {type: String},
      status: {type: String}
    }]; list_execution_Oct.pop();

    let list_execution_Nov:any=[{
      testexecutionname: {type: String},
      tester: {type: String},
      status: {type: String}
    }]; list_execution_Nov.pop();

    let list_execution_Dec:any=[{
      testexecutionname: {type: String},
      tester: {type: String},
      status: {type: String}
    }]; list_execution_Dec.pop();

    // get all execution
    for(let element in project.testexecution){
      list_execution_temp.push({
        testexecutionname: project.testexecution[element]["testexecutionname"],
        tester: project.testexecution[element]["tester"],
        status: project.testexecution[element]["status"],
        time: project.testexecution[element]["updated_date"]
      })
    }

    // get execution in this month
    let today = new Date();
    for(let element of list_execution_temp){
      if(element.time.getMonth() == 0){
        list_execution_Jan.push({
          testexecutionname: element.testexecutionname,
          tester: element.tester,
          status: element.status
        })        
      }

      else if(element.time.getMonth() == 1){
        list_execution_Feb.push({
          testexecutionname: element.testexecutionname,
          tester: element.tester,
          status: element.status
        })        
      }

      else if(element.time.getMonth() == 2){
        list_execution_Mar.push({
          testexecutionname: element.testexecutionname,
          tester: element.tester,
          status: element.status
        })        
      }

      else if(element.time.getMonth() == 3){
        list_execution_Apr.push({
          testexecutionname: element.testexecutionname,
          tester: element.tester,
          status: element.status
        })        
      }

      else if(element.time.getMonth() == 4){
        list_execution_May.push({
          testexecutionname: element.testexecutionname,
          tester: element.tester,
          status: element.status
        })        
      }

      else if(element.time.getMonth() == 5){
        list_execution_Jun.push({
          testexecutionname: element.testexecutionname,
          tester: element.tester,
          status: element.status
        })        
      }

      else if(element.time.getMonth() == 6){
        list_execution_Junly.push({
          testexecutionname: element.testexecutionname,
          tester: element.tester,
          status: element.status
        })        
      }

      else if(element.time.getMonth() == 7){
        list_execution_Aug.push({
          testexecutionname: element.testexecutionname,
          tester: element.tester,
          status: element.status
        })        
      }

      else if(element.time.getMonth() == 8){
        list_execution_Sep.push({
          testexecutionname: element.testexecutionname,
          tester: element.tester,
          status: element.status
        })        
      }

      else if(element.time.getMonth() == 9){
        list_execution_Oct.push({
          testexecutionname: element.testexecutionname,
          tester: element.tester,
          status: element.status
        })        
      }

      else if(element.time.getMonth() == 10){
        list_execution_Nov.push({
          testexecutionname: element.testexecutionname,
          tester: element.tester,
          status: element.status
        })        
      }

      else if(element.time.getMonth() == 11){
        list_execution_Dec.push({
          testexecutionname: element.testexecutionname,
          tester: element.tester,
          status: element.status
        })        
      }

    }

    // count data
    let execution_pass:any = [];
    let execution_fail:any = [];
    let execution_block:any = [];  

    function getStatus(list_execution: any) {
      let count_execution_pass = 0;
      let count_execution_fail = 0;
      let count_execution_block = 0;
      let count_execution_untest = 0;

      for(let element of list_execution){
            if(element.status === "Pass")
              count_execution_pass +=1;
  
            else if(element.status === "Fail")
              count_execution_fail +=1;
  
            else if(element.status === "Block")
              count_execution_block +=1;
  
            else if(element.status === "Untest")
              count_execution_untest +=1;   
      }
      execution_pass.push(count_execution_pass);
      execution_fail.push(count_execution_fail);
      execution_block.push(count_execution_block);

    }
    
    getStatus(list_execution_Jan);
    getStatus(list_execution_Feb);
    getStatus(list_execution_Mar);
    getStatus(list_execution_Apr);
    getStatus(list_execution_May);
    getStatus(list_execution_Jun);
    getStatus(list_execution_Junly);
    getStatus(list_execution_Aug);
    getStatus(list_execution_Sep);
    getStatus(list_execution_Oct);
    getStatus(list_execution_Nov);
    getStatus(list_execution_Dec);    

    let result: any = {
      pass: {type: String},
      fail: {type: String},
      block: {type: String}
    };

    return result = {
      pass: execution_pass,
      fail: execution_fail,
      block: execution_block
    } 
      
  }

}
export default ProjectService;