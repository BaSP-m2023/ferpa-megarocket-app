import * as actionsConstants from './actions';

export const getAdmins = async (dispatch) => {
  dispatch(actionsConstants.getAdminsPending());
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/admins`);
    if (res.status === 200) {
      const { data } = await res.json();
      dispatch(actionsConstants.getAdminsSuccess(data));
    } else {
      throw new Error('There was an error fetching admins');
    }
  } catch (error) {
    dispatch(actionsConstants.getAdminsError(error));
  }
};

export const deleteAdmin = async (dispatch, id) => {
  dispatch(actionsConstants.deleteAdminsPending());
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/${id}`, {
      method: 'DELETE'
    });
    if (res.status === 200) {
      const message = 'Admin deleted';
      dispatch(actionsConstants.deleteAdminsSuccess(message));
    }
  } catch (error) {
    dispatch(actionsConstants.deleteAdminsError(error));
  }
};
