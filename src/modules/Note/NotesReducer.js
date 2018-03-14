import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import {
  GET_NOTES_FAILURE,
  GET_NOTES_REQUEST,
  GET_NOTES_SUCCESS,
} from './NoteActions';

const initialState = {
  all: [],
  failed: false,
  isLoading: false,
  isLoaded: false,
};

const persistConfig = {
  key: 'notes',
  storage: storage,
};

export const notesReducer = persistReducer(persistConfig, (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTES_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_NOTES_FAILURE:
      return {
        ...state,
        failed: true,
        isLoading: false,
      };
    case GET_NOTES_SUCCESS:
      return {
        ...state,
        all: action.notes,
        isLoading: false,
        isLoaded: true,
      };
    default:
      return state;
  }
});

export default notesReducer;