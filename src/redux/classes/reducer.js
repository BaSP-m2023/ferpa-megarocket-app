import { GET_CLASSES_PENDING, GET_CLASSES_SUCCESS, GET_CLASSES_ERROR } from './constants';

const INITIAL_STATE = {
  classes: [],
  error: '',
  isLoading: false
};

export const classReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CLASSES_PENDING: {
      return { ...state, isLoading: true };
    }
    case GET_CLASSES_SUCCESS: {
      return { ...state, classes: action.payload, isLoading: false };
    }
    case GET_CLASSES_ERROR: {
      return { error: action.payload, isLoading: false };
    }
    default: {
      return state;
    }
  }
};
