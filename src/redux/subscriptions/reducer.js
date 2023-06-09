import * as actionConstant from './constants';

const INITIAL_STATE = {
  subs: [],
  sub: { classId: '', memberId: '', date: '' },
  error: false,
  message: '',
  id: '',
  isPending: false,
  success: false
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionConstant.RESET_STATE:
      return {
        ...state,
        sub: { classId: '', memberId: '', date: '' },
        error: false,
        id: '',
        isPending: false,
        success: false
      };
    case actionConstant.SUBSCRIPTIONS_PENDING:
      return { ...state, isPending: true };
    case actionConstant.SELECT_ID:
      return { ...state, id: action.payload };
    case actionConstant.GET_SUBSCRIPTIONS_SUCCESS:
      return { ...state, subs: action.payload, isPending: false, error: false };
    case actionConstant.GET_SUBSCRIPTIONS_ERROR:
      return { ...state, message: action.payload, isPending: false, error: true };
    case actionConstant.DELETE_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        id: '',
        message: action.payload.message,
        isPending: false,
        subs: state.subs.filter((subs) => subs._id !== action.payload.id),
        error: false,
        success: true
      };
    case actionConstant.DELETE_SUBSCRIPTIONS_ERROR:
      return {
        ...state,
        id: '',
        isPending: false,
        message: action.payload,
        error: true
      };
    case actionConstant.POST_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        isPending: false,
        message: action.payload.message,
        subs: [...state.subs, action.payload.newSubscription],
        success: true
      };
    case actionConstant.POST_SUBSCRIPTIONS_ERROR:
      return {
        ...state,
        isPending: false,
        message: action.payload,
        error: true
      };
    case actionConstant.PUT_SUBSCRIPTIONS_SUCCESS:
      state.subs.filter((sub) => sub._id !== action.payload.id);
      state.subs.push(action.payload.updatedSub);
      return {
        ...state,
        isPending: false,
        message: action.payload.message,
        error: false
      };
    case actionConstant.PUT_SUBSCRIPTIONS_ERROR:
      return {
        ...state,
        isPending: false,
        message: action.payload,
        error: true
      };
    default:
      return state;
  }
};

export default reducer;
