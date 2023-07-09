import * as actions from './actions';

export const getSuperAdmins = async (dispatch) => {
  dispatch(actions.getSuperadminsPending());
  const token = sessionStorage.getItem('token');
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins`, {
      method: 'GET',
      headers: { token: token }
    });
    const data = await res.json();
    dispatch(actions.resetInitialState());

    if (res.status === 200) {
      dispatch(actions.getSuperadminsSuccess(data.data));
    }

    if (res.status !== 200) {
      throw new Error(data.message);
    }
  } catch (error) {
    dispatch(actions.getSuperadminsError(error.message));
  }
};

export const postSuperAdmins = async (dispatch, newSuperadmin) => {
  try {
    dispatch(actions.postSuperadminsPending());
    const token = sessionStorage.getItem('token');
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/`, {
      method: 'POST',
      body: JSON.stringify(newSuperadmin),
      headers: {
        'Content-Type': 'application/json',
        token: token
      }
    });
    const data = await res.json();
    dispatch(actions.resetInitialState());

    if (res.status === 201) {
      dispatch(actions.postSuperadminsSuccess(data.data, data.message));
    }

    if (res.status !== 201) {
      throw new Error(data.message);
    }
  } catch (error) {
    dispatch(actions.postSuperadminsError(error.message));
  }
};

export const deleteSuperAdmin = async (dispatch, id) => {
  dispatch(actions.deleteSuperadminsPending());
  const token = sessionStorage.getItem('token');
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/${id}`, {
      method: 'DELETE',
      headers: { token: token }
    });
    const data = await res.json();
    dispatch(actions.resetInitialState());

    if (res.status === 200) {
      dispatch(actions.deleteSuperadminsSuccess(id, data.message));
      dispatch(actions.resetInitialState());
    }

    if (res.status !== 200) {
      throw new Error(data.message);
    }
  } catch (error) {
    dispatch(actions.deleteSuperadminsError(error.message));
  }
};

export const putSuperAdmin = async (dispatch, id, superadminUpdated) => {
  dispatch(actions.putSuperadminsPending());
  const token = sessionStorage.getItem('token');
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/${id}`, {
      method: 'PUT',
      body: JSON.stringify(superadminUpdated),
      headers: {
        'Content-Type': 'application/json',
        token: token
      }
    });
    const data = await res.json();
    dispatch(actions.resetInitialState());

    if (res.status === 200) {
      dispatch(actions.putSuperadminsSuccess(id, data.data, data.message));
    }

    if (res.status !== 200) {
      throw new Error(data.message);
    }
  } catch (error) {
    dispatch(actions.putSuperadminsError(error.message));
  }
};
