import { combineReducers } from 'redux';
import { adminsReducers } from './admins/reducer';
import activitiesReducer from './activities/reducer';

const reducers = combineReducers({
  admins: adminsReducers,
  activities: activitiesReducer
});

export default reducers;
