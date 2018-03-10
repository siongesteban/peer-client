import { PRIMARY_COLOR } from './LayoutConstants';
import { updateThemeColor } from './LayoutUtils';

export const TOGGLE_DRAWER = 'layout/TOGGLE_DRAWER';
export const SWITCH_PAGE = 'layout/SWITCH_PAGE';

export const toggleDrawer = () => {
  return dispatch => {
    dispatch({
      type: TOGGLE_DRAWER
    });
  };
}

export const switchPage = () => {
  const path = window.location.pathname;
  const pageName = path === '/' ? 'home' : path.substr(1);

  if (pageName.indexOf('notes') > -1) {
    if (pageName.indexOf('/') === -1) {
      updateThemeColor(PRIMARY_COLOR);
    }
  }

  return dispatch => {
    dispatch({
      type: SWITCH_PAGE,
      pageName
    });
  }
}