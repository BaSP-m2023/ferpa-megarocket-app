import * as actionConstant from './constants';

const INITIAL_STATE = {
  data: [],
  message: '',
  isPending: true
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionConstant.GET_ACTIVITIES_PENDING:
      return {
        ...state,
        isPending: true
      };
    case actionConstant.GET_ACTIVITIES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isPending: false,
        message: ''
      };
    case actionConstant.GET_ACTIVITIES_ERROR:
      return {
        ...state,
        message: action.payload,
        isPending: false
      };
    case actionConstant.POST_ACTIVITIES_PENDING:
      return {
        ...state,
        isPending: true
      };
    case actionConstant.POST_ACTIVITIES_SUCCESS:
      return {
        ...state,
        data: [...state.data, action.payload.data],
        isPending: false,
        message: action.payload.message
      };
    case actionConstant.POST_ACTIVITIES_ERROR:
      return {
        ...state,
        message: action.payload,
        isPending: false
      };
    default:
      return state;
  }
};

export default reducer;
