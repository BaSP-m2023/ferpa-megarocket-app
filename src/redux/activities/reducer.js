import * as actionConstant from './constants';

const INITIAL_STATE = {
  data: [],
  message: '',
  error: false,
  isPending: true,
  success: false
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionConstant.RESET_INITIAL_STATE:
      return {
        ...state,
        message: '',
        error: false,
        success: false
      };
    case actionConstant.GET_ACTIVITIES_PENDING:
      return {
        ...state,
        isPending: true
      };
    case actionConstant.GET_ACTIVITIES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isPending: false
      };
    case actionConstant.GET_ACTIVITIES_ERROR:
      return {
        ...state,
        message: action.payload,
        isPending: false,
        error: true
      };
    case actionConstant.POST_ACTIVITIES_PENDING:
      return {
        ...state,
        isPending: true
      };
    case actionConstant.POST_ACTIVITIES_SUCCESS:
      return {
        ...state,
        data: [...state.data, action.payload.newActivity],
        isPending: false,
        message: action.payload.message,
        success: true
      };
    case actionConstant.POST_ACTIVITIES_ERROR:
      return {
        ...state,
        message: action.payload,
        isPending: false,
        error: true
      };
    default:
      return state;
  }
};

export default reducer;
