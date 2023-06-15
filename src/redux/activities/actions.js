import * as actionConstant from './constants';

export const resetInitialState = () => {
  return {
    type: actionConstant.RESET_INITIAL_STATE
  };
};

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

export const deleteActivitiesPending = () => {
  return {
    type: actionConstant.DELETE_ACTIVITIES_PENDING
  };
};

export const deleteActivitiesSuccess = (id, message) => {
  return {
    type: actionConstant.DELETE_ACTIVITIES_SUCCESS,
    payload: { id, message }
  };
};

export const deleteActivitiesError = (error) => {
  return {
    type: actionConstant.DELETE_ACTIVITIES_ERROR,
    payload: error
  };
};

export const putActivitiesPending = () => {
  return {
    type: actionConstant.PUT_ACTIVITIES_PENDING
  };
};

export const putActivitiesSuccess = (id, activityUpdated, message) => {
  return {
    type: actionConstant.PUT_ACTIVITIES_SUCCESS,
    payload: { id, activityUpdated, message }
  };
};

export const putActivitiesError = (error) => {
  return {
    type: actionConstant.PUT_ACTIVITIES_ERROR,
    payload: error
  };
};
