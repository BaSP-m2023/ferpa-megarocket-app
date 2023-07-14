import * as actionConstants from 'redux/auth/constants';

const INITIAL_STATE = {
  isPending: false,
  user: null,
  error: false,
  message: '',
  isAuthPending: true,
  passChecked: false
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionConstants.GET_AUTH_PENDING:
      return {
        ...state,
        isAuthPending: true,
        isPending: false,
        error: false
      };
    case actionConstants.GET_AUTH_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isPending: false,
        error: false,
        isAuthPending: false
      };
    case actionConstants.GET_AUTH_ERROR:
      return {
        ...state,
        isPending: false,
        error: true,
        message: action.payload,
        isAuthPending: false
      };
    case actionConstants.LOGIN_PENDING:
      return {
        ...state,
        isPending: true,
        error: false
      };
    case actionConstants.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isPending: false,
        error: false
      };
    case actionConstants.LOGIN_ERROR:
      return {
        ...state,
        isPending: false,
        error: true,
        message: action.payload
      };
    case actionConstants.LOGOUT_PENDING:
      return {
        ...state,
        isPending: true,
        error: false
      };
    case actionConstants.LOGOUT_ERROR:
      return {
        ...state,
        isPending: false,
        error: true,
        message: action.payload
      };
    case actionConstants.LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        isPending: false,
        error: false
      };
    case actionConstants.SIGN_UP_PENDING:
      return {
        ...state,
        isPending: true,
        error: false
      };
    case actionConstants.SIGN_UP_SUCCESS:
      return {
        ...state,
        isPending: false,
        error: false
      };
    case actionConstants.SIGN_UP_ERROR:
      return {
        ...state,
        isPending: false,
        message: action.payload,
        error: true
      };
    case actionConstants.CHECK_CLEAN:
      return {
        ...state,
        passChecked: false,
        isPending: false,
        error: false
      };
    case actionConstants.CHECK_SUCCESS:
      return {
        ...state,
        passChecked: true,
        isPending: false,
        error: false
      };
    case actionConstants.CHECK_ERROR:
      return {
        ...state,
        isPending: false,
        error: true
      };
    default:
      return state;
  }
};

export default authReducer;
