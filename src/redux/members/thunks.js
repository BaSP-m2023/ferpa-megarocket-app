import * as actions from './actions';

export const getMembers = async (dispatch) => {
  try {
    dispatch(actions.getMembersPending());
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/members`);
    const data = await response.json();
    dispatch(actions.getMembersSuccess(data.data));
  } catch (error) {
    dispatch(actions.getMembersError(error.toString()));
  }
};
