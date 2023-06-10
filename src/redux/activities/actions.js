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
