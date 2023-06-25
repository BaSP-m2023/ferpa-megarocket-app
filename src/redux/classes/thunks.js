import * as classActions from './actions';

const token = sessionStorage.getItem('token');

export const getClasses = () => {
  return async (dispatch) => {
    dispatch(classActions.getClassesPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/classes`, {
        method: 'GET',
        headers: { token: token }
      });
      const { data, message } = await response.json();
      dispatch(classActions.resetState());
      if (response.status === 200) {
        dispatch(classActions.getClassesSuccess(data));
      } else {
        throw new Error(message);
      }
      return data;
    } catch (error) {
      dispatch(classActions.getClassesError(error.toString()));
    }
  };
};

export const postClass = (newClass) => {
  return async (dispatch) => {
    dispatch(classActions.postClassPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/classes/`, {
        method: 'POST',
        body: JSON.stringify(newClass),
        headers: {
          'Content-type': 'application/json',
          token: token
        }
      });
      const { message } = await response.json();
      dispatch(classActions.resetState());
      if (response.status === 201) {
        dispatch(classActions.postClassSuccess(message));
      } else {
        throw new Error(message);
      }
    } catch (error) {
      dispatch(classActions.postClassError(error.toString()));
    }
  };
};

export const deleteClass = (id) => {
  return async (dispatch) => {
    dispatch(classActions.deleteClassPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/classes/${id}`, {
        method: 'DELETE',
        headers: { token: token }
      });
      const { message } = await response.json();
      dispatch(classActions.resetState());
      if (response.status === 200) {
        dispatch(classActions.deleteClassSuccess(id, message));
      } else {
        throw new Error(message);
      }
    } catch (error) {
      dispatch(classActions.deleteClassError(error.toString()));
    }
  };
};

export const putClass = (id, newClass) => {
  return async (dispatch) => {
    dispatch(classActions.putClassPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/classes/${id}`, {
        method: 'PUT',
        body: JSON.stringify(newClass),
        headers: {
          'Content-type': 'application/json',
          token: token
        }
      });
      const { message } = await response.json();
      dispatch(classActions.resetState());
      if (response.status === 200) {
        dispatch(classActions.putClassSuccess(id, message));
      } else {
        throw new Error(message);
      }
    } catch (error) {
      dispatch(classActions.putClassError(error.toString()));
    }
  };
};
