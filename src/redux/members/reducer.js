import * as actionConstant from './constants';
import { combineReducers } from 'redux';

const INITIAL_STATE = {
  data: [],
  message: '',
  error: '',
  isPending: true,
  success: false
};

const getReducer = (state = INITIAL_STATE, action) => {
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

const putReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionConstant.RESET_INITIAL_STATE:
      return {
        ...state,
        message: '',
        error: false,
        success: false
      };
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
    default:
      return state;
  }
};

const postReducer = (state = INITIAL_STATE, action) => {
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

const deleteReducer = (state = INITIAL_STATE, action) => {
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
      const updatedData = state.data.filter((member) => member._id !== action.payload.id);
      return {
        ...state,
        data: updatedData,
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
  put: putReducer,
  post: postReducer,
  delete: deleteReducer
});

export default membersReducer;
