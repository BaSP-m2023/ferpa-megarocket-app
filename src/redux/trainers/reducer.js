import * as trainersConstant from './constants';

const initialState = {
  trainers: [],
  isLoading: true,
  error: '',
  formError: false,
  success: false
};

export const trainersReducer = (state = initialState, action) => {
  switch (action.type) {
    case trainersConstant.GET_TRAINERS_PENDING:
      return {
        ...state,
        isLoading: true,
        success: false,
        formError: false
      };
    case trainersConstant.GET_TRAINERS_SUCCESS:
      return {
        ...state,
        trainers: action.payload,
        isLoading: false,
        error: '',
        success: false,
        formError: false
      };
    case trainersConstant.GET_TRAINERS_ERROR:
      return {
        ...state,
        error: action.payload,
        success: false,
        formError: true
      };
    case trainersConstant.DELETE_TRAINERS_PENDING:
      return {
        ...state,
        isLoading: true,
        success: false,
        formError: false
      };
    case trainersConstant.DELETE_TRAINERS_SUCCESS: {
      const updatedList = state.trainers.filter((trainer) => trainer._id !== action.payload.id);
      return {
        ...state,
        trainers: updatedList,
        isLoading: false,
        error: action.payload.message,
        success: true,
        formError: false
      };
    }
    case trainersConstant.DELETE_TRAINERS_ERROR:
      return {
        ...state,
        error: action.payload,
        success: false,
        formError: true
      };
    case trainersConstant.ADD_TRAINERS_PENDING:
      return {
        ...state,
        isLoading: true,
        success: false,
        formError: false
      };
    case trainersConstant.ADD_TRAINERS_SUCCESS: {
      return {
        ...state,
        trainers: [...state.trainers, action.payload.trainer],
        isLoading: false,
        error: action.payload.message,
        success: true,
        formError: false
      };
    }
    case trainersConstant.ADD_TRAINERS_ERROR:
      return {
        ...state,
        error: action.payload,
        success: false,
        formError: true
      };
    case trainersConstant.EDIT_TRAINERS_PENDING:
      return {
        ...state,
        isLoading: true,
        success: false,
        formError: false
      };
    case trainersConstant.EDIT_TRAINERS_SUCCESS:
      state.trainers.filter((trainer) => trainer._id !== action.payload.id);
      state.trainers.push(action.payload.updatedTrainer);
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
        success: true,
        formError: false
      };
    case trainersConstant.EDIT_TRAINERS_ERROR:
      return {
        ...state,
        error: action.payload,
        success: false,
        formError: true
      };
    default:
      return state;
  }
};
