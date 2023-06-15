import * as actionConstant from './constants';

const INITIAL_STATE = {
  data: [],
  error: '',
  isPending: false
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionConstant.GET_SUBSCRIPTIONS_PENDING:
      return { ...state, isPending: !state.isPending };
    case actionConstant.GET_SUBSCRIPTIONS_SUCCESS:
      return { ...state, data: action.payload };
    case actionConstant.GET_SUBSCRIPTIONS_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
