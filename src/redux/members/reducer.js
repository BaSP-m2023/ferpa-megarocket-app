import * as actionConstant from './constants';

const INITIAL_STATE = {
  data: [],
  error: '',
  isPending: true
};

const membersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionConstant.GET_MEMBERS_PENDING:
      return { ...state, isPending: true };
    case actionConstant.GET_MEMBERS_SUCCESS:
      return { ...state, data: action.payload, isPending: false };
    case actionConstant.GET_MEMBERS_ERROR:
      return { ...state, error: action.payload, isPending: false };
    default:
      return state;
  }
};

export default membersReducer;
