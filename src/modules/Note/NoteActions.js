import axios from 'axios';

import secret from '../../secret';
import { getUser } from '../Auth/AuthUtils';

export const GET_NOTES_FAILURE = 'note/GET_NOTES_FAILURE';
export const GET_NOTES_REQUEST = 'note/GET_NOTES_REQUEST';
export const GET_NOTES_SUCCESS = 'note/GET_NOTES_SUCCESS';

export const getNotesFailure = () => {
  return {
    type: GET_NOTES_FAILURE
  };
};

export const getNotesRequest = () => {
  return {
    type: GET_NOTES_REQUEST
  };
};

export const getNotesSuccess = notes => {
  return {
    type: GET_NOTES_SUCCESS,
    notes
  };
};

export const getNotes = () => {
  return dispatch => {
    dispatch(getNotesRequest());

    axios.get(`${secret.API_URL}/notes`)
      .then(res => {
        const notes = res.data.notes.filter(note => (
          note._id === getUser().id
        ));
        
        dispatch(getNotesSuccess(res.data.notes));
      })
      .catch(() => {
        dispatch(getNotesFailure());
      });
  }
};