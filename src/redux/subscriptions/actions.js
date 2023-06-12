import * as actionConstant from './constants';

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
