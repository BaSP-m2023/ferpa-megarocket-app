import * as actions from './actions';

export const selectId = (dispatch, id) => {
  dispatch(actions.selectIdAction(id));
};

export const getSubscriptions = async (dispatch) => {
  dispatch(actions.resetState());
  dispatch(actions.subscriptionsPending());
  const token = sessionStorage.getItem('token');
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/all`, {
      method: 'GET',
      headers: { token: token }
    });
    const data = await res.json();
    dispatch(actions.getSubscriptionsSuccess(data.data));
  } catch (error) {
    dispatch(actions.getSubscriptionsError(error.toString()));
  }
};

export const deleteSubscriptions = async (dispatch, id) => {
  dispatch(actions.resetState());
  dispatch(actions.subscriptionsPending());
  const token = sessionStorage.getItem('token');
  try {
    const subToDelete = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/${id}`, {
      method: 'GET',
      headers: { token: token }
    });
    const subjson = await subToDelete.json();
    const member = subjson.data.memberId;
    const editedClass = await fetch(
      `${process.env.REACT_APP_API_URL}/api/classes/${subjson.data.classId._id}`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          token: token
        }
      }
    );
    const classjson = await editedClass.json();
    const newSubs = classjson.data.subscribers.filter((element) => element !== member._id);
    const classToSend = { subscribers: newSubs };
    await fetch(`${process.env.REACT_APP_API_URL}/api/classes/${subjson.data.classId._id}`, {
      method: 'PUT',
      body: JSON.stringify(classToSend),
      headers: {
        'Content-type': 'application/json',
        token: token
      }
    });
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/${id}`, {
      method: 'DELETE',
      headers: { token: token }
    });
    const data = await res.json();
    data.error
      ? dispatch(actions.deleteSubscriptionError(data.message))
      : dispatch(actions.deleteSubscriptionSuccess(data.message, id));
  } catch (error) {
    dispatch(actions.deleteSubscriptionError(error.toString()));
  }
};

export const postSubscriptions = async (dispatch, newSub) => {
  dispatch(actions.resetState());
  dispatch(actions.subscriptionsPending());
  const token = sessionStorage.getItem('token');
  const member = newSub.memberId;
  try {
    const editedClass = await fetch(
      `${process.env.REACT_APP_API_URL}/api/classes/${newSub.classId}`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          token: token
        }
      }
    );
    const classjson = await editedClass.json();
    classjson.data.subscribers.push(member);
    const classToSend = { subscribers: classjson.data.subscribers };
    await fetch(`${process.env.REACT_APP_API_URL}/api/classes/${newSub.classId}`, {
      method: 'PUT',
      body: JSON.stringify(classToSend),
      headers: {
        'Content-type': 'application/json',
        token: token
      }
    });
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/`, {
      method: 'POST',
      body: JSON.stringify(newSub),
      headers: {
        'Content-Type': 'application/json',
        token: token
      }
    });

    const data = await res.json();
    data.error
      ? dispatch(actions.postSubscriptionError(data.message))
      : dispatch(actions.postSubscriptionSuccess(data.data, data.message));
  } catch (error) {
    dispatch(actions.postSubscriptionError(error.toString()));
  }
};

export const updateSubscription = async (dispatch, update, id) => {
  dispatch(actions.resetState());
  dispatch(actions.subscriptionsPending());
  const token = sessionStorage.getItem('token');
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(update),
      headers: {
        'Content-Type': 'application/json',
        token: token
      }
    });
    const data = await res.json();
    data.error
      ? dispatch(actions.putSubscriptionError(data.message))
      : dispatch(actions.putSubscriptionSuccess(data.data, data.message, id));
  } catch (error) {
    dispatch(actions.putSubscriptionError(error.toString()));
  }
};
