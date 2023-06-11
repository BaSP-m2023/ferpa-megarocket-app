import { combineReducers } from 'redux';
import { classReducer } from './classes/reducer';
import activitiesReducer from './activities/reducer';

const reducers = combineReducers({
  activities: activitiesReducer,
  classes: classReducer
});

export default reducers;
