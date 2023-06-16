import * as constants from './constants';

const INITIAL_STATE = {
  classes: [],
  error: false,
  success: false,
  isLoading: false,
  serverMessage: ''
};

export const classReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case constants.RESET_STATE: {
      return {
        ...state,
        error: false,
        success: false,
        serverMessage: ''
      };
    }
    case constants.GET_CLASSES_PENDING: {
      return { ...state, isLoading: true };
    }
    case constants.GET_CLASSES_SUCCESS: {
      return { ...state, classes: action.payload, isLoading: false };
    }
    case constants.GET_CLASSES_ERROR: {
      return { isLoading: false, error: true, serverMessage: action.payload };
    }

    case constants.POST_CLASS_PENDING: {
      return { ...state, isLoading: true };
    }
    case constants.POST_CLASS_SUCCESS: {
      return {
        ...state,
        serverMessage: action.payload,
        isLoading: false,
        success: true
      };
    }
    case constants.POST_CLASS_ERROR: {
      return {
        ...state,
        serverMessage: action.payload,
        isLoading: false,
        error: true
      };
    }

    case constants.DELETE_CLASS_PENDING: {
      return { ...state, isLoading: true };
    }
    case constants.DELETE_CLASS_SUCCESS: {
      return {
        ...state,
        classes: state.classes.filter((singleClass) => singleClass._id !== action.payload.id),
        serverMessage: action.payload.message,
        isLoading: false,
        success: true
      };
    }
    case constants.DELETE_CLASS_ERROR: {
      return { ...state, serverMessage: action.payload, isLoading: false, error: true };
    }

    case constants.PUT_CLASS_PENDING: {
      return { ...state, isLoading: true };
    }
    case constants.PUT_CLASS_SUCCESS: {
      const newClass = state.classes.find((singleClass) => singleClass._id === action.payload.id);
      const i = state.classes.indexOf(newClass);
      state.classes[i] = action.payload.newClass;
      return {
        ...state,
        serverMessage: action.payload.message,
        isLoading: false,
        success: true
      };
    }
    case constants.PUT_CLASS_ERROR: {
      return {
        ...state,
        serverMessage: action.payload,
        isLoading: false,
        error: true,
        success: false
      };
    }

    default: {
      return state;
    }
  }
};
