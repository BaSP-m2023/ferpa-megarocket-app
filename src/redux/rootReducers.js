import { combineReducers } from 'redux';
import { trainersReducer } from './trainers/reducer';
import { adminsReducers } from './admins/reducer';
import activitiesReducer from './activities/reducer';
import { classReducer } from './classes/reducer';
import membersReducer from './members/reducer';

const reducers = combineReducers({
  trainers: trainersReducer,
  admins: adminsReducers,
  activities: activitiesReducer,
  classes: classReducer,
  members: membersReducer
});

export default reducers;
