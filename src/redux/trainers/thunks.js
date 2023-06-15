import * as trainersActions from './actions';

export const getTrainers = async (dispatch) => {
  try {
    dispatch(trainersActions.getTrainersPending());
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainers`);
    const data = await response.json();
    dispatch(trainersActions.getTrainersSuccess(data.data));
  } catch (error) {
    dispatch(trainersActions.getTrainersError(error.toString()));
  }
};
