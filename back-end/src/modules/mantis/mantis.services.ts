import { HttpException } from "@core/exceptions";
import { IMantis, MantisRoute, MantisSchema } from "@modules/mantis"
import { IProject, ProjectSchema } from "@modules/project";
import { IMember } from "@modules/project/project.interface";
import { ITestPlan, TestPlanSchema } from "@modules/testplan";
import { UserSchema } from "@modules/users";
import { IMantisRole } from "@modules/users/users.interface";
import CreateAccountMantisDto from "./dtos/create_account_mantis.dto";
import CreateMantisDto from "./dtos/create_mantis.dto";
import { ICategory, IIssue, IMemberMantis } from "./mantis.interface";
import axios from 'axios';
import ChangeRoleMemberMantisDto from "./dtos/change_role_mantis.dto";
import ChangeTokenMantisDto from "./dtos/change_token_mantis.dto";
import CreateIssueDto from "./dtos/create_issue.dto";
import { TestExecutionSchema } from "@modules/testexecution";
import { IIssue_Execution } from "@modules/testexecution/testexecution.interface";
import UpdateMantisDto from "./dtos/update_mantis.dto";
import AddCategoryMantisDto from "./dtos/add_category.dto";
import SwitchMantisDto from "./dtos/switch_mantis.dto";
import SwitchMantisOfProjectDto from "./dtos/switch_mantis_project.dto";
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const adminEmail = 'hung08596@gmail.com'
class MantisService {
  public mantisSchema = MantisSchema;

  public async createMantis(
    userId: string,
    projectId: string,
    create_model: CreateMantisDto
  ){
    //console.log(JSON.stringify(create_model, null, " "));
    const user = await UserSchema.findById(userId).select('-password').exec();
    if (!user) throw new HttpException(400, 'User id is not exist');

    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'User id is not exist');

    const list_mantis = await MantisSchema.find({project: projectId}, 'mantisname url').exec();
    if (!list_mantis) throw new HttpException(400, 'Project Id is not exist');

    for(let element of list_mantis){
      if(element.url.toString() === create_model.url)
      throw new HttpException(400, `Url ${create_model.url} has been existed in this project` );
    }

    let create_project: any = {
      name: create_model.project,
      enabled: true
    };

    let data_project: any = {
      project: "ss",
      name: "ss"
    }

    // create project
    try {
      const response = await axios.post(create_model.url+'/api/rest/projects',create_project,{
        headers: {
          'Authorization': create_model.token,
          "content-type": "application/json"
        }})
        data_project = await response.data.project;
        //console.log(JSON.stringify(data_project, null, ' '));


    } catch (error) {throw new HttpException(400, 'Connect mantis is not success or project name has been existed');}

    const newMantis = await new MantisSchema({
      created_user: userId,
      updated_user: userId,
      created_date: Date.now(),
      updated_date: Date.now(),
      url: create_model.url,
      project: projectId,
      project_id_mantis: data_project.id,
      mantisname: data_project.name
    });const newmantis = await newMantis.save();

    const mantis = await MantisSchema.findById(newmantis._id).exec();
    if (!mantis) throw new HttpException(400, 'Mantis is not exist');

    await user.mantis.unshift({ 
      _id: newmantis._id,
      mantisname: newmantis.mantisname,
      status: true,
      role: "administrator"
    } as IMantisRole);
    await user.save();

    await mantis.members.unshift({ 
      _id: user._id,
      username_mantis: "administrator",
      usermantis_id: "1",
      username: user.username,
      email: user.email,
      role_mantis: "administrator",
      is_active_backend: true,
      token_mantis: create_model.token,
      enable_mantis: true,
      protected_mantis: true,
      url: create_model.url,
      created_date: Date.now()
     } as IMemberMantis);
    await mantis.save();

    const updateProject = await ProjectSchema.findOneAndUpdate(
      { _id: project._id },
      {$set: {         
        mantis: mantis._id
       }},
      { new: true}
    ).exec();if (!updateProject) throw new HttpException(400, 'Add Mantis to Project is not success');

