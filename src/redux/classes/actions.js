import * as actions from './constants';

export const resetState = () => {
  return {
    type: actions.RESET_STATE
  };
};

export const getClassesPending = () => {
  return {
    type: actions.GET_CLASSES_PENDING
  };
};
export const getClassesSuccess = (data) => {
  return {
    type: actions.GET_CLASSES_SUCCESS,
    payload: data
  };
};
export const getClassesError = (error) => {
  return {
    type: actions.GET_CLASSES_ERROR,
    payload: error
  };
};

export const postClassPending = () => {
  return {
    type: actions.POST_CLASS_PENDING
  };
};
export const postClassSuccess = (message) => {
  return {
    type: actions.POST_CLASS_SUCCESS,
    payload: message
  };
};
export const postClassError = (error) => {
  return {
    type: actions.POST_CLASS_ERROR,
    payload: error
  };
};

export const deleteClassPending = () => {
  return {
    type: actions.DELETE_CLASS_PENDING
  };
};
export const deleteClassSuccess = (id, message) => {
  return {
    type: actions.DELETE_CLASS_SUCCESS,
    payload: {
      message,
      id
    }
  };
};
export const deleteClassError = (error) => {
  return {
    type: actions.DELETE_CLASS_ERROR,
    payload: error
  };
};

export const putClassPending = () => {
  return {
    type: actions.PUT_CLASS_PENDING
  };
};
export const putClassSuccess = (id, message) => {
  return {
    type: actions.PUT_CLASS_SUCCESS,
    payload: {
      message,
      id
    }
  };
};
export const putClassError = (error) => {
  return {
    type: actions.PUT_CLASS_ERROR,
    payload: error
  };
};
