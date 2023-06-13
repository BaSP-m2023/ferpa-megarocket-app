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
export const deleteTrainer = async (dispatch, id) => {
  dispatch(trainersActions.deleteTrainersPending());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainers/${id}`, {
      method: 'DELETE'
    });
    const { message, error } = await response.json();
    if (!error) {
      dispatch(trainersActions.deleteTrainersSuccess(id));
    } else {
      throw new Error(message);
    }
  } catch (error) {
    dispatch(trainersActions.deleteTrainersError(error.message));
  }
};
