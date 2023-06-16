import {
  RESET_INITIAL_STATE,
  GET_MEMBERS_PENDING,
  GET_MEMBERS_SUCCESS,
  GET_MEMBERS_ERROR,
  UPDATE_MEMBERS_PENDING,
  UPDATE_MEMBERS_SUCCESS,
  UPDATE_MEMBERS_ERROR,
  CREATE_MEMBERS_PENDING,
  CREATE_MEMBERS_SUCCESS,
  CREATE_MEMBERS_ERROR,
  DELETE_MEMBERS_PENDING,
  DELETE_MEMBERS_SUCCESS,
  DELETE_MEMBERS_ERROR
} from './constants';

export const resetInitialState = () => {
  return {
    type: RESET_INITIAL_STATE
  };
};

export const getMembersPending = () => {
  return {
    type: GET_MEMBERS_PENDING
  };
};

export const getMembersSuccess = (data) => {
  return {
    type: GET_MEMBERS_SUCCESS,
    payload: data
  };
};

export const getMembersError = (error) => {
  return {
    type: GET_MEMBERS_ERROR,
    payload: error
  };
};

export const updateMemberPending = () => ({
  type: UPDATE_MEMBERS_PENDING
});

export const updateMemberSuccess = (data) => ({
  type: UPDATE_MEMBERS_SUCCESS,
  payload: data
});

export const updateMemberError = (error) => ({
  type: UPDATE_MEMBERS_ERROR,
  payload: error
});

export const createMemberPending = () => ({
  type: CREATE_MEMBERS_PENDING
});

export const createMemberSuccess = (data) => ({
  type: CREATE_MEMBERS_SUCCESS,
  payload: data
});

export const createMemberError = (error) => ({
  type: CREATE_MEMBERS_ERROR,
  payload: error
});

export const deleteMemberPending = () => ({
  type: DELETE_MEMBERS_PENDING
});

export const deleteMemberSuccess = (data) => ({
  type: DELETE_MEMBERS_SUCCESS,
  payload: data
});

export const deleteMemberError = (error) => ({
  type: DELETE_MEMBERS_ERROR,
  payload: error
});
