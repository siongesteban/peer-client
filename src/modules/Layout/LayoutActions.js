import { PRIMARY_COLOR } from './LayoutConstants';
import { updateThemeColor } from './LayoutUtils';

export const TOGGLE_DRAWER = 'layout/TOGGLE_DRAWER';
export const SWITCH_PAGE = 'layout/SWITCH_PAGE';
export const SET_SNACKBAR_MESSAGE = 'layout/SET_SNACKBAR_MESSAGE';
export const SHOW_SNACKBAR = 'layout/SHOW_SNACKBAR';

export const toggleDrawer = () => {
  return dispatch => {
    dispatch({
      type: TOGGLE_DRAWER
    });
  };
};

export const switchPage = () => {
  const path = window.location.pathname;
  const pageName = path === '/' ? 'home' : path.substr(1);

  if (pageName.indexOf('notes') > -1) {
    if (pageName.indexOf('/') === -1) {
      updateThemeColor(PRIMARY_COLOR);
    }
  }

  return dispatch => {
    dispatch(setSnackbarMessage());
    dispatch({
      type: SWITCH_PAGE,
      pageName
    });
  }
};

export const setSnackbarMessage = (message = null) => {
  return dispatch => {
    dispatch({
      type: SET_SNACKBAR_MESSAGE,
      message
    });
  };
};

export const showSnackbar = () => {
  return dispatch => {
    dispatch({
      type: SHOW_SNACKBAR
    })
  }
}