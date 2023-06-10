import { combineReducers } from 'redux';
import { classReducer } from './classes/reducer';

const reducers = combineReducers({
  classes: classReducer
});

export default reducers;
