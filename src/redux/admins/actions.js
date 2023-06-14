import * as actionsConstants from './constants';

export const getAdminsPending = () => {
  return {
    type: actionsConstants.GET_ADMINS_PENDING
  };
};

export const getAdminsSuccess = (data) => {
  return {
    type: actionsConstants.GET_ADMINS_SUCCESS,
    payload: data
  };
};

export const getAdminsError = (error) => {
  return {
    type: actionsConstants.GET_ADMINS_ERROR,
    payload: error
  };
};

export const deleteAdminsPending = () => {
  return {
    type: actionsConstants.DELETE_ADMINS_PENDING
  };
};

export const deleteAdminsSuccess = (data) => {
  return {
    type: actionsConstants.DELETE_ADMINS_SUCCESS,
    payload: data
  };
};

export const deleteAdminsError = (error) => {
  return {
    type: actionsConstants.DELETE_ADMINS_ERROR,
    payload: error
  };
};

export const putAdminsPending = () => {
  return {
    type: actionsConstants.PUT_ADMINS_PENDING
  };
};

export const putAdminsSuccess = (data) => {
  return {
    type: actionsConstants.PUT_ADMINS_SUCCESS,
    payload: data
  };
};

export const putAdminsError = (error) => {
  return {
    type: actionsConstants.PUT_ADMINS_ERROR,
    payload: error
  };
};

export const addAdminsPending = () => {
  return {
    type: actionsConstants.ADD_ADMINS_PENDING
  };
};

export const addAdminsSuccess = (data) => {
  return {
    type: actionsConstants.ADD_ADMINS_SUCCESS,
    payload: data
  };
};

export const addAdminsError = (error) => {
  return {
    type: actionsConstants.ADD_ADMINS_ERROR,
    payload: error
  };
};
