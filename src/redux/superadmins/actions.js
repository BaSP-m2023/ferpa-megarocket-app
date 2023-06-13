import * as actionConstant from './constants';

export const resetInitialState = () => {
  return {
    type: actionConstant.RESET_INITIAL_STATE
  };
};

export const getSuperadminsPending = () => {
  return {
    type: actionConstant.GET_SUPERADMINS_PENDING
  };
};

export const getSuperadminsSuccess = (data) => {
  return {
    type: actionConstant.GET_SUPERADMINS_SUCCESS,
    payload: data
  };
};

export const getSuperadminsError = (error) => {
  return {
    type: actionConstant.GET_SUPERADMINS_ERROR,
    payload: error
  };
};

export const postSuperadminsPending = () => {
  return {
    type: actionConstant.POST_SUPERADMINS_PENDING
  };
};

export const postSuperadminsSuccess = (newSuperadmin, message) => {
  return {
    type: actionConstant.POST_SUPERADMINS_SUCCESS,
    payload: { newSuperadmin, message }
  };
};

export const postSuperadminsError = (error) => {
  return {
    type: actionConstant.POST_SUPERADMINS_ERROR,
    payload: error
  };
};

export const deleteSuperadminsPending = () => {
  return {
    type: actionConstant.DELETE_SUPERADMINS_PENDING
  };
};

export const deleteSuperadminsSuccess = (id, message) => {
  return {
    type: actionConstant.DELETE_SUPERADMINS_SUCCESS,
    payload: { id, message }
  };
};

export const deleteSuperadminsError = (error) => {
  return {
    type: actionConstant.DELETE_SUPERADMINS_ERROR,
    payload: error
  };
};
