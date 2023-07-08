import * as actions from './actions';

export const getActivities = async (dispatch) => {
  dispatch(actions.getActivitiesPending());
  const token = sessionStorage.getItem('token');
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/activities`, {
      method: 'GET',
      headers: { token: token }
    });
    const { data, message } = await res.json();
    dispatch(actions.resetInitialState());

    if (res.status === 200) {
      dispatch(actions.getActivitiesSuccess(data));
    }

    if (res.status !== 200) {
      throw new Error(message);
    }
  } catch (error) {
    dispatch(actions.getActivitiesError(error.message));
  }
};

export const postActivity = async (dispatch, newActivity) => {
  dispatch(actions.postActivitiesPending());
  const token = sessionStorage.getItem('token');
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/`, {
      method: 'POST',
      body: JSON.stringify(newActivity),
      headers: {
        'Content-Type': 'application/json',
        token: token
      }
    });
    const { data, message } = await res.json();
    dispatch(actions.resetInitialState());

    if (res.status === 201) {
      dispatch(actions.postActivitiesSuccess(data, message));
    }

    if (res.status !== 201) {
      throw new Error(message);
    }
  } catch (error) {
    dispatch(actions.postActivitiesError(error.message));
  }
};

export const deleteActivity = async (dispatch, id) => {
  dispatch(actions.deleteActivitiesPending());
  const token = sessionStorage.getItem('token');
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/${id}`, {
      method: 'DELETE',
      headers: { token: token }
    });
    const { message } = await res.json();
    dispatch(actions.resetInitialState());

    if (res.status === 200) {
      dispatch(actions.deleteActivitiesSuccess(id, message));
      dispatch(actions.resetInitialState());
    }

    if (res.status !== 200) {
      throw new Error(message);
    }
  } catch (error) {
    dispatch(actions.deleteActivitiesError(error.message));
  }
};

export const putActivity = async (dispatch, id, activtyUpdated) => {
  dispatch(actions.putActivitiesPending());
  const token = sessionStorage.getItem('token');
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/${id}`, {
      method: 'PUT',
      body: JSON.stringify(activtyUpdated),
      headers: {
        'Content-Type': 'application/json',
        token: token
      }
    });
    const { data, message } = await res.json();
    dispatch(actions.resetInitialState());

    if (res.status === 200) {
      dispatch(actions.putActivitiesSuccess(id, data, message));
    }

    if (res.status !== 200) {
      throw new Error(message);
    }
  } catch (error) {
    dispatch(actions.putActivitiesError(error.message));
  }
};
