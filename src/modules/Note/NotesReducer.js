import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import {
  CLEAR_NOTES,
  RESET,
  NOTES_FAILURE,
  NOTES_REQUEST,
  GET_NOTES_SUCCESS,
  SET_CURRENT_NOTE,
  CREATE_NOTE_SUCCESS,
  UPDATE_NOTE_SUCCESS,
  DELETE_NOTE_SUCCESS,
} from './NoteActions';

const initialState = {
  all: [],
  current: {},
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
    case CLEAR_NOTES:
      return {
        ...state,
        all: [],
        isLoaded: false,
      };
    case RESET:
      return {
        ...state,
        isLoading: false,
        failed: false,
        successful: false,
        isDeleteSuccessful: false,
      };
    case SET_CURRENT_NOTE:
      return {
        ...state,
        current: action.payload.note,
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
        all: action.payload.note
          ? [action.payload.note, ...state.all]
          : [...state.all],
        successful: true,
        isLoading: false,
      };
    case UPDATE_NOTE_SUCCESS:
      let noteIdFromPayload, noteIdFromStore;
      return {
        ...state,
        all: action.payload.note
        ? [
            ...state.all.map(note => {
              noteIdFromPayload = action.payload.note._id.toString();
              noteIdFromStore = note._id.toString();

              if (noteIdFromPayload === noteIdFromStore) {
                return action.payload.note;
              }

              return note;
            })
          ]
        : state.all,
        current: !action.payload.note
          ? state.current
          : action.payload.note,
        successful: true,
        isLoading: false,
      };
    case DELETE_NOTE_SUCCESS:
      return {
        ...state,
        all: state.all.filter(note => (
          note._id !== action.payload.noteId
        )),
        current: {},
        isDeleteSuccessful: true,
        isLoading: false,
      }
    default:
      return state;
  }
});

export default notesReducer;