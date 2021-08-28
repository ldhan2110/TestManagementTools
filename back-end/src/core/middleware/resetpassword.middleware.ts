import { NextFunction, Request, Response, response } from 'express';

import { DataStoredInToken } from '../interfaces/auth.interface';
import jwt from 'jsonwebtoken';

const resetMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('reset-token');

  if (!token)
    //return res.status(401).json({ message: 'No token, authorization denied.' });
    return res.status(401).json({status: 401, success:false, result:'', errMsg: 'No token, authorization denied.'});

  try {
    const user:any = jwt.verify( token, process.env.JWT_TOKEN_FORGOTPASSWORD ?? '');
    //console.log('user: '+ JSON.stringify(user));
    //console.log('req.user: '+ JSON.stringify(req.user));

    if (!req.user) req.user = { id: '' };

    req.user.id = user._id;
    next();
  } catch (error) {
    //res.status(401).json({ message: 'Token is not valid' });
    res.status(401).json({status: 401, success:false, result:'', errMsg: 'Token is not valid'});
  }
};

export default resetMiddleware;