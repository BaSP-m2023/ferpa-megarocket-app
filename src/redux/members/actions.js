import * as actionConstant from './constants';

export const getMembersPending = () => {
  return {
    type: actionConstant.GET_MEMBERS_PENDING
  };
};

export const getMembersSuccess = (data) => {
  return {
    type: actionConstant.GET_MEMBERS_SUCCESS,
    payload: data
  };
};

export const getMembersError = (error) => {
  return {
    type: actionConstant.GET_MEMBERS_ERROR,
    payload: error
  };
};
