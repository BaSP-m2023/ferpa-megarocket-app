import { combineReducers } from 'redux';
import { trainersReducer } from './trainers/reducer';
import activitiesReducer from './activities/reducer';

const reducers = combineReducers({
  trainers: trainersReducer,
  activities: activitiesReducer
});

export default reducers;
