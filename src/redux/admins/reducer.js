import * as actionsConstants from './constants';

const INITIAL_STATE = {
  isPending: true,
  data: [],
  error: '',
  errorSwitch: false,
  message: ''
};

export const adminsReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionsConstants.GET_ADMINS_PENDING: {
      return { ...state, isPending: true, errorSwitch: false, message: '' };
    }
    case actionsConstants.GET_ADMINS_SUCCESS: {
      return { ...state, data: action.payload, isPending: false };
    }
    case actionsConstants.GET_ADMINS_ERROR: {
      return { error: action.payload, isPending: false, errorSwitch: true };
    }
    case actionsConstants.DELETE_ADMINS_PENDING: {
      return { ...state, isPending: true, message: '', errorSwitch: false };
    }
    case actionsConstants.DELETE_ADMINS_SUCCESS: {
      return { ...state, message: action.payload, isPending: false };
    }
    case actionsConstants.DELETE_ADMINS_ERROR: {
      return { error: action.payload, isPending: false, errorSwitch: true };
    }
    case actionsConstants.PUT_ADMINS_PENDING: {
      return { ...state, isPending: true, message: '', errorSwitch: false };
    }
    case actionsConstants.PUT_ADMINS_SUCCESS: {
      return { ...state, message: action.payload, isPending: false };
    }
    case actionsConstants.PUT_ADMINS_ERROR: {
      return { error: action.payload, isPending: false, errorSwitch: true };
    }
    case actionsConstants.ADD_ADMINS_PENDING: {
      return { ...state, isPending: true, message: '', errorSwitch: false };
    }
    case actionsConstants.ADD_ADMINS_SUCCESS: {
      return { ...state, message: action.payload, isPending: false };
    }
    case actionsConstants.ADD_ADMINS_ERROR: {
      return { error: action.payload, isPending: false, errorSwitch: true };
    }
    default: {
      return state;
    }
  }
};
