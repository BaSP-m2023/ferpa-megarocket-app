import { combineReducers } from 'redux';
import { adminsReducers } from './admins/reducer';
import activitiesReducer from './activities/reducer';
import { classReducer } from './classes/reducer';

const reducers = combineReducers({
  admins: adminsReducers,
  activities: activitiesReducer,
  classes: classReducer
});

export default reducers;
