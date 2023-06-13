import { getSuperadminsPending, getSuperadminsError, getSuperadminsSuccess } from './actions';

export const getSuperAdmins = () => {
  return async (dispatch) => {
    try {
      dispatch(getSuperadminsPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/`);
      const responseJson = await response.json();
      const data = responseJson.data;
      if (responseJson.error) {
        throw new Error(responseJson.message);
      }
      dispatch(getSuperadminsSuccess(data));
    } catch (error) {
      dispatch(getSuperadminsError(error.message));
    }
  };
};
