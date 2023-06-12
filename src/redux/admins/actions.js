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

export const deleteAdminsPending = (data) => {
  return {
    type: actionsConstants.DELETE_ADMINS_PENDING,
    payload: data
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
