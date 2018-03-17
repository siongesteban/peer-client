import axios from 'axios';

import secret from '../../secret';
import { setSnackbarMessage } from '../Layout/LayoutActions';

export const RESET = 'schedule/RESET';
export const SET_CURRENT_SCHEDULE = 'schedule/SET_CURRENT_SCHEDULE';
export const SCHEDULES_FAILURE = 'schedule/SCHEDULES_FAILURE';
export const SCHEDULES_REQUEST = 'schedule/SCHEDULES_REQUEST';
export const GET_SCHEDULES_SUCCESS = 'schedule/GET_SCHEDULES_SUCCESS';
export const CREATE_SCHEDULE_SUCCESS = 'schedule/CREATE_SCHEDULE_SUCCESS';
export const UPDATE_SCHEDULE_SUCCESS = 'schedule/UPDATE_SCHEDULE_SUCCESS';
export const DELETE_SCHEDULE_SUCCESS = 'schedule/DELETE_SCHEDULE_SUCCESS';

export const reset = () => {
  return {
    type: RESET
  };
};

export const schedulesFailure = () => {
  return {
    type: SCHEDULES_FAILURE
  };
};

export const schedulesRequest = () => {
  return {
    type: SCHEDULES_REQUEST
  };
};

export const getSchedulesSuccess = schedules => {
  return {
    type: GET_SCHEDULES_SUCCESS,
    payload: {
      schedules
    }
  };
};

export const getSchedules = () => {
  return dispatch => {
    dispatch(schedulesRequest());

    axios.get(`${secret.API_URL}/schedules`)
      .then(res => {
        dispatch(getSchedulesSuccess(res.data.schedules));
      })
      .catch(() => {
        dispatch(schedulesFailure());
      });
  }
};

export const createScheduleSuccess = schedule => {
  return {
    type: CREATE_SCHEDULE_SUCCESS,
    payload: {
      schedule
    }
  };
};

export const updateScheduleSuccess = schedule => {
  return {
    type: UPDATE_SCHEDULE_SUCCESS,
    payload: {
      schedule
    }
  };
};

export const deleteScheduleSuccess = scheduleId => {
  return {
    type: DELETE_SCHEDULE_SUCCESS,
    payload: {
      scheduleId
    }
  };
};

export const setCurrentSchedule = schedule => {
  return {
    type: SET_CURRENT_SCHEDULE,
    payload: {
      schedule
    }
  };
};

export const createSchedule = newSchedule => {
  return dispatch => {
    dispatch(schedulesRequest());

    axios.post(`${secret.API_URL}/schedules`, newSchedule)
      .then(res => {
        dispatch(createScheduleSuccess(res.data.schedule));
      })
      .catch(err => {
        dispatch(schedulesFailure());
        dispatch(setSnackbarMessage(err.response.data.message));
      });
  }
};

export const updateSchedule = (scheduleId, newSchedule) => {
  return dispatch => {
    dispatch(schedulesRequest());

    axios.patch(`${secret.API_URL}/schedules/${scheduleId}`, newSchedule)
      .then(res => {
        dispatch(updateScheduleSuccess(res.data.schedule));
      })
      .catch(err => {
        dispatch(schedulesFailure());
        dispatch(setSnackbarMessage(err.response.data.message));
      });
  }
};

export const deleteSchedule = scheduleId => {
  return dispatch => {
    dispatch(schedulesRequest());

    axios.delete(`${secret.API_URL}/schedules/${scheduleId}`)
      .then(res => {
        dispatch(deleteScheduleSuccess(scheduleId));
      })
      .catch(err => {
        dispatch(schedulesFailure());
        dispatch(setSnackbarMessage(err.response.data.message));
      })
  }
}