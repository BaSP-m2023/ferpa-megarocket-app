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

export const getMembers = () => {
  return async (dispatch) => {
    dispatch(getMembersPending());
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/members`);
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
          'Content-Type': 'application/json'
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
        method: 'DELETE'
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
