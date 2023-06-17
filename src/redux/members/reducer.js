import * as actionConstant from './constants';

const initialState = {
  data: [],
  message: '',
  error: false,
  isPending: true,
  success: false
};

const membersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionConstant.RESET_INITIAL_STATE:
      return {
        ...state,
        message: '',
        error: false,
        success: false
      };
    case actionConstant.GET_MEMBERS_PENDING:
      return { ...state, isPending: true };
    case actionConstant.GET_MEMBERS_SUCCESS:
      return { ...state, data: action.payload, isPending: false };
    case actionConstant.GET_MEMBERS_ERROR:
      return { ...state, message: action.payload, isPending: false, error: true };

    case actionConstant.UPDATE_MEMBERS_PENDING:
      return { ...state, isPending: true };
    case actionConstant.UPDATE_MEMBERS_SUCCESS: {
      const memberToUpdate = state.data.find((member) => member._id === action.payload.id);
      const index = state.data.indexOf(memberToUpdate);
      state.data[index] = action.payload.memberUpdated;
      return {
        ...state,
        isPending: false,
        message: action.payload.message,
        success: true
      };
    }
    case actionConstant.UPDATE_MEMBERS_ERROR:
      return {
        ...state,
        message: action.payload,
        isPending: false,
        error: true
      };

    case actionConstant.CREATE_MEMBERS_PENDING:
      return { ...state, isPending: true };
    case actionConstant.CREATE_MEMBERS_SUCCESS:
      return {
        ...state,
        data: [...state.data, action.payload.newMember],
        isPending: false,
        message: action.payload.message,
        success: true
      };
    case actionConstant.CREATE_MEMBERS_ERROR:
      return {
        ...state,
        message: action.payload,
        isPending: false,
        error: true
      };
    case actionConstant.DELETE_MEMBERS_PENDING:
      return { ...state, isPending: true };
    case actionConstant.DELETE_MEMBERS_SUCCESS: {
      const membersPostDelete = state.data.filter((member) => member._id !== action.payload.id);
      return {
        ...state,
        data: membersPostDelete,
        isPending: false,
        message: action.payload.message,
        success: true
      };
    }
    case actionConstant.DELETE_MEMBERS_ERROR:
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

export default membersReducer;
