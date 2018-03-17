import React from 'react';
import PropTypes from 'prop-types';

import { appointmentPropType } from './Calendar';

const Appointment = (props) => {
	const { appointment } = props;  
	const wholeDay = appointment.timeStart === '00:00' &&
  	appointment.timeEnd === '00:00';
    
  const time = wholeDay ?
  	'Whole Day' :
    `${appointment.timeStart} - ${appointment.timeEnd}`;

	return (
    <div {...props} className="calendar__appointment">
      <div className="calendar__appointment__time">
        {time}
      </div>
      <div className="calendar__appointment__name">
        {appointment.description}
      </div>
    </div>
	);
}

Appointment.propTypes = {
	appointment: appointmentPropType
};

export default Appointment;