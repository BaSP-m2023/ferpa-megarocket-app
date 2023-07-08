import * as actionsConstants from './actions';

export const getAdmins = async (dispatch) => {
  dispatch(actionsConstants.getAdminsPending());
  const token = sessionStorage.getItem('token');
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/admins`, {
      method: 'GET',
      headers: { token: token }
    });
    if (res.status === 200) {
      const { data } = await res.json();
      dispatch(actionsConstants.getAdminsSuccess(data));
    } else {
      throw new Error('There was an error fetching admins');
    }
  } catch (error) {
    dispatch(actionsConstants.getAdminsError(error.toString()));
  }
};

export const deleteAdmin = async (dispatch, id) => {
  dispatch(actionsConstants.deleteAdminsPending());
  const token = sessionStorage.getItem('token');
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/${id}`, {
      method: 'DELETE',
      headers: { token: token }
    });
    if (res.status === 200) {
      const message = 'Admin deleted';
      dispatch(actionsConstants.deleteAdminsSuccess(message));
    }
    if (res.status === 404) {
      throw new Error('Admin not found');
    }
  } catch (error) {
    dispatch(actionsConstants.deleteAdminsError(error.toString()));
  }
};

export const updateAdmin = async (dispatch, id, updatedAdmin) => {
  const adminToSend = { ...updatedAdmin };
  delete adminToSend._id;
  delete adminToSend.__v;
  dispatch(actionsConstants.putAdminsPending());
  const token = sessionStorage.getItem('token');
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        token: token
      },
      body: JSON.stringify(adminToSend)
    });
    const { message } = await res.json();
    if (res.status === 200) {
      const message = 'Admin Updated';
      dispatch(actionsConstants.putAdminsSuccess(message));
    }
    if (res.status === 400) {
      throw new Error(message);
    }
  } catch (error) {
    dispatch(actionsConstants.putAdminsError(error.toString()));
  }
};

export const addAdmin = async (dispatch, admin) => {
  dispatch(actionsConstants.addAdminsPending());
  const token = sessionStorage.getItem('token');
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/admins`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        token: token
      },
      body: JSON.stringify(admin)
    });
    const { message } = await res.json();
    if (res.status === 201) {
      const message = 'Admin Created';
      dispatch(actionsConstants.addAdminsSuccess(message));
    }
    if (res.status === 400) {
      throw new Error(message);
    }
  } catch (error) {
    dispatch(actionsConstants.addAdminsError(error.toString()));
  }
};
