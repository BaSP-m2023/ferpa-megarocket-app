import * as actionConstant from './constants';

const INITIAL_STATE = {
  data: [],
  error: '',
  isPending: true
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionConstant.GET_ACTIVITIES_PENDING:
      return { ...state, isPending: true };
    case actionConstant.GET_ACTIVITIES_SUCCESS:
      return { ...state, data: action.payload, isPending: false, error: '' };
    case actionConstant.GET_ACTIVITIES_ERROR:
      return { ...state, error: action.payload, isPending: false };
    default:
      return state;
  }
};

export default reducer;
