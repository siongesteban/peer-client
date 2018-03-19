import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Color from 'color';

import Appointment from './Appointment';

// import { appointmentPropType } from './Calendar';
import { DAYS_OF_WEEK } from './constants';

export const Row = (props) => (
  <div {...props}
  	className={classNames('calendar__row', props.className)}
  />
);

export const Cell = (props) => (
  <div {...props}
  	className={classNames('calendar__cell', props.className)}
  />
);

export const HeaderCell = (props) => {
	const { day } = props; 
	const isToday = day &&
  	day.toDateString() === new Date().toDateString();

	return (
    <Cell {...props}
      className={
        classNames('calendar__cell--day-of-week', props.className, {
          'calendar__cell--day-of-week--today': isToday 
        })
      }
      >
      {day &&
        <div className="calendar__cell--day-of-week__day">
          {DAYS_OF_WEEK[day.getDay()]}
        </div>
      }
    </Cell>
  );
};

HeaderCell.propTypes = {
	day: PropTypes.instanceOf(Date)
};

export const TimeCell = (props) => (
  <Cell {...props}
  	className={classNames('calendar__cell--time', props.className)}
  />
);

export const AppointmentCell = (props) => {
	const { appointment } = props;
  let appointmentComponent = null;
  
  if (appointment) {
    const { blockSpan } = appointment;
    const height = (100 * blockSpan) + '%';
    const borderPixels = (blockSpan + 1) + 'px';
    const cssHeight = 'calc(' + height + ' + ' + borderPixels + ')';

    const color = Color(appointment.color);
    const darkColor = color.darken(0.1);
    // const lightColor = color.lighten(1);
    const shadowColor = color.lighten(0.5);
    
    appointmentComponent = (
	    <Appointment
        appointment={appointment} 
        style={{
          height: cssHeight,
          background: '#fff',
          color: darkColor,
          border: `${darkColor} solid 1px`,
          borderLeft: `${darkColor} solid 2px`,
          boxShadow: `0 0 10px ${shadowColor}`
        }}
      />
    );
  }

	return (
    <Cell {...props}
    	className={classNames('calendar__cell--appointment', props.className)}
      >
      {appointmentComponent}
    </Cell>
  );
};

// AppointmentCell.propTypes = {
// 	appointment: appointmentPropType
// };