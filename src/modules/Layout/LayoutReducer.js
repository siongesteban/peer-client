import {
  TOGGLE_DRAWER,
  SWITCH_PAGE,
  SET_SNACKBAR_MESSAGE,
  SHOW_SNACKBAR,
} from './LayoutActions';
import { DRAWER_WIDTH } from './LayoutConstants';

const initialPath = window.location.pathname;

const initialState = {
  drawer: {
    isOpen: false,
    width: DRAWER_WIDTH
  },
  page: {
    current: initialPath === '/' ? 'home' : initialPath.substr(1),
    snackbarMessage: null,
    snackbarIsVisible: false,
  },
}

const LayoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return {
        ...state,
        drawer: {
          isOpen: !state.drawer.isOpen
        }
      };
    case SWITCH_PAGE:
      return {
        ...state,
        page: {
          ...state.page,
          current: action.pageName
        }
      };
    case SET_SNACKBAR_MESSAGE: 
      return {
        ...state,
        page: {
          ...state.page,
          snackbarMessage: action.message,
          snackbarIsVisible: false,
        }
      };
    case SHOW_SNACKBAR:
      return {
        ...state,
        page: {
          ...state.page,
          snackbarIsVisible: true
        }
      };
    default:
      return state;
  }
};

export default LayoutReducer;
