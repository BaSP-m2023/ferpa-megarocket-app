import {
  GET_CLASSES_PENDING,
  GET_CLASSES_SUCCESS,
  GET_CLASSES_ERROR,
  POST_CLASS_PENDING,
  POST_CLASS_SUCCESS,
  POST_CLASS_ERROR,
  DELETE_CLASS_PENDING,
  DELETE_CLASS_SUCCESS,
  DELETE_CLASS_ERROR,
  PUT_CLASS_PENDING,
  PUT_CLASS_SUCCESS,
  PUT_CLASS_ERROR,
  RESET_STATE
} from './constants';

export const resetState = () => {
  return {
    type: RESET_STATE
  };
};

export const getClassesPending = () => {
  return {
    type: GET_CLASSES_PENDING
  };
};
export const getClassesSuccess = (data) => {
  return {
    type: GET_CLASSES_SUCCESS,
    payload: data
  };
};
export const getClassesError = (error) => {
  return {
    type: GET_CLASSES_ERROR,
    payload: error
  };
};

export const postClassPending = () => {
  return {
    type: POST_CLASS_PENDING
  };
};
export const postClassSuccess = (data) => {
  return {
    type: POST_CLASS_SUCCESS,
    payload: data
  };
};
export const postClassError = (error) => {
  return {
    type: POST_CLASS_ERROR,
    payload: error
  };
};

export const deleteClassPending = () => {
  return {
    type: DELETE_CLASS_PENDING
  };
};
export const deleteClassSuccess = (id, message) => {
  return {
    type: DELETE_CLASS_SUCCESS,
    payload: {
      message,
      id
    }
  };
};
export const deleteClassError = (error) => {
  return {
    type: DELETE_CLASS_ERROR,
    payload: error
  };
};

export const putClassPending = () => {
  return {
    type: PUT_CLASS_PENDING
  };
};
export const putClassSuccess = (id, message) => {
  return {
    type: PUT_CLASS_SUCCESS,
    payload: {
      message,
      id
    }
  };
};
export const putClassError = (error) => {
  return {
    type: PUT_CLASS_ERROR,
    payload: error
  };
};
