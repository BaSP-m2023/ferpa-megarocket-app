import * as actionConstant from './constants';

const INITIAL_STATE = {
  data: [],
  message: '',
  loading: false,
  error: false,
  success: false
};

const superadminsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionConstant.RESET_INITIAL_STATE:
      return {
        ...state,
        message: '',
        error: false,
        success: false
      };
    case actionConstant.GET_SUPERADMINS_PENDING:
      return { ...state, loading: true };
    case actionConstant.GET_SUPERADMINS_SUCCESS:
      return { ...state, data: action.payload, loading: false, error: false };
    case actionConstant.GET_SUPERADMINS_ERROR:
      return { ...state, error: action.payload, loading: false };
    case actionConstant.POST_SUPERADMINS_PENDING:
      return {
        ...state,
        loading: true,
        success: false
      };
    case actionConstant.POST_SUPERADMINS_SUCCESS:
      return {
        ...state,
        data: [...state.data, action.payload.newSuperadmin],
        loading: false,
        message: action.payload.message,
        success: true,
        error: false
      };
    case actionConstant.POST_SUPERADMINS_ERROR:
      return {
        ...state,
        message: action.payload,
        loading: false,
        error: true
      };
    case actionConstant.DELETE_SUPERADMINS_PENDING:
      return {
        ...state,
        isPending: true
      };
    case actionConstant.DELETE_SUPERADMINS_SUCCESS: {
      const updatedData = state.data.filter((superadmins) => superadmins._id !== action.payload.id);
      return {
        ...state,
        data: updatedData,
        isPending: false,
        message: action.payload.message,
        success: true
      };
    }
    case actionConstant.DELETE_SUPERADMINS_ERROR:
      return {
        ...state,
        message: action.payload,
        isPending: false,
        error: true
      };
    case actionConstant.PUT_SUPERADMINS_PENDING:
      return {
        ...state,
        isPending: true
      };
    case actionConstant.PUT_SUPERADMINS_SUCCESS: {
      const superadminToUpdate = state.data.find(
        (superadmin) => superadmin._id === action.payload.id
      );
      const index = state.data.indexOf(superadminToUpdate);
      state.data[index] = action.payload.superadminUpdated;
      return {
        ...state,
        isPending: false,
        message: action.payload.message,
        success: true
      };
    }
    case actionConstant.PUT_SUPERADMINS_ERROR:
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

export default superadminsReducer;
