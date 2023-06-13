import * as actionConstant from './constants';

export const resetState = () => {
  return {
    type: actionConstant.RESET_STATE
  };
};

export const subscriptionsPending = () => {
  return {
    type: actionConstant.SUBSCRIPTIONS_PENDING
  };
};

export const selectIdAction = (id) => {
  return {
    type: actionConstant.SELECT_ID,
    payload: id
  };
};

export const getSubscriptionsSuccess = (data) => {
  return {
    type: actionConstant.GET_SUBSCRIPTIONS_SUCCESS,
    payload: data
  };
};

export const getSubscriptionsError = (error) => {
  return {
    type: actionConstant.GET_SUBSCRIPTIONS_ERROR,
    payload: error
  };
};

export const deleteSubscriptionSuccess = (message, id) => {
  return {
    type: actionConstant.DELETE_SUBSCRIPTIONS_SUCCESS,
    payload: { message, id }
  };
};

export const deleteSubscriptionError = (error) => {
  return {
    type: actionConstant.DELETE_SUBSCRIPTIONS_ERROR,
    payload: error
  };
};

export const postSubscriptionSuccess = (newSubscription, message) => {
  return {
    type: actionConstant.POST_SUBSCRIPTIONS_SUCCESS,
    payload: { newSubscription, message }
  };
};

export const postSubscriptionError = (error) => {
  return {
    type: actionConstant.POST_SUBSCRIPTIONS_ERROR,
    payload: error
  };
};

export const putSubscriptionSuccess = (updatedSub, message, id) => {
  return {
    type: actionConstant.PUT_SUBSCRIPTIONS_SUCCESS,
    payload: { updatedSub, message, id }
  };
};

export const putSubscriptionError = (error) => {
  return {
    type: actionConstant.PUT_SUBSCRIPTIONS_ERROR,
    payload: error
  };
};
