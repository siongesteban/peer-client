import isEmpty from 'lodash/isEmpty';

import {
  SET_USER,
  RESET,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
} from './AuthActions';
import {
  CLOSE_SNACKBAR
} from '../Layout/LayoutActions';

const initialState = {
  isAuthenticated: false,
  user: {},
  successful: false,
  message: null,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.user),
        user: action.user,
      };
    case CLOSE_SNACKBAR:
      return {
        ...state,
        isAuthenticated: false,
        successful: false,
      };
    case RESET:
      return {
        ...state,
        isAuthenticated: false,
        successful: false,
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        successful: true,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default AuthReducer;