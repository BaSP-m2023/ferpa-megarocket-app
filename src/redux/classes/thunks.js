import * as classActions from './actions';

export const getClasses = () => {
  return async (dispatch) => {
    dispatch(classActions.getClassesPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/classes/`);
      const data = await response.json();
      dispatch(classActions.resetState());
      dispatch(classActions.getClassesSuccess(data.data));
      return data.data;
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
          'Content-type': 'application/json'
        }
      });
      const { data, error } = await response.json();
      dispatch(classActions.resetState());
      if (response.status === 201) {
        dispatch(classActions.postClassSuccess(data.message));
      } else if (response.status === 500) {
        dispatch(classActions.postClassError(error._message));
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
        method: 'DELETE'
      });
      const data = await response.json();
      dispatch(classActions.resetState());
      if (response.status === 200) {
        dispatch(classActions.deleteClassSuccess(id, data._message));
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
          'Content-type': 'application/json'
        }
      });
      const data = await response.json();
      dispatch(classActions.resetState());
      if (response.status === 200) {
        dispatch(classActions.putClassSuccess(id, data.message));
      }
    } catch (error) {
      dispatch(classActions.putClassError(error.toString()));
    }
  };
};
