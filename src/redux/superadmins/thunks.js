import * as actions from './actions';

export const getSuperAdmins = async (dispatch) => {
  try {
    dispatch(actions.getSuperadminsPending());
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/`);
    const data = await res.json();
    dispatch(actions.getSuperadminsPending());
    dispatch(actions.getSuperadminsSuccess(data.data));
  } catch (error) {
    dispatch(actions.getSuperadminsError(error.toString()));
  }
};

export const postSuperAdmins = async (dispatch, newSuperadmin) => {
  try {
    dispatch(actions.postSuperadminsPending());
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/`, {
      method: 'POST',
      body: JSON.stringify(newSuperadmin),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();

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
