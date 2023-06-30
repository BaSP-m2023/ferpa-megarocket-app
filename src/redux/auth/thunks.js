import {
  loginPending,
  loginError,
  loginSuccess,
  getAuthPending,
  getAuthError,
  getAuthSuccess,
  logoutPending,
  logoutError,
  logoutSuccess,
  signUpPending,
  signUpSuccess,
  signUpError
} from './action';
import { firebaseApp } from 'helper/firebase';

export const login = (credentials) => {
  return async (dispatch) => {
    dispatch(loginPending());
    try {
      const firebaseResponse = await firebaseApp
        .auth()
        .signInWithEmailAndPassword(credentials.email, credentials.password);
      const token = await firebaseResponse.user.getIdToken();
      const {
        claims: { role }
      } = await firebaseResponse.user.getIdTokenResult();
      dispatch(loginSuccess({ role, token }));
    } catch (error) {
      dispatch(loginError(error.toString()));
    }
  };
};

export const getAuth = (token) => {
  return async (dispatch) => {
    dispatch(getAuthPending());
    try {
      const response = fetch(`${process.env.REACT_APP_API_URL}/api/auth/`, { headers: { token } });
      const res = await response.json();
      dispatch(getAuthSuccess(res.data));
    } catch (error) {
      dispatch(getAuthError(error.toString()));
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch(logoutPending());
    try {
      await firebaseApp.auth().signOut();
      sessionStorage.removeItem('role', '');
      sessionStorage.removeItem('token', '');
      dispatch(logoutSuccess());
    } catch (error) {
      dispatch(logoutError(error.toString()));
    }
  };
};

export const signUpMember = (data) => {
  return async (dispatch) => {
    dispatch(signUpPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/members`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const res = await response.json();
      if (response.error) {
        throw new Error(response.message);
      }
      await dispatch(signUpSuccess(data));
      return res;
    } catch (error) {
      dispatch(signUpError(error.toString()));
    }
  };
};
