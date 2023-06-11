import { combineReducers } from 'redux';
import { GET_ADMINS_PENDING, GET_ADMINS_SUCCESS, GET_ADMINS_ERROR } from './constants';

const INITIAL_STATE = {
  isPending: true,
  data: [],
  error: ''
};

const getReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ADMINS_PENDING: {
      return { ...state, isPending: true };
    }
    case GET_ADMINS_SUCCESS: {
      return { ...state, data: action.payload, isPending: false };
    }
    case GET_ADMINS_ERROR: {
      return { error: action.payload, isPending: false };
    }
    default: {
      return state;
    }
  }
};

export const adminsReducers = combineReducers({
  get: getReducer
});
