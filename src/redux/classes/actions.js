import { GET_CLASSES_PENDING, GET_CLASSES_SUCCESS, GET_CLASSES_ERROR } from './constants';

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
