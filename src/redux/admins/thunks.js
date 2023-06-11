import { getAdminsPending, getAdminsSuccess, getAdminsError } from './actions';

export const getAdmins = async (dispatch) => {
  try {
    dispatch(getAdminsPending());
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/admins`);
    if (res.status === 200) {
      const { data } = await res.json();
      dispatch(getAdminsSuccess(data));
    } else {
      throw new Error('There was an error fetching admins');
    }
  } catch (error) {
    dispatch(getAdminsError(error));
  }
};
