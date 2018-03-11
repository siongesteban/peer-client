import axios from 'axios';

import secret from '../../secret';
import { setUser } from '../Auth/AuthActions';
import { setSnackbarMessage } from '../Layout/LayoutActions';

export const UPDATE_USER_REQUEST = 'user/UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'user/UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'user/UPDATE_USER_FAILURE';
export const RESET = 'user/RESET';


export const reset = () => {
  return {
    type: RESET
  };
};

const updateUserRequest = () => {
  return {
    type: UPDATE_USER_REQUEST
  };
};

const updateUserSuccess = () => {
  return {
    type: UPDATE_USER_SUCCESS
  };
};

const updateUserFailure = () => {
  return {
    type: UPDATE_USER_FAILURE
  };
};

export const updateUser = (id, data) => {
  return dispatch => {
    dispatch(updateUserRequest());

    console.log('id: ', id);
    axios.patch(`${secret.API_URL}/users/${id}`, data)
      .then(res => {
        console.log(`New Token: ${res.data.newToken}`);
        dispatch(reset());

        const message = res.data.message;

        dispatch(updateUserSuccess(message));
        dispatch(setUser(res.data.newToken));
        dispatch(setSnackbarMessage(message));
      })
      .catch(err => {
        const message = err.response.data.message;

        dispatch(updateUserFailure(message));
        dispatch(setSnackbarMessage(message));
      });
  }
}