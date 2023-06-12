import * as actionConstant from './constants';

export const getSubscriptionsPending = () => {
  return {
    type: actionConstant.GET_SUBSCRIPTIONS_PENDING
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
