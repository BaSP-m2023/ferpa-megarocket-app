import { combineReducers } from 'redux';
import { trainersReducer } from './trainers/reducer';

const reducers = combineReducers({
  trainers: trainersReducer
});

export default reducers;
