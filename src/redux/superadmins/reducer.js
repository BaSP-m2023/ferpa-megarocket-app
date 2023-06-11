import {
  GET_SUPERADMINS_PENDING,
  GET_SUPERADMINS_SUCCESS,
  GET_SUPERADMINS_ERROR
} from './constants';

const initialState = {
  data: [],
  loading: false,
  error: ''
};

export const superadminsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUPERADMINS_PENDING:
      return {
        ...state,
        loading: !state.loading
      };
    case GET_SUPERADMINS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false
      };
    case GET_SUPERADMINS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
