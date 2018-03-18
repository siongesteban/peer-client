import axios from 'axios';

import secret from '../../secret';
import { setSnackbarMessage } from '../Layout/LayoutActions';
import {
  SCHEDULES_FAILURE,
  SCHEDULES_REQUEST,
  schedulesFailure,
  schedulesRequest
} from './ScheduleActions';

export const SET_CURRENT_APPOINTMENT = 'schedule/appointment/SET_CURRENT_APPOINTMENT';
export const CREATE_APPOINTMENT_SUCCESS = 'schedule/appointment/CREATE_APPOINTMENT_SUCCESS';
export const UPDATE_APPOINTMENT_SUCCESS = 'schedule/appointment/UPDATE_APPOINTMENT_SUCCESS';
export const DELETE_APPOINTMENT_SUCCESS = 'schedule/appointment/DELETE_APPOINTMENT_SUCCESS';

export const createAppointmentSuccess = appointment => {
  return {
    type: CREATE_APPOINTMENT_SUCCESS,
    payload: {
      appointment
    }
  };
};

export const updateAppointmentSuccess = appointment => {
  return {
    type: UPDATE_APPOINTMENT_SUCCESS,
    payload: {
      appointment
    }
  };
};

export const deleteAppointmentSuccess = appointmentId => {
  return {
    type: DELETE_APPOINTMENT_SUCCESS,
    payload: {
      appointmentId
    }
  };
};

export const setCurrentAppointment = appointment => {
  return {
    type: SET_CURRENT_APPOINTMENT,
    payload: {
      appointment
    }
  };
};

export const createAppointment = newAppointment => {
  return dispatch => {
    dispatch(schedulesRequest());

    axios.post(`${secret.API_URL}/schedules/appointments`, newAppointment)
      .then(res => {
        dispatch(createAppointmentSuccess(res.data.appointment));
      })
      .catch(err => {
        dispatch(schedulesFailure());
        dispatch(setSnackbarMessage(err.response.data.message));
      });
  }
};

export const updateSchedule = (appointmentId, newAppointment) => {
  return dispatch => {
    dispatch(schedulesRequest());

    axios.patch(`${secret.API_URL}/schedules/appointments/${appointmentId}`, newAppointment)
      .then(res => {
        dispatch(updateAppointmentSuccess(res.data.appointment));
      })
      .catch(err => {
        dispatch(schedulesFailure());
        dispatch(setSnackbarMessage(err.response.data.message));
      });
  }
};

export const deleteSchedule = appointmentId => {
  return dispatch => {
    dispatch(schedulesRequest());

    axios.delete(`${secret.API_URL}/schedules/${appointmentId}`)
      .then(res => {
        dispatch(deleteAppointmentSuccess(appointmentId));
      })
      .catch(err => {
        dispatch(schedulesFailure());
        dispatch(setSnackbarMessage(err.response.data.message));
      })
  }
}