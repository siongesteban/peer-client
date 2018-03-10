import {
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  RESET
} from './UserActions';

const initialState = {
  currentUser: {},
  successful: false,
  failed: false,
  message: null,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
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
        message: action.message
      };
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        failed: true,
        message: action.message
      };
    case RESET:
      return {
        ...state,
        failed: false,
        successful: false,
        message: null
      };
    default:
      return state;
  }
};

export default UserReducer;