    return true;
  }

  public async createAndSwitchMantis(
    userId: string,
    projectId: string,
    create_model: CreateMantisDto
  ){
    //console.log(JSON.stringify(create_model, null, " "));
    const user = await UserSchema.findById(userId).select('-password').exec();
    if (!user) throw new HttpException(400, 'User id is not exist');

    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'User id is not exist');

    const oldmantis = await MantisSchema.findById(project.mantis)
    .populate({
      path: 'members'
    }).exec();
    if (!oldmantis) throw new HttpException(400, 'Mantis is not exist');

    //get token
    const listMember: any = oldmantis.members;
    let token = "";
    for(let element of listMember){
      if(element._id == userId){
        token = element.token_mantis;
      }
    }
    // create project
    let create_project: any = {
      name: create_model.project,
      enabled: true
    };
    let data_project: any = {
      project: "ss",
      name: "ss"
    }
    try {
      const response = await axios.post(create_model.url+'/api/rest/projects',create_project,{
        headers: {
          'Authorization': token,
          "content-type": "application/json"
        }})
        data_project = await response.data.project;
        //console.log('data_project'+JSON.stringify(data_project, null, ' '));


    } catch (error) {throw new HttpException(400, 'Create project error or name project has been existed');}

    const updateMantis = await MantisSchema.findOneAndUpdate(
      { _id: project.mantis },
      {$set: {         
        mantisname: data_project.name,
        project_id_mantis: data_project.id
       }},
      { new: true}
    ).exec();
    if (!updateMantis) throw new HttpException(400, 'Switch mantis is not success');

    return true;
  }

  public async switchProjectMantis(
    projectId: string,
    model: SwitchMantisDto
  ){

    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'User id is not exist');

    const mantis = await MantisSchema.findById(project.mantis).exec();
    if (!mantis) throw new HttpException(400, 'Mantis is not exist');

    console.log(JSON.stringify(model, null, ' '));

    const switchMantis = await MantisSchema.findOneAndUpdate(
      { _id: project.mantis },
      {$set: {         
        mantisname: model.mantis_name,
        project_id_mantis: model.mantis_id
       }},
      { new: true}
    ).exec();
    if (!switchMantis) throw new HttpException(400, 'Switch mantis is not success');
    return true;
  }

  public async switchMantis(
    projectId: string,
    model: SwitchMantisOfProjectDto
  ){

    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'User id is not exist');

    const mantis = await MantisSchema.findById(project.mantis).exec();
    if (!mantis) throw new HttpException(400, 'Mantis is not exist');

    if(mantis.project.toString() !== projectId.toString()) throw new HttpException(400, 'Mantis is not belong to project');

    const updateProject = await ProjectSchema.findOneAndUpdate(
      { _id: project._id },
      {$set: {         
        mantis: model.mantis_id
       }},
      { new: true}
    ).exec();if (!updateProject) throw new HttpException(400, 'Add Mantis to Project is not success');

    return true;
  }

  public async getAllMemberOfMantis(
    projectId: string
  ){

    //console.log('here get all');
    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project is not exist');

    const mantis = await MantisSchema.findById(project.mantis,
       'members.username_mantis members.username members.is_active_backend members.role_mantis members.email')
       .exec();
    if (!mantis) throw new HttpException(400, 'Mantis is not exist');

    return mantis;
  }

  public async addMemberToMantis(
    addMember_model: CreateAccountMantisDto,
    userId: string
  ){
    const user = await UserSchema.findOne({email: addMember_model.email})
    .populate({
      path: 'mantis'
    }).exec();
    if (!user) throw new HttpException(400, 'User is not exist');

    const admin = await UserSchema.findById(userId).exec();
    if (!admin) throw new HttpException(400, 'Admin is not exist');

    const project = await ProjectSchema.findById(addMember_model.projectid).exec();
    if (!project) throw new HttpException(400, 'Project is not exist');

    const mantis = await MantisSchema.findById(project.mantis)
    .populate({
      path: 'members'
    }).exec();
    if (!mantis) throw new HttpException(400, 'Mantis is not exist');

    const listMember: any = mantis.members;
    let token = "";

    for(let element of listMember){
      if(element._id == userId){
        token = element.token_mantis;
        //console.log("token: "+token); 
      }
    }

    let data = {
      username: addMember_model.username,
      password: "123456",
      real_name: user.fullname,
      email: user.email,
      access_level: {name: addMember_model.access_level},
      enabled: true,
      protected: false
    };
    
    let datarespone: any = 's';

    try {
      const response = await axios.post(mantis.url+'/api/rest/users/',data,{
        headers: {
          'Authorization': token,
          "content-type": "application/json"
        }})
        datarespone = await response.data.user;

    } //catch (error) {throw new HttpException(400, `invite member error or email ${user.email} has been existed in project `);}
    catch (error){}

    await user.mantis.unshift({ 
      _id: mantis._id,
      mantisname: mantis.mantisname,
      status: true,
      role: addMember_model.access_level
    } as IMantisRole);
    await user.save();

    await mantis.members.unshift({ 
      _id: user._id,
      username_mantis: addMember_model.username,
      usermantis_id: datarespone.id,
      username: user.username,
      email: user.email,
      role_mantis: addMember_model.access_level,
      is_active_backend: false,
      token_mantis: "",
      enable_mantis: true,
      protected_mantis: true,
      url: mantis.url,
      created_date: Date.now()
     } as IMemberMantis);
    await mantis.save();

    const msg = {
      to: user.email, // Change to your recipient
      from: adminEmail, // Change to your verified sender
      //to: 'hung08596@gmail.com', // Change to your recipient
      //from: 'thiendoan011@gmail.com', // Change to your verified sender
      subject: 'Welcome to MantisBT of TestControl',
      text: 'Welcome to MantisBT of TestControl',
      html: `
      <head>
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <!-- <title>Welcome email</title> -->
      <!-- <meta name="description" content="Welcome email template."> -->
      <style type="text/css">
          a:hover {text-decoration: underline !important;}
      </style>
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
                                          <h1 align="center">Welcome!</h1>
                                          
                                          <h2>Dear ${user.fullname},</h2>
  
                                          <p>
                                              You has been invited to Mantis Bug Tracker of project ${project.projectname}
                                          </p>
                                          <p>
                                              username: ${addMember_model.username}                                         
                                          </p>
                                          <p>
                                              password: 123456                                         
                                          </p>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td style="height:30px">
                                      <p>
                                              You need read mail from MantisBT and unlock account mantis. And then create token of mantis
                                              <p>Finally, you add token to project ${project.projectname}</p>
                                      </p>
                                      <p>
                                              If this email has been existed in MantisBT, create token of mantis and add token to project ${project.projectname}
                                      </p>
                                      </td>
                                  </tr>
                                  
                                  <tr>
                                      <td style="height:30px;">
                                          <p>
                                          Sincerely,
                                          </p>
                                          <p>
                                              <strong>Test Control Team</strong>
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
      <!--/100% body table-->`,
    }
    sgMail.send(msg);
    return true;
  }

  public async changeRoleMember(changeRole: ChangeRoleMemberMantisDto, projectId: string, userrequestId: string) {

    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project is not exist');

    const user = await UserSchema.findOne({email: changeRole.email}).exec();
    if (!user) throw new HttpException(400, 'User is not exist');

    const mantis = await MantisSchema.findById(project.mantis).exec();
    if (!mantis) throw new HttpException(400, 'Mantis is not exist');

    //check user exist in mantis
    if (mantis.members && mantis.members.findIndex((item) => item.email.toString() == changeRole.email) == -1)
    {throw new HttpException(400, 'user not exist in mantis');}

    //update role
    const updateMantisOfUser = await UserSchema.updateOne(
      {email: changeRole.email, "mantis._id": mantis._id},
      {$set: {
      "mantis.$.role": changeRole.role
      }}).exec();
      if (!updateMantisOfUser) throw new HttpException(400, 'Update role is not success');

    const updateMemberOfMantis = await MantisSchema.updateOne(
      {_id: project.mantis, "members.email": changeRole.email},
      {$set: {
      "members.$.role_mantis": changeRole.role
      }}).exec();
      if (!updateMemberOfMantis) throw new HttpException(400, 'Update role is not success');

    return true;
  }

  public async removeMemberOfMantis(
    removeMember_model: CreateAccountMantisDto,
    userId: string
  ){
    const user = await UserSchema.findOne({email: removeMember_model.email})
    .populate({
      path: 'mantis'
    }).exec();
    if (!user) throw new HttpException(400, 'User is not exist');

    const admin = await UserSchema.findById(userId).exec();
    if (!admin) throw new HttpException(400, 'Admin is not exist');

    const project = await ProjectSchema.findById(removeMember_model.projectid).exec();
    if (!project) throw new HttpException(400, 'Project is not exist');

    const mantis = await MantisSchema.findById(project.mantis)
    .populate({
      path: 'members'
    }).exec();
    if (!mantis) throw new HttpException(400, 'Mantis is not exist');

    //console.log('mantis: '+ JSON.stringify(mantis, null, ' '));

    if( mantis.members 
      && mantis.members.some((item: IMemberMantis) =>item.email.toString() === removeMember_model.email.toString() 
      &&item.role_mantis.toString() === 'administrator')){
      throw new HttpException(400, 'you can not remove Project Manager');
    }

    //user is PM
    if( mantis.members 
      && mantis.members.some((item: IMemberMantis) =>item.email.toString() === admin.email.toString() 
      &&item.role_mantis.toString() === 'administrator')){

        //if remove myselt
        if(user._id.toString() == userId.toString()){
          const checkExistMoreOnePM = mantis.members.filter(({ role_mantis }) => role_mantis?.toString() == "administrator");
          if(checkExistMoreOnePM.length == 1){ throw new HttpException(400, 'This mantis have been only one administrator');} 
        }
    }

    if (mantis.members &&
        mantis.members.findIndex(
        (item: IMemberMantis) => item._id.toString() === userId
      ) == -1
    ) {throw new HttpException(400, 'You has not yet been member of this mantis');}

    if (mantis.members.length == 1) {
      throw new HttpException(400, 'You are last member of this mantis. Cannot delete');}

    //remove member mantis bug tracker
    const listMember: any = mantis.members;
    let token = "";
    let member_id = "";

    for(let element of listMember){
      //console.log('member: '+ JSON.stringify(element, null, ' '));
      if(element._id == userId){
        token = element.token_mantis;
        //console.log("token: "+token); 
      }
      if(element._id == user._id.toString()){
        member_id = element.usermantis_id;
        //console.log("member_id: "+member_id); 
      }
    }

    let config: any = {
      method: 'delete',
      url: mantis.url+'/api/rest/users/' + member_id,
      headers: { 
        'Authorization': token
      }
    };
    
    axios(config)
    .then(function (response) {
      console.log('success');
    })
    .catch(function (error) {
      console.log('error');
    });

    //remove member
    mantis.members = mantis.members.filter(
      ({ _id }) => _id.toString() !== user._id.toString()
    );
    await mantis.save();

    user.mantis = user.mantis.filter(
      ({ _id }) => _id.toString() !== mantis._id.toString()
    );
    await user.save();

    return true;
  }

  public async changeToken(changeToken: ChangeTokenMantisDto, projectId: string, userrequestId: string) {

    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project is not exist');

    const user = await UserSchema.findById(userrequestId).exec();
    if (!user) throw new HttpException(400, 'User is not exist');

    const mantis = await MantisSchema.findById(project.mantis).exec();
    if (!mantis) throw new HttpException(400, 'Mantis is not exist');

    //console.log('mantis: '+ JSON.stringify(mantis, null, ' '));

    //check user exist in mantis
    if (mantis.members && mantis.members.findIndex((item) => item._id.toString() == userrequestId) == -1)
    {throw new HttpException(400, 'user not exist in mantis');}

      const updateMemberOfMantis = await MantisSchema.updateOne(
        {_id: project.mantis, "members._id": userrequestId},
        {$set: {
        "members.$.token_mantis": changeToken.token,
        "members.$.is_active_backend": true
        }}).exec();
        if (!updateMemberOfMantis) throw new HttpException(400, 'Update role is not success');

    return true;
  }

  public async getAllIssueOfMantis(
    userId: string,
    projectId: string,
    page_size: number,
    page: number): Promise<IIssue[]>
  {
    //console.log(JSON.stringify(create_model, null, " "));
    const user = await UserSchema.findById(userId).select('-password').exec();
    if (!user) throw new HttpException(400, 'User id is not exist');

    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'User id is not exist');

    const mantis = await MantisSchema.findById(project.mantis)
    .populate({
      path: 'members'
    }).exec();
    if (!mantis) throw new HttpException(400, 'Mantis is not exist');

    const listMember: any = mantis.members;
    let token = "";
    for(let element of listMember){
      if(element._id == userId){
        token = element.token_mantis;
        //console.log("token: "+token); 
      }
    }
    let data: any = [{
      summary: {type: String},
      description: {type: String},
      category: {type: String},
      reporter: {type: String},
      created_date: {type: Date},
      url: {type: String},
      id: {type: String}
    }]; data.pop();

    let data_response: any = 1;
    
    try {
      const response = await axios.get(mantis.url+'/api/rest/issues?project_id='+mantis.project_id_mantis,{
        headers: {
          'Authorization': token,
          "content-type": "application/json"
        }})

        data_response = response.data.issues;

    //} catch (error) {throw new HttpException(400, ` link mantis or project ${mantis.mantisname} of mantis not exist`);}
  } catch (error) {throw new HttpException(400, 'list issue empty or project mantis was not existed');}
    if(data_response.length == 0)
    return data;

    for await (let element of data_response){
      data.push({
        summary: element.summary,
        description: element.description,
        category: element.category.name,
        reporter: element.reporter.real_name,
        created_date: element.created_at,
        url: mantis.url + '/view.php?id=' + element.id,
        id: element.id.toString(),
      })
    }
    //console.log('data: '+JSON.stringify(data));
    return data;
  }

  public async createIssue(
    userId: string,
    projectId: string,
    create_model: CreateIssueDto
  ){
    //console.log(JSON.stringify(create_model, null, " "));
    const user = await UserSchema.findById(userId).select('-password').exec();
    if (!user) throw new HttpException(400, 'User id is not exist');

    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'User id is not exist');

    const mantis = await MantisSchema.findById(project.mantis)
    .populate({
      path: 'members'
    }).exec();
    if (!mantis) throw new HttpException(400, 'Mantis is not exist');

    const testexecution = await TestExecutionSchema.findById(create_model.testexecution_id).exec();
    if (!testexecution) throw new HttpException(400, 'testexecution id is not exist');
    
    const listMember: any = mantis.members;
    let token = "";
    for(let element of listMember){
      if(element._id == userId){
        token = element.token_mantis;
        //console.log("token: "+token); 
      }
    }

    let data1: any = {
      summary: create_model.summary,
      description: create_model.description,
      project: {name: mantis.mantisname},
      category: {name: create_model.category },
      files: create_model.attachment
    };

    try {
      const response = await axios.post(mantis.url+'/api/rest/issues',
      data1,{
        headers: {
          'Authorization': token,
          "content-type": "application/json"
        }})
        const data: any = await response.data.issue;

        await testexecution.issue.unshift({ 
          issue_id: data.id?.toString(),
          url: mantis.url + '/view.php?id=' + data.id
        } as IIssue_Execution);
        await testexecution.save();

        return data;
    } catch (error) {throw new HttpException(400, 'Create issue is not success');}

    return true;
  }

  public async getInformationOfMantis(
    projectId: string
  ){

    //console.log('here get all');
    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project is not exist');

    const mantis = await MantisSchema.findById(project.mantis,
       'mantisname url')
       .exec();
    if (!mantis) throw new HttpException(400, 'Mantis is not exist');

    return mantis;
  }
  
  public async getAllCategoryOfMantis(
    userId: string,
    projectId: string
  ){

    const user = await UserSchema.findById(userId).select('-password').exec();
    if (!user) throw new HttpException(400, 'User id is not exist');

    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project is not exist');

    const mantis = await MantisSchema.findById(project.mantis)
    .populate({
      path: 'members'
    }).exec();
    if (!mantis) throw new HttpException(400, 'Mantis is not exist');

    //get token
    const listMember: any = mantis.members;
    let token = "";
    for(let element of listMember){
      if(element._id == userId){
        token = element.token_mantis;
      }
    }

    let list_category_mantis: any = [];

    try {
      const response = await axios.get(mantis.url+'/api/rest/projects/'+mantis.project_id_mantis,{
        headers: {
          'Authorization': token,
          "content-type": "application/json"
        }})
        list_category_mantis = await response.data.projects[0].categories;
    } catch (error) {throw new HttpException(400, 'Get list category error');}

    let list_categories: any = [{
      categoryname: {type: String},
      created_date: {type: String}
    }]; list_categories.pop();

    for(let element of list_category_mantis){
      list_categories.push({
        categoryname: element.name,
        created_date: mantis.created_date
      })
    }

    return list_categories;
  }

  public async getAllProjectOfMantis(
    userId: string,
    projectId: string
  ){
    const user = await UserSchema.findById(userId).select('-password').exec();
    if (!user) throw new HttpException(400, 'User id is not exist');

    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'User id is not exist');

    const mantis = await MantisSchema.findById(project.mantis)
    .populate({
      path: 'members'
    }).exec();
    if (!mantis) throw new HttpException(400, 'Mantis is not exist');

       //get token
       const listMember: any = mantis.members;
       let token = "";
       for(let element of listMember){
         if(element._id == userId){
           token = element.token_mantis;
         }
       }

       let list_project_mantis: any = [];

       try {
         const response = await axios.get(mantis.url+'/api/rest/projects',{
           headers: {
             'Authorization': token,
             "content-type": "application/json"
           }})
           list_project_mantis = await response.data.projects;
       } catch (error) {throw new HttpException(400, 'Get list project error');}

    let list_mantis: any = [{
      _id: {type: String},
      mantisname: {type: String}
    }]; list_mantis.pop();

    for(let element of list_project_mantis){
      list_mantis.push({
        _id: element.id,
        mantisname: element.name
      })
    }
    return list_mantis;
  }

  public async getAllMantisOfProject(
    projectId: string
  ){

    //console.log('projectid: '+projectId);
    const list_mantis = await MantisSchema.find({project: projectId}, 'mantisname url').exec();
    if (!list_mantis) throw new HttpException(400, 'Project Id is not exist');

    return list_mantis;
  }

  //not use
  public async deleteMantis(
    projectId: string,
    userId: string
  ){

    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project is not exist');

    const user = await UserSchema.findById(userId).select('-password').exec();
    if (!user) throw new HttpException(400, 'User id is not exist');

    const mantis = await MantisSchema.findById(project.mantis).exec();
    if (!mantis) throw new HttpException(400, 'Mantis id is not exist');

    user.mantis = user.mantis.filter(({ _id }) => _id?.toString() !== mantis._id?.toString());
    await user.save();

    const deletedExecution = await MantisSchema.findOneAndDelete({_id: mantis._id,}).exec();
    if (!deletedExecution) throw new HttpException(400, 'Delete Mantis is not success');

    return true;
  }

  // not use
  public async removeCategoryOfMantis(
    model: AddCategoryMantisDto,
    projectId: string
  ){
    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project is not exist');

    const mantis = await MantisSchema.findById(project.mantis)
    .populate({
      path: 'categories'
    }).exec();
    if (!mantis) throw new HttpException(400, 'Mantis is not exist');

    if (mantis.categories.length == 1) {
      throw new HttpException(400, 'You are last category of this mantis. Cannot delete');}

    //remove member
    mantis.categories = mantis.categories.filter(
      ({ categoryname }) => categoryname.toString() !== model.category_name.toString()
    ); await mantis.save();
    return true;
  }

  //not use
  public async addCategoryToMantis(
    projectId: string,
    model: AddCategoryMantisDto
  ){

    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project is not exist');

    const mantis = await MantisSchema.findById(project.mantis)
    .populate({
      path: 'members'
    }).exec();
    if (!mantis) throw new HttpException(400, 'Mantis is not exist');
    
    try {
        mantis.categories.unshift({ 
          categoryname: model.category_name,
          created_date: Date.now()
         } as ICategory);
        await mantis.save();

    } catch (error) {throw new HttpException(400, 'Can not get list issue');}

    return true;
  }

  //not use
  public async updateNameProjectMantis(
    projectId: string,
    mantis_name: string
  ){

    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project is not exist');

    const updateMantis = await MantisSchema.findOneAndUpdate(
      { _id: project.mantis },
      {$set: {         
        mantisname: mantis_name  
       }},
      { new: true}
    ).exec();
    if (!updateMantis) throw new HttpException(400, 'Update project name of mantis is not success');

    return updateMantis;
  }

  //not use
  public async updateInformationMantis(
    projectId: string,
    model: UpdateMantisDto
  ){

    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) throw new HttpException(400, 'Project is not exist');

    const updateMantis = await MantisSchema.findOneAndUpdate(
      { _id: project.mantis },
      {$set: {         
        url: model.url,
        mantisname: model.project_name 
       }},
      { new: true}
    ).exec();
    if (!updateMantis) throw new HttpException(400, 'Update mantis is not success');

    return updateMantis;
  }
}
export default MantisService;