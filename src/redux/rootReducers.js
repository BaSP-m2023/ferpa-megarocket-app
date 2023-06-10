import { combineReducers } from 'redux';
import { superadminsReducer } from './superadmins/reducer';

const reducers = combineReducers({
  superadmins: superadminsReducer
});

export default reducers;
