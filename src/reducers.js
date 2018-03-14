import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import layout from './modules/Layout/LayoutReducer';
import auth from './modules/Auth/AuthReducer';
import user from './modules/User/UserReducer';
import notes from './modules/Note/NotesReducer';

export default combineReducers({
  layout,
  auth,
  user,
  notes,
  router: routerReducer,
  form: formReducer,
});