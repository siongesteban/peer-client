import {
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  RESET
} from './UserActions';
import {
  CLOSE_SNACKBAR
} from '../Layout/LayoutActions';

const initialState = {
  currentUser: {},
  successful: false,
  failed: false,
  message: null,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLOSE_SNACKBAR:
      return {
        ...state,
        failed: false,
        successful: false,
      };
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        successful: true,
      };
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        failed: true,
      };
    case RESET:
      return {
        ...state,
        failed: false,
        successful: false,
      };
    default:
      return state;
  }
};

export default UserReducer;