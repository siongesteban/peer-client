import axios from 'axios';
import mongoose from 'mongoose';
import moment from 'moment';

import secret from '../../secret';
import { setSnackbarMessage } from '../Layout/LayoutActions';
import { getUser } from '../Auth/AuthUtils';
import { store } from '../../store';

export const RESET = 'note/RESET';
export const CLEAR_NOTES = 'note/CLEAR_NOTES';
export const SET_CURRENT_NOTE = 'note/SET_CURRENT_NOTE';
export const NOTES_FAILURE = 'note/NOTES_FAILURE';
export const NOTES_REQUEST = 'note/NOTES_REQUEST';
export const GET_NOTES_SUCCESS = 'note/GET_NOTES_SUCCESS';
export const CREATE_NOTE_SUCCESS = 'note/CREATE_NOTE_SUCCESS';
export const UPDATE_NOTE_SUCCESS = 'note/UPDATE_NOTE_SUCCESS';
export const DELETE_NOTE_SUCCESS = 'note/DELETE_NOTE_SUCCESS';

export const clearNotes = () => {
  return {
    type: CLEAR_NOTES
  };
};

export const reset = () => {
  return {
    type: RESET
  };
};

export const notesFailure = () => {
  return {
    type: NOTES_FAILURE
  };
};

export const notesRequest = () => {
  return {
    type: NOTES_REQUEST
  };
};

export const getNotesSuccess = notes => {
  return {
    type: GET_NOTES_SUCCESS,
    payload: {
      notes
    }
  };
};

export const getNotes = () => {
  return dispatch => {
    dispatch(notesRequest());

    axios.get(`${secret.API_URL}/notes`)
      .then(res => {
        dispatch(getNotesSuccess(res.data.notes));
      })
      .catch(() => {
        dispatch(notesFailure());
      });
  }
};

export const createNoteSuccess = note => {
  return {
    type: CREATE_NOTE_SUCCESS,
    payload: {
      note
    }
  };
};

export const updateNoteSuccess = note => {
  return {
    type: UPDATE_NOTE_SUCCESS,
    payload: {
      note
    }
  };
};

export const deleteNoteSuccess = noteId => {
  return {
    type: DELETE_NOTE_SUCCESS,
    payload: {
      noteId
    }
  };
};

export const setCurrentNote = note => {
  return {
    type: SET_CURRENT_NOTE,
    payload: {
      note
    }
  };
};

export const createNote = note => {
  const newNote = note;

  return dispatch => {
    dispatch(notesRequest());

    // Check connection first.
    if (window.navigator.onLine) {
      // Send post request if online.
      axios.post(`${secret.API_URL}/notes`, newNote)
        .then(res => {
          // Determine if the data came from note queue.
          if (newNote._queueId) {
            // Dispatching createNoteSuccess without a param
            // will retain the stored note while offline.
            dispatch(createNoteSuccess());

            // Get the current queue.
            const noteQueue = JSON.parse(localStorage.getItem('noteQueue'));

            // Remove the sent note from the queue.
            localStorage.setItem('noteQueue', JSON.stringify(
              noteQueue.filter(note => (
                note._queueId !== newNote._queueId
              ))
            ));
          } else {
            // This happens if the user submitted while online.
            dispatch(createNoteSuccess(res.data.note));
          }
        })
        .catch(err => {
          dispatch(notesFailure());
          dispatch(setSnackbarMessage(err.response.data.message));
        });
    } else { // This where offline storing happens.
      // Create a new note with a unique queue id.
      const newNote = {
        _queueId: new mongoose.Types.ObjectId(),
        ...note
      };

      // Get current noteQueue
      let noteQueue = JSON.parse(localStorage.getItem('noteQueue'));

      // Create a noteQueue item is not present
      if (!noteQueue) {
        localStorage.setItem('noteQueue', JSON.stringify([]));
      }

      // Reset the noteQueue with the new note added.
      localStorage.setItem('noteQueue', JSON.stringify([
        ...noteQueue,
        newNote
      ]));

      const user = getUser(localStorage.getItem('token'));

      // Create a new note object to store with the
      // additional props needed.
      const noteToStore = {
        ...note,
        author: {
          _id: user.id,
          givenName: user.givenName,
          familyName: user.familyName
        },
        createdAt: Date.now(),
        updatedAt: Date.now()
      };

      // Send the note to the store.
      dispatch(createNoteSuccess(noteToStore));
    }
  }
};

export const updateNote = (id, note) => {
  return dispatch => {
    dispatch(notesRequest());

    axios.patch(`${secret.API_URL}/notes/${id}`, note)
      .then(res => {
        console.log('Returned updated note: ', res.data.note);
        dispatch(updateNoteSuccess(res.data.note));
      })
      .catch(err => {
        dispatch(notesFailure());
        dispatch(setSnackbarMessage(err.response.data.message));
      });
  }
};

export const deleteNote = id => {
  return dispatch => {
    dispatch(notesRequest());

    axios.delete(`${secret.API_URL}/notes/${id}`)
      .then(res => {
        dispatch(deleteNoteSuccess(id));
      })
      .catch(err => {
        dispatch(notesFailure());
        dispatch(setSnackbarMessage(err.response.data.message));
      })
  }
}

// Post queued notes when on online
window.addEventListener('online', () => {
  const noteQueue = JSON.parse(localStorage.getItem('noteQueue'));

  if (noteQueue || noteQueue.length > 0) {
    noteQueue.forEach(note => {
      store.dispatch(createNote(note));
    });
  }
});