import { combineReducers } from 'redux';
import { trainersReducer } from './trainers/reducer';
import adminsReducer from './admins/reducer';
import activitiesReducer from './activities/reducer';
import { classReducer } from './classes/reducer';
import superadminsReducer from './superadmins/reducer';
import membersReducer from './members/reducer';
import subscriptionsReducer from './subscriptions/reducer';
import authReducer from './auth/reducer';

const reducers = combineReducers({
  trainers: trainersReducer,
  admins: adminsReducer,
  activities: activitiesReducer,
  classes: classReducer,
  members: membersReducer,
  superadmins: superadminsReducer,
  subscriptions: subscriptionsReducer,
  auth: authReducer
});

export default reducers;
