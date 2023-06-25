import * as actionConstants from 'redux/auth/constants';

const INITIAL_STATE = {
  isPending: false,
  user: null,
  error: false,
  message: '',
  isAuthPending: true
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionConstants.LOGIN_REQUEST:
    case actionConstants.LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case actionConstants.LOGIN_PENDING:
      return {
        ...state,
        isPending: true
      };
    case actionConstants.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isPending: false,
        error: null
      };
    case actionConstants.LOGIN_ERROR:
      return {
        ...state,
        isPending: false,
        error: action.payload
      };
    case actionConstants.LOGOUT_ERROR:
      return {
        ...state,
        isPending: false,
        error: action.payload
      };
    case actionConstants.LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        isPending: false,
        error: false
      };
    case actionConstants.GET_AUTH_PENDING:
      return {
        ...state,
        isAuthPending: true
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
        error: action.payload,
        isAuthPending: false
      };
    default:
      return state;
  }
};

export default authReducer;
