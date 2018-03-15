import axios from 'axios';

import secret from '../../secret';

export const NOTES_FAILURE = 'note/NOTES_FAILURE';
export const NOTES_REQUEST = 'note/NOTES_REQUEST';
export const GET_NOTES_SUCCESS = 'note/GET_NOTES_SUCCESS';
export const CREATE_NOTE_SUCCESS = 'note/CREATE_NOTE_SUCCESS';

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
}

export const createNote = note => {
  return dispatch => {
    dispatch(notesRequest());

    axios.post(`${secret.API_URL}/notes`, note)
      .then(res => {
        dispatch(createNoteSuccess(res.data.note));
      })
      .catch(() => {
        dispatch(notesFailure());
      });
  }
}