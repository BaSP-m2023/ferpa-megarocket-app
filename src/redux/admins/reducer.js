import * as typeConstants from './constants';

const INITIAL_STATE = {
  isPending: true,
  data: [],
  error: '',
  errorSwitch: false,
  message: ''
};

const adminsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case typeConstants.GET_ADMINS_PENDING: {
      return { ...state, isPending: true, errorSwitch: false, message: '' };
    }
    case typeConstants.GET_ADMINS_SUCCESS: {
      return { ...state, data: action.payload, isPending: false };
    }
    case typeConstants.GET_ADMINS_ERROR: {
      return { error: action.payload, isPending: false, errorSwitch: true };
    }
    case typeConstants.DELETE_ADMINS_PENDING: {
      return { ...state, isPending: true, message: '', errorSwitch: false };
    }
    case typeConstants.DELETE_ADMINS_SUCCESS: {
      return { ...state, message: action.payload, isPending: false };
    }
    case typeConstants.DELETE_ADMINS_ERROR: {
      return { error: action.payload, isPending: false, errorSwitch: true };
    }
    case typeConstants.PUT_ADMINS_PENDING: {
      return { ...state, isPending: true, message: '', errorSwitch: false };
    }
    case typeConstants.PUT_ADMINS_SUCCESS: {
      return { ...state, message: action.payload, error: '', isPending: false };
    }
    case typeConstants.PUT_ADMINS_ERROR: {
      return { error: action.payload, isPending: false, errorSwitch: true };
    }
    case typeConstants.ADD_ADMINS_PENDING: {
      return { ...state, isPending: true, message: '', error: '', errorSwitch: false };
    }
    case typeConstants.ADD_ADMINS_SUCCESS: {
      return { ...state, message: action.payload, isPending: false };
    }
    case typeConstants.ADD_ADMINS_ERROR: {
      return { error: action.payload, isPending: false, errorSwitch: true };
    }
    default: {
      return state;
    }
  }
};

export default adminsReducer;
