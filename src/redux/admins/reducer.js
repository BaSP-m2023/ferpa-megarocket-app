import { combineReducers } from 'redux';
import * as actionsConstants from './constants';

const INITIAL_STATE = {
  isPending: true,
  data: [],
  error: ''
};

const getReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionsConstants.GET_ADMINS_PENDING: {
      return { ...state, isPending: true };
    }
    case actionsConstants.GET_ADMINS_SUCCESS: {
      return { ...state, data: action.payload, isPending: false };
    }
    case actionsConstants.GET_ADMINS_ERROR: {
      return { error: action.payload, isPending: false };
    }
    default: {
      return state;
    }
  }
};

const deleteReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionsConstants.DELETE_ADMINS_PENDING: {
      return { ...state, isPending: true };
    }
    case actionsConstants.DELETE_ADMINS_SUCCESS: {
      return { ...state, data: action.payload, isPending: false };
    }
    case actionsConstants.DELETE_ADMINS_ERROR: {
      return { error: action.payload, isPending: false };
    }
    default: {
      return state;
    }
  }
};

export const adminsReducers = combineReducers({
  get: getReducer,
  delete: deleteReducer
});
