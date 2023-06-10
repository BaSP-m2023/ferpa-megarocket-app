import { getClassesPending, getClassesSuccess, getClasseserror } from './actions';

export const getClasses = () => {
  return async (dispatch) => {
    dispatch(getClassesPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/classes/`);
      const data = await response.json();
      dispatch(getClassesSuccess(data.data));
      return data.data;
    } catch (error) {
      dispatch(getClasseserror(error.toString()));
    }
  };
};
