import * as actions from './actions';

export const getSubscriptions = async (dispatch) => {
  dispatch(actions.getSubscriptionsPending());
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/all`);
    const data = await res.json();
    dispatch(actions.getSubscriptionsSuccess(data.data));
    dispatch(actions.getSubscriptionsPending());
  } catch (error) {
    dispatch(actions.getSubscriptionsPending());
    dispatch(actions.getSubscriptionsError(error.toString));
  }
};
