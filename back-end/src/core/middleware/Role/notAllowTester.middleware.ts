import { NextFunction, Request, Response, response } from 'express';

import { ProjectSchema } from '@modules/project';
import { IMember } from '@modules/project/project.interface';

const notAllowTesterMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const projectId = req.params.project_id;
  let role;

  if (!projectId)
    return res.status(400).json({status: 400, success:false, result:'', errMsg: 'No project, authorization denied.'});

  try {
    const project = await ProjectSchema.findById(projectId).exec();
    if (!project) //throw new HttpException(400, 'Project is not exist');
      return res.status(400).json({status: 400, success:false, result:'', errMsg: 'Project is not exist'});

    if
    (    
      project.members &&
      project.members.some((item: IMember) =>
      
        item.user.toString() === req.user.id &&
        item.role.toString() !== 'Tester'

      )
    )next();
    else
    //{throw new HttpException(400, 'Require tester role');}
      return res.status(400).json({status: 400, success:false, result:'', errMsg: 'Do not allow Tester role'});
  } catch (error) {
    res.status(400).json({status: 400, success:false, result:'', errMsg: 'Role is not valid'});
  }
};

export default notAllowTesterMiddleware;