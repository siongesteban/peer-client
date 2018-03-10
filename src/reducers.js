import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import layout from './modules/Layout/LayoutReducer';
import auth from './modules/Auth/AuthReducer';
import user from './modules/User/UserReducer';
import { notesReducer, noteReducer } from './modules/Note/NoteReducers';

export default combineReducers({
  layout,
  auth,
  user,
  router: routerReducer,
  form: formReducer,
  notes: notesReducer,
  note: noteReducer
});