import * as trainersConstant from './constants';

const initialState = {
  trainers: [],
  isLoading: false,
  error: ''
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
        trainers: action.payload
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
