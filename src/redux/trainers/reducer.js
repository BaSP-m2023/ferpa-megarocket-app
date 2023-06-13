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
    default:
      return state;
  }
};

export const trainersDeleteReducer = (state = initialState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};
