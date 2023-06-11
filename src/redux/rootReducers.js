import { combineReducers } from 'redux';

import activitiesReducer from './activities/reducer';

const reducers = combineReducers({
  activities: activitiesReducer
});

export default reducers;
