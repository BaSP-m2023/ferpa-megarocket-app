import * as actionConstants from 'redux/auth/constants';

export const loginPending = () => {
  return {
    type: actionConstants.LOGIN_PENDING
  };
};

export const loginSuccess = (data) => {
  return {
    type: actionConstants.LOGIN_SUCCESS,
    payload: data
  };
};

export const loginError = (error) => {
  return {
    type: actionConstants.LOGIN_ERROR,
    payload: error
  };
};

export const getAuthPending = () => {
  return {
    type: actionConstants.GET_AUTH_PENDING
  };
};

export const getAuthSuccess = (data) => {
  return {
    type: actionConstants.GET_AUTH_SUCCESS,
    payload: data
  };
};

export const getAuthError = (error) => {
  return {
    type: actionConstants.GET_AUTH_ERROR,
    payload: error
  };
};

export const logoutPending = () => {
  return {
    type: actionConstants.LOGOUT_PENDING
  };
};

export const logoutSuccess = () => {
  return {
    type: actionConstants.LOGOUT_SUCCESS
  };
};

export const logoutError = (error) => {
  return {
    type: actionConstants.LOGOUT_ERROR,
    payload: error
  };
};

export const signUpPending = () => {
  return {
    type: actionConstants.SIGN_UP_PENDING
  };
};

export const signUpSuccess = (data) => {
  return {
    type: actionConstants.SIGN_UP_SUCCESS,
    payload: data
  };
};

export const signUpError = (error) => {
  return {
    type: actionConstants.SIGN_UP_ERROR,
    payload: error
  };
};

export const checkClean = () => {
  return {
    type: actionConstants.CHECK_CLEAN
  };
};

export const checkSuccess = () => {
  return {
    type: actionConstants.CHECK_SUCCESS
  };
};

export const checkError = (error) => {
  return {
    type: actionConstants.CHECK_ERROR,
    payload: error
  };
};
