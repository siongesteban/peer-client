import axios from 'axios';

import secret from '../../secret';
import { setUser } from '../Auth/AuthActions';

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

const updateUserSuccess = message => {
  return {
    type: UPDATE_USER_SUCCESS,
    message
  };
};

const updateUserFailure = message => {
  return {
    type: UPDATE_USER_FAILURE,
    message
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

        dispatch(updateUserSuccess(res.data.message));
        dispatch(setUser(res.data.newToken));
      })
      .catch(err => {
        dispatch(updateUserFailure(err.response.data.message));
      });
  }
}