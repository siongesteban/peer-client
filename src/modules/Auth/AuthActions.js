import axios from 'axios';
import jwt from 'jsonwebtoken';
import { push } from 'react-router-redux'

import { setAuthorizationToken } from './AuthUtils';
import { setSnackbarMessage } from '../Layout/LayoutActions';
import { clearNotes } from '../Note/NoteActions';
import secret from '../../secret';

export const SET_USER = 'auth/SET_USER';
export const RESET = 'auth/RESET';
export const LOGIN_REQUEST = 'auth/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';
export const SIGNUP_REQUEST = 'auth/SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'auth/SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'auth/SIGNUP_FAILURE';

export const setUser = token => {
  let user;

  if (token) {
    localStorage.setItem('token', token);
    setAuthorizationToken(token);
    user = jwt.decode(token);
  } else {
    localStorage.removeItem('token');
    setAuthorizationToken(false);
    user = {};
  }
  
  return {
    type: SET_USER,
    user,
  };
};

export const reset = () => {
  return {
    type: RESET
  };
};

const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

export const loginSuccess = () => {
  return {
    type: LOGIN_SUCCESS
  };
};

export const loginFailure = message => {
  return {
    type: LOGIN_FAILURE,
    message,
  };
};

export const logIn = data => {
  return dispatch => {
    dispatch(loginRequest());

    axios.post(`${secret.API_URL}/auth/login`, data)
      .then(res => {
        dispatch(reset());
        dispatch(loginSuccess());
        dispatch(setUser(res.data.token));
      })
      .catch(err => {
        dispatch(reset());

        let message;

        if (err.response.status === 500) {
          message = err.response.data.message;
        } else {
          message = 'The email or password is incorrect.';
        }

        dispatch(loginFailure());
        dispatch(setSnackbarMessage(message));
      });
  };
}

export const logOut = () => {
  return dispatch => {
    dispatch(setUser(false));
    dispatch(clearNotes());
    dispatch(push('/login'));
  }
}

const signupRequest = () => {
  return {
    type: SIGNUP_REQUEST
  };
};

export const signupSuccess = () => {
  return {
    type: SIGNUP_SUCCESS
  };
};

export const signupFailure = () => {
  return {
    type: SIGNUP_FAILURE
  };
};

export const signUp = data => {
  return dispatch => {
    dispatch(signupRequest());

    axios.post(`${secret.API_URL}/auth/signup`, data)
      .then(res => {
        dispatch(reset());
        dispatch(signupSuccess());
        dispatch(setSnackbarMessage(
          'Your account has been created. Please log in.'
        ));
      })
      .catch(err => {
        const message = err.response.data.message;

        dispatch(reset());
        dispatch(signupFailure());
        dispatch(setSnackbarMessage(message));
      });
  };
};