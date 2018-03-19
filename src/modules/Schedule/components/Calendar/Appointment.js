import React from 'react';
import { push } from 'react-router-redux';

import { store } from '../../../../store';

// import { appointmentPropType } from './Calendar';

const Appointment = (props) => {
  const { appointment } = props;  

	const wholeDay = appointment.timeStart === '00:00' &&
  	appointment.timeEnd === '00:00';
    
  const time = wholeDay ?
  	'Whole Day' :
    `${appointment.timeStart} - ${appointment.timeEnd}`;

	return (
    <div
      className="calendar__appointment"
      {...props}
      onClick={
        () => store.dispatch(
          push(`/schedules/${appointment.parentSchedule}/appointments/${appointment._id}/edit`)
        )
      }  
    >
      <div className="calendar__appointment__time">
        {time}
      </div>
      <div className="calendar__appointment__name">
        {appointment.description}
      </div>
    </div>
	);
}

// Appointment.propTypes = {
// 	appointment: appointmentPropType
// };

export default Appointment;