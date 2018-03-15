import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import {
  RESET,
  NOTES_FAILURE,
  NOTES_REQUEST,
  GET_NOTES_SUCCESS,
  CREATE_NOTE_SUCCESS
} from './NoteActions';

const initialState = {
  all: [],
  failed: false,
  successful: false,
  isLoading: false,
  isLoaded: false,
};

const persistConfig = {
  key: 'notes',
  storage: storage,
};

export const notesReducer = persistReducer(persistConfig, (state = initialState, action) => {
  switch (action.type) {
    case RESET:
      return {
        ...state,
        isLoading: false,
        failed: false,
        successful: false,
      };
    case NOTES_REQUEST:
      return {
        ...state,
        isLoading: true,
        failed: false,
        successful: false,
      };
    case NOTES_FAILURE:
      return {
        ...state,
        failed: true,
        successful: false,
        isLoading: false,
      };
    case GET_NOTES_SUCCESS:
      return {
        ...state,
        all: action.payload.notes,
        isLoading: false,
        isLoaded: true,
      };
    case CREATE_NOTE_SUCCESS:
      return {
        ...state,
        all: [action.payload.note, ...state.all],
        successful: true,
        isLoading: false,
      }
    default:
      return state;
  }
});

export default notesReducer;