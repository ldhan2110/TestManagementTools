import { combineEpics } from 'redux-observable';
import * as accountEpics from '../account/accountEpics';

export default combineEpics(
   accountEpics.loginReqEpic,
   accountEpics.logoutReqEpic
);