import * as trainersActions from './actions';

export const getTrainers = async (dispatch) => {
  try {
    dispatch(trainersActions.getTrainersPending());
    const token = sessionStorage.getItem('token');
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainers`, {
      method: 'GET',
      headers: { token: token }
    });
    const data = await response.json();
    if (!data.error) {
      dispatch(trainersActions.getTrainersSuccess(data.data));
    }
    if (data.error) {
      throw new Error(data.message);
    }
  } catch (error) {
    dispatch(trainersActions.getTrainersError(error.message));
  }
};
export const deleteTrainer = async (dispatch, id) => {
  dispatch(trainersActions.deleteTrainersPending());
  const token = sessionStorage.getItem('token');
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainers/${id}`, {
      method: 'DELETE',
      headers: { token: token }
    });
    const { message, error } = await response.json();
    if (!error) {
      dispatch(trainersActions.deleteTrainersSuccess(id, message));
    } else {
      throw new Error(message);
    }
  } catch (error) {
    dispatch(trainersActions.deleteTrainersError(error.toString()));
  }
};
export const sendTrainer = async (dispatch, item) => {
  console.log(item);
  const trainer = {
    firstName: item.firstName,
    lastName: item.lastName,
    dni: item.dni.toString(),
    phone: item.phone.toString(),
    email: item.email,
    city: item.city,
    password: item.password,
    salary: item.salary.toString(),
    activities: item.activities
  };
  try {
    dispatch(trainersActions.addTrainersPending());
    const token = sessionStorage.getItem('token');
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainers/`, {
      method: 'POST',
      body: JSON.stringify(trainer),
      headers: {
        'Content-Type': 'application/json',
        token: token
      }
    });
    const { data, message, error } = await response.json();
    if (!error) {
      dispatch(trainersActions.addTrainersSuccess(data, message));
    }
    if (error) {
      throw new Error(message);
    }
  } catch (error) {
    dispatch(trainersActions.addTrainersError(error.message));
  }
};
export const putTrainer = async (dispatch, id, updatedTrainer) => {
  console.log(updatedTrainer);
  const trainer = {
    firstName: updatedTrainer.firstName,
    lastName: updatedTrainer.lastName,
    dni: updatedTrainer.dni.toString(),
    phone: updatedTrainer.phone.toString(),
    email: updatedTrainer.email,
    city: updatedTrainer.city,
    password: updatedTrainer.password,
    salary: updatedTrainer.salary.toString(),
    activities: updatedTrainer.activities
  };
  try {
    dispatch(trainersActions.editTrainersPending());
    const token = sessionStorage.getItem('token');
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(trainer),
      headers: {
        'Content-Type': 'application/json',
        token: token
      }
    });
    const { data, message, error } = await response.json();
    if (!error) {
      dispatch(trainersActions.editTrainersSuccess(data, id, message));
    }
    if (error) {
      console.log(error);
      throw new Error(message);
    }
  } catch (error) {
    dispatch(trainersActions.editTrainersError(error.message));
  }
};
