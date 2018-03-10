import { TOGGLE_DRAWER, SWITCH_PAGE } from './LayoutActions';
import { DRAWER_WIDTH } from './LayoutConstants';

const initialPath = window.location.pathname;

const initialState = {
  drawer: {
    isOpen: false,
    width: DRAWER_WIDTH
  },
  page: {
    current: initialPath === '/' ? 'home' : initialPath.substr(1)
  }
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
          current: action.pageName
        }
      };
    default:
      return state;
  }
};

export default LayoutReducer;
