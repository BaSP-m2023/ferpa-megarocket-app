import * as actionConstant from './constants';

export const getActivitiesPending = () => {
  return {
    type: actionConstant.GET_ACTIVITIES_PENDING
  };
};

export const getActivitiesSuccess = (data) => {
  return {
    type: actionConstant.GET_ACTIVITIES_SUCCESS,
    payload: data
  };
};

export const getActivitiesError = (error) => {
  return {
    type: actionConstant.GET_ACTIVITIES_ERROR,
    payload: error
  };
};

export const postActivitiesPending = () => {
  return {
    type: actionConstant.POST_ACTIVITIES_PENDING
  };
};

export const postActivitiesSuccess = (newActivity, message) => {
  return {
    type: actionConstant.POST_ACTIVITIES_SUCCESS,
    payload: { newActivity, message }
  };
};

export const postActivitiesError = (error) => {
  return {
    type: actionConstant.POST_ACTIVITIES_ERROR,
    payload: error
  };
};

export const resetInitialState = () => {
  return {
    type: actionConstant.RESET_INITIAL_STATE
  };
};
