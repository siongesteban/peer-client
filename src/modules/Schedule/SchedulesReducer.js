import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import {
  RESET,
  SET_CURRENT_SCHEDULE,
  SCHEDULES_FAILURE,
  SCHEDULES_REQUEST,
  GET_SCHEDULES_SUCCESS,
  CREATE_SCHEDULE_SUCCESS,
  UPDATE_SCHEDULE_SUCCESS,
  DELETE_SCHEDULE_SUCCESS,
  SET_CURRENT_APPOINTMENT,
} from './ScheduleActions';
import {
  CREATE_APPOINTMENT_SUCCESS,
  UPDATE_APPOINTMENT_SUCCESS,
  DELETE_APPOINTMENT_SUCCESS,
} from './AppointmentActions';

const initialState = {
  all: [],
  current: {},
  failed: false,
  successful: false,
  isLoading: false,
  isLoaded: false,
};

const persistConfig = {
  key: 'schedules',
  storage: storage,
};

export const schedulesReducer = persistReducer(
  persistConfig,
  (state = initialState, action) => {
    switch (action.type) {
      case RESET:
        return {
          ...state,
          isLoading: false,
          failed: false,
          successful: false,
          isDeleteSuccessful: false,
        };
      case SET_CURRENT_SCHEDULE:
        return {
          ...state,
          current: action.payload.schedule,
        };
      case SCHEDULES_REQUEST:
        return {
          ...state,
          isLoading: true,
          failed: false,
          successful: false,
        };
      case SCHEDULES_FAILURE:
        return {
          ...state,
          failed: true,
          successful: false,
          isLoading: false,
        };
      case GET_SCHEDULES_SUCCESS:
        return {
          ...state,
          all: action.payload.schedules,
          isLoading: false,
          isLoaded: true,
        };
      case CREATE_SCHEDULE_SUCCESS:
        return {
          ...state,
          all: [action.payload.schedule, ...state.all],
          successful: true,
          isLoading: false,
        };
      case UPDATE_SCHEDULE_SUCCESS:
        return {
          ...state,
          all: [
            ...state.all.map(schedule => {
              if (action.payload.schedule._id === schedule._id) {
                return action.payload.schedule;
              }

              return schedule;
            })
          ],
          current: action.payload.schedule,
          successful: true,
          isLoading: false,
        };
      case DELETE_SCHEDULE_SUCCESS:
        return {
          ...state,
          all: state.all.filter(schedule => (
            schedule._id !== action.payload.scheduleId
          )),
          current: {},
          isDeleteSuccessful: true,
          isLoading: false,
        };
      case CREATE_APPOINTMENT_SUCCESS:
        const newAppointment = action.payload.appointment;
        
        return {
          ...state,
          all: [
            ...state.all.map(schedule => {
              if (schedule._id === newAppointment.parentSchedule) {
                schedule.appointments = [
                  ...schedule.appointments,
                  newAppointment
                ];
              }

              return schedule;
            })
          ],
          successful: true,
          isLoading: false,
        };
      case UPDATE_APPOINTMENT_SUCCESS:
        const updatedAppointment = action.payload.appointment;

        return {
          all: [
            ...state.all.map(schedule => {
              if (schedule._id === updatedAppointment.parentSchedule) {
                schedule.appointments = [
                  ...schedule.appointments.map(appointment => {
                    if (appointment._id === updatedAppointment._id) {
                      return updatedAppointment;
                    }

                    return appointment;
                  })
                ]
              }

              return schedule;
            })
          ],
          successful: true,
          isLoading: false,
        }
      default:
        return state;
    }
  }
);

export default schedulesReducer;