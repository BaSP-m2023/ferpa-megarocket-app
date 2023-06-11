import * as actions from './actions';

export const getActivities = async (dispatch) => {
  try {
    dispatch(actions.getActivitiesPending());
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/`);
    const data = await res.json();
    dispatch(actions.getActivitiesPending());
    dispatch(actions.getActivitiesSuccess(data.data));
  } catch (error) {
    dispatch(actions.getActivitiesError(error.toString()));
  }
};
