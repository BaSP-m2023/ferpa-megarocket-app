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
