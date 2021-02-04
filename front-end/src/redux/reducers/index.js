import { combineReducers } from 'redux';

import themeReducer from '../theme/themeReducers';
import accountReducer from '../account/accountReducers';


export default combineReducers({
	themeReducer,
	account: accountReducer
});
