import * as actionConstant from './constants';

const INITIAL_STATE = {
  data: [],
  message: '',
  error: false,
  isPending: false,
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
    case actionConstant.DELETE_ACTIVITIES_PENDING:
      return {
        ...state,
        isPending: true
      };
    case actionConstant.DELETE_ACTIVITIES_SUCCESS: {
      const updatedData = state.data.filter((activity) => activity._id !== action.payload.id);
      return {
        ...state,
        data: updatedData,
        isPending: false,
        message: action.payload.message,
        success: true
      };
    }
    case actionConstant.DELETE_ACTIVITIES_ERROR:
      return {
        ...state,
        message: action.payload,
        isPending: false,
        error: true
      };
    case actionConstant.PUT_ACTIVITIES_PENDING:
      return {
        ...state,
        isPending: true
      };
    case actionConstant.PUT_ACTIVITIES_SUCCESS: {
      const activityToUpdate = state.data.find((activity) => activity._id === action.payload.id);
      const index = state.data.indexOf(activityToUpdate);
      state.data[index] = action.payload.activityUpdated;
      return {
        ...state,
        isPending: false,
        message: action.payload.message,
        success: true
      };
    }
    case actionConstant.PUT_ACTIVITIES_ERROR:
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
