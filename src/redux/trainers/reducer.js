import * as trainersConstant from './constants';

const initialState = {
  trainers: [],
  isLoading: true,
  error: '',
  success: false
};

export const trainersReducer = (state = initialState, action) => {
  switch (action.type) {
    case trainersConstant.GET_TRAINERS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case trainersConstant.GET_TRAINERS_SUCCESS:
      return {
        ...state,
        trainers: action.payload,
        isLoading: false,
        error: ''
      };
    case trainersConstant.GET_TRAINERS_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case trainersConstant.DELETE_TRAINERS_PENDING:
      return {
        ...state,
        isLoading: true,
        success: false
      };
    case trainersConstant.DELETE_TRAINERS_SUCCESS: {
      const updatedList = state.trainers.filter((trainer) => trainer._id !== action.payload);
      return {
        ...state,
        trainers: updatedList,
        isLoading: false,
        error: '',
        success: true
      };
    }
    case trainersConstant.DELETE_TRAINERS_ERROR:
      return {
        ...state,
        error: action.payload,
        success: false
      };
    case trainersConstant.ADD_TRAINERS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case trainersConstant.ADD_TRAINERS_SUCCESS: {
      return {
        ...state,
        trainers: [...state.trainers, action.payload],
        isLoading: false,
        error: '',
        success: true
      };
    }
    case trainersConstant.ADD_TRAINERS_ERROR:
      return {
        ...state,
        error: action.payload,
        success: false
      };
    case trainersConstant.EDIT_TRAINERS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case trainersConstant.EDIT_TRAINERS_SUCCESS:
      state.trainers.filter((trainer) => trainer._id !== action.payload._id);
      state.trainers.push(action.payload.updatedTrainer);
      return {
        ...state,
        isLoading: false,
        error: ''
      };
    case trainersConstant.EDIT_TRAINERS_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
