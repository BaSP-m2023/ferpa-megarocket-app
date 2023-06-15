import * as typeConstants from './constants';

export const getAdminsPending = () => {
  return {
    type: typeConstants.GET_ADMINS_PENDING
  };
};

export const getAdminsSuccess = (data) => {
  return {
    type: typeConstants.GET_ADMINS_SUCCESS,
    payload: data
  };
};

export const getAdminsError = (error) => {
  return {
    type: typeConstants.GET_ADMINS_ERROR,
    payload: error
  };
};

export const deleteAdminsPending = () => {
  return {
    type: typeConstants.DELETE_ADMINS_PENDING
  };
};

export const deleteAdminsSuccess = (data) => {
  return {
    type: typeConstants.DELETE_ADMINS_SUCCESS,
    payload: data
  };
};

export const deleteAdminsError = (error) => {
  return {
    type: typeConstants.DELETE_ADMINS_ERROR,
    payload: error
  };
};

export const putAdminsPending = () => {
  return {
    type: typeConstants.PUT_ADMINS_PENDING
  };
};

export const putAdminsSuccess = (data) => {
  return {
    type: typeConstants.PUT_ADMINS_SUCCESS,
    payload: data
  };
};

export const putAdminsError = (error) => {
  return {
    type: typeConstants.PUT_ADMINS_ERROR,
    payload: error
  };
};

export const addAdminsPending = () => {
  return {
    type: typeConstants.ADD_ADMINS_PENDING
  };
};

export const addAdminsSuccess = (data) => {
  return {
    type: typeConstants.ADD_ADMINS_SUCCESS,
    payload: data
  };
};

export const addAdminsError = (error) => {
  return {
    type: typeConstants.ADD_ADMINS_ERROR,
    payload: error
  };
};
