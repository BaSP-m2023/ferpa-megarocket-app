import {
  resetInitialState,
  getMembersPending,
  getMembersSuccess,
  getMembersError,
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

const token = sessionStorage.getItem('token');

export const getMembers = () => {
  return async (dispatch) => {
    dispatch(getMembersPending());
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/members`, {
        method: 'GET',
        headers: { token: token }
      });
      const { data, message } = await res.json();
      dispatch(resetInitialState());
      if (res.ok) {
        dispatch(getMembersSuccess(data));
      }
      if (!res.ok) {
        throw new Error(message);
      }
    } catch (error) {
      dispatch(getMembersError(error.message));
    }
  };
};

export const updateMember = (id, member) => {
  return async (dispatch) => {
    dispatch(updateMemberPending());
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/members/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token: token
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
          membership: member.membership,
          password: member.password
        })
      });

      const { data, message } = await res.json();
      dispatch(resetInitialState());
      if (res.ok) {
        dispatch(updateMemberSuccess(id, data, message));
      }
      if (!res.ok) {
        throw new Error(message);
      }
    } catch (error) {
      dispatch(updateMemberError(error.message));
    }
  };
};

export const createMember = (member) => {
  return async (dispatch) => {
    dispatch(createMemberPending());

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/members/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: token
        },
        body: JSON.stringify(member)
      });

      const { data, message } = await res.json();
      dispatch(resetInitialState());

      if (res.ok) {
        dispatch(createMemberSuccess(data, message));
      }
      if (!res.ok) {
        throw new Error(message);
      }
    } catch (error) {
      dispatch(createMemberError(error.message));
    }
  };
};

export const deleteMember = (id) => {
  return async (dispatch) => {
    dispatch(deleteMemberPending());
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/members/${id}`, {
        method: 'DELETE',
        headers: { token: token }
      });
      const { message } = await res.json();
      dispatch(resetInitialState());

      if (res.ok) {
        dispatch(deleteMemberSuccess(id, message));
        dispatch(resetInitialState());
      }

      if (!res.ok) {
        throw new Error(message);
      }
    } catch (error) {
      dispatch(deleteMemberError(error.message));
    }
  };
};
