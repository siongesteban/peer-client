import axios from 'axios';

import { PRIMARY_COLOR } from '../Layout/LayoutConstants';
import { updateThemeColor } from '../Layout/LayoutUtils';
import secret from '../../secret';

import {
  TOGGLE_NOTE,
  GET_NOTES_FAILED,
  GET_NOTES_LOADING,
  GET_NOTES_SUCCESS,
  GET_NOTE_BY_ID_FAILED,
  GET_NOTE_BY_ID_LOADING,
  GET_NOTE_BY_ID_SUCCESS } from './NoteActionTypes';

export const toggleNote = (noteColor) => {
  let themeColor = PRIMARY_COLOR;
  if (noteColor) {
    // themeColor = Color(noteColor).darken(0.7);
    themeColor = noteColor;
  } 
  updateThemeColor(themeColor);

  return dispatch => {
    dispatch({
      type: TOGGLE_NOTE
    })
  }
}

export const getNotesFailed = bool => {
  return {
    type: GET_NOTES_FAILED,
    failed: bool
  };
}

export const getNotesLoading = bool => {
  return {
    type: GET_NOTES_LOADING,
    isLoading: bool
  };
}

export const getNotesSuccess = notes => {
  return {
    type: GET_NOTES_SUCCESS,
    notes
  };
}

export const getNotes = () => {
  return dispatch => {
    dispatch(getNotesLoading(true));

    axios.get(`${secret.API_URL}/notes`)
      .then(res => {
        dispatch(getNotesLoading(false));
        dispatch(getNotesSuccess(res.data.notes));
      })
      .catch(() => {
        dispatch(getNotesFailed(true));
      });
  }
}

export const getNoteByIdFailed = bool => {
  return {
    type: GET_NOTE_BY_ID_FAILED,
    failed: bool
  };
}

export const getNoteByIdLoading = bool => {
  return {
    type: GET_NOTE_BY_ID_LOADING,
    isLoading: bool
  };
}

export const getNoteByIdSuccess = note => {
  return {
    type: GET_NOTE_BY_ID_SUCCESS,
    note
  };
}

export const getNoteById = (id) => {
  return dispatch => {
    dispatch(getNoteByIdLoading(true));

    axios.get(`${secret.API_URL}/notes/${id}`)
      .then(res => {
        dispatch(getNoteByIdLoading(false));
        dispatch(getNoteByIdSuccess(res.data.note));
      })
      .catch(() => {
        dispatch(getNoteByIdFailed(true));
      });
  }
}