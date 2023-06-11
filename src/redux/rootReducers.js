import { combineReducers } from 'redux';
import { adminsReducers } from './admins/reducer';

const reducers = combineReducers({
  admins: adminsReducers
});

export default reducers;
