import * as actions from './actions';

export const getActivities = async (dispatch) => {
  dispatch(actions.getActivitiesPending());
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/`);
    const data = await res.json();
    dispatch(actions.resetInitialState());
    if (res.status === 200) {
      dispatch(actions.getActivitiesSuccess(data.data));
    }
    if (res.status !== 200) {
      throw new Error(data.message);
    }
  } catch (error) {
    dispatch(actions.getActivitiesError(error.message));
  }
};

export const postActivity = async (dispatch, newActivity) => {
  dispatch(actions.postActivitiesPending());
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/`, {
      method: 'POST',
      body: JSON.stringify(newActivity),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    dispatch(actions.resetInitialState());
    if (res.status === 201) {
      dispatch(actions.postActivitiesSuccess(data.data, data.message));
    }
    if (res.status !== 201) {
      throw new Error(data.message);
    }
  } catch (error) {
    dispatch(actions.postActivitiesError(error.message));
  }
};
