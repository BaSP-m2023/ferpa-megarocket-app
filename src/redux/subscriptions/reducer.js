import * as actionConstant from './constants';

const INITIAL_STATE = {
  subs: [],
  error: '',
  message: '',
  id: '',
  isPending: false
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionConstant.SUBSCRIPTIONS_PENDING:
      return { ...state, isPending: !state.isPending };
    case actionConstant.SELECT_ID:
      return { ...state, id: action.payload };
    case actionConstant.GET_SUBSCRIPTIONS_SUCCESS:
      return { ...state, subs: action.payload };
    case actionConstant.GET_SUBSCRIPTIONS_ERROR:
      return { ...state, error: action.payload };
    case actionConstant.DELETE_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        id: '',
        message: action.payload.message,
        subs: state.subs.filter((subs) => subs._id !== action.payload.id)
      };
    default:
      return state;
  }
};

export default reducer;
