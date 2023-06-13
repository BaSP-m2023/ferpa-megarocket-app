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
    default:
      return state;
  }
};

export default superadminsReducer;
