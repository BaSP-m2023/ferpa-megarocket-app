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
    dispatch(trainersActions.deleteTrainersError(error.toString()));
  }
};
export const sendTrainer = async (dispatch, item) => {
  try {
    dispatch(trainersActions.addTrainersPending());
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainers/`, {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const { data } = await response.json();
    dispatch(trainersActions.addTrainersSuccess(data));
  } catch (error) {
    dispatch(trainersActions.addTrainersError(error.toString()));
  }
};
export const putTrainer = async (dispatch, id, updatedTrainer) => {
  const trainer = {
    firstName: updatedTrainer.firstName,
    lastName: updatedTrainer.lastName,
    dni: updatedTrainer.dni.toString(),
    phone: updatedTrainer.phone.toString(),
    email: updatedTrainer.email,
    city: updatedTrainer.city,
    password: updatedTrainer.password,
    salary: updatedTrainer.salary.toString()
  };
  try {
    dispatch(trainersActions.editTrainersPending());
    console.log(updatedTrainer);
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(trainer),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    if (!data.error) {
      dispatch(trainersActions.editTrainersSuccess(data.data, id));
    } else {
      dispatch(trainersActions.editTrainersError(data.message));
    }
  } catch (error) {
    dispatch(trainersActions.editTrainersError(error.toString()));
  }
};
