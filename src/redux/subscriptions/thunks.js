import * as actions from './actions';

export const getSubscriptions = async (dispatch) => {
  dispatch(actions.subscriptionsPending());
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/all`);
    const data = await res.json();
    dispatch(actions.getSubscriptionsSuccess(data.data));
    dispatch(actions.subscriptionsPending());
  } catch (error) {
    dispatch(actions.subscriptionsPending());
    dispatch(actions.getSubscriptionsError(error.toString()));
  }
};

export const selectId = (dispatch, id) => {
  dispatch(actions.selectIdAction(id));
};

export const deleteSubscriptions = async (dispatch, id) => {
  dispatch(actions.subscriptionsPending());
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/${id}`, {
      method: 'DELETE'
    });
    const data = await res.json();
    dispatch(actions.deleteSubscriptionSuccess(data.message, id));
    dispatch(actions.subscriptionsPending());
  } catch (error) {
    dispatch(actions.subscriptionsPending());
    dispatch(actions.deleteSubscriptionError(error.toString()));
  }
};
