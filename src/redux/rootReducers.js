import { combineReducers } from 'redux';
import { trainersReducer } from './trainers/reducer';
import activitiesReducer from './activities/reducer';
import { classReducer } from './classes/reducer';

const reducers = combineReducers({
  trainers: trainersReducer,
  activities: activitiesReducer,
  classes: classReducer
});

export default reducers;
