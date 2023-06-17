import * as actionConstant from './constants';
import { combineReducers } from 'redux';

const initialState = {
  data: [],
  message: '',
  error: '',
  isPending: true,
  success: false
};

const getReducer = (state = initialState, action) => {
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
      return { ...state, error: action.payload, isPending: false };
    default:
      return state;
  }
};

const getByIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionConstant.RESET_INITIAL_STATE:
      return {
        ...state,
        message: '',
        error: false,
        success: false
      };
    case actionConstant.GET_MEMBER_BY_ID_PENDING:
      return { ...state, isPending: true };
    case actionConstant.GET_MEMBER_BY_ID_SUCCESS:
      return { ...state, data: action.payload, isPending: false };
    case actionConstant.GET_MEMBER_BY_ID_ERROR:
      return { ...state, error: action.payload, isPending: false };
    default:
      return state;
  }
};

const putReducer = (state = initialState, action) => {
  switch (action.type) {
    // case actionConstant.RESET_INITIAL_STATE:
    //   return {
    //     ...state,
    //     message: '',
    //     error: false,
    //     success: false
    //   };
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
        success: true,
        error: false
      };
    }
    case actionConstant.UPDATE_MEMBERS_ERROR:
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

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionConstant.RESET_INITIAL_STATE:
      return {
        ...state,
        message: '',
        error: false,
        success: false
      };
    case actionConstant.CREATE_MEMBERS_PENDING:
      return { ...state, isPending: true };
    case actionConstant.CREATE_MEMBERS_SUCCESS:
      return {
        ...state,
        data: [...state.data, action.payload.newMember],
        isPending: false,
        message: action.payload.message,
        error: false,
        success: true
      };
    case actionConstant.CREATE_MEMBERS_ERROR:
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

const deleteReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionConstant.RESET_INITIAL_STATE:
      return {
        ...state,
        message: '',
        error: false,
        success: false
      };
    case actionConstant.DELETE_MEMBERS_PENDING:
      return { ...state, isPending: true };
    case actionConstant.DELETE_MEMBERS_SUCCESS: {
      return {
        ...state,
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

const membersReducer = combineReducers({
  get: getReducer,
  getById: getByIdReducer,
  put: putReducer,
  post: postReducer,
  delete: deleteReducer
});

export default membersReducer;
