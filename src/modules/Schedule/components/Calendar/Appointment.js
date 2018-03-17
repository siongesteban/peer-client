import React from 'react';
import PropTypes from 'prop-types';

import { appointmentPropType } from './Calendar';

const Appointment = (props) => {
	const { appointment } = props;  
	const wholeDay = appointment.hora_inicio === '00:00' &&
  	appointment.hora_termino === '00:00';
    
  const time = wholeDay ?
  	'Whole Day' :
    `${appointment.hora_inicio} - ${appointment.hora_termino}`;

	return (
    <div {...props} className="calendar__appointment">
      <div className="calendar__appointment__time">
        {time}
      </div>
      <div className="calendar__appointment__name">
        {appointment.nombre}
      </div>
    </div>
	);
}

Appointment.propTypes = {
	appointment: appointmentPropType
};

export default Appointment;