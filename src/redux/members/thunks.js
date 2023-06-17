import {
  resetInitialState,
  getMembersPending,
  getMembersSuccess,
  getMembersError,
  getMemberByIdPending,
  getMemberByIdSuccess,
  getMemberByIdError,
  updateMemberPending,
  updateMemberSuccess,
  updateMemberError,
  createMemberPending,
  createMemberSuccess,
  createMemberError,
  deleteMemberPending,
  deleteMemberSuccess,
  deleteMemberError
} from './actions';

export const getMembers = () => {
  return async (dispatch) => {
    try {
      dispatch(getMembersPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/members`);
      const data = await response.json();
      if (data.error) {
        throw new Error(data.message);
      }
      dispatch(getMembersSuccess(data.data));
    } catch (error) {
      dispatch(getMembersError(error));
    }
  };
};

export const getMemberById = (id) => {
  return async (dispatch) => {
    try {
      dispatch(getMemberByIdPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/members/${id}`);
      const data = await response.json();
      if (data.error) {
        throw new Error(data.message);
      }
      console.log(data.data);
      dispatch(getMemberByIdSuccess(data.data));
      console.log(data.data);
    } catch (error) {
      dispatch(getMemberByIdError(error));
    }
  };
};

export const updateMember = (id, member) => async (dispatch) => {
  dispatch(updateMemberPending());

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/members/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: member.firstName,
        lastName: member.lastName,
        dni: member.dni,
        phone: member.phone,
        email: member.email,
        city: member.city,
        birthDay: member.birthDay,
        postalCode: member.postalCode,
        isActive: member.isActive,
        membership: member.membership
      })
    });

    const updatedMember = await response.json();

    if (response.ok) {
      dispatch(updateMemberSuccess(updatedMember));
    } else {
      dispatch(updateMemberError('Failed to update member.'));
    }
  } catch (error) {
    dispatch(updateMemberError('An error occurred while updating member.'));
  }
};

export const createMember = (member) => async (dispatch) => {
  dispatch(createMemberPending());

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/members/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(member)
    });

    const data = await response.json();

    if (response.ok) {
      dispatch(createMemberSuccess(data));
    } else {
      dispatch(createMemberError('Failed to create member.'));
    }
  } catch (error) {
    dispatch(createMemberError('An error occurred while creating member.'));
  }
};

export const deleteMember = (id) => {
  return async (dispatch) => {
    dispatch(deleteMemberPending());
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/members/${id}`, {
        method: 'DELETE'
      });
      const { message } = await res.json();
      dispatch(resetInitialState());

      if (res.status === 200) {
        dispatch(deleteMemberSuccess(id, message));
        dispatch(resetInitialState());
      }

      if (res.status !== 200) {
        throw new Error(message);
      }
    } catch (error) {
      dispatch(deleteMemberError(error.message));
    }
  };
};
