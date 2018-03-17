import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

import CurrentTimeIndicator from './CurrentTimeIndicator';
import {
  Row,
  TimeCell,
  AppointmentCell,
  HeaderCell,
  Cell
} from './Table';

import { toTimeString, startOfWeek, addDays } from '../helpers';

const styles = theme => ({
  paper: {
    padding: 20
  }
});

export const appointmentPropType = PropTypes.shape({
  nombre: PropTypes.string.isRequired,
  hora_inicio: PropTypes.string.isRequired,
  hora_termino: PropTypes.string.isRequired,
  blockSpan: PropTypes.number
});

const appointmentsPropType = PropTypes.arrayOf(appointmentPropType);

class Calendar extends Component {
  static propTypes = {
    appointments: PropTypes.shape({
      lunes: appointmentsPropType.isRequired,
      martes: appointmentsPropType.isRequired,
      miercoles: appointmentsPropType.isRequired,
      jueves: appointmentsPropType.isRequired,
      viernes: appointmentsPropType.isRequired
    }).isRequired
  };
  
  constructor(props) {
  	super(props);
    this.normalizeTimeBlocks(props.appointments);
  }
  
  componentWillReceiveProps(nextProps) {
  	if (this.props.appointments !== nextProps.appointments) {
    	this.normalizeTimeBlock(nextProps.appointments);
    }
  }
  
  normalizeTimeBlocks = (appointments) => {
  	const blockSize = 30;
    const timeBlocks = {};
    const eventBlocks = {};
    
    for (let day in appointments) {
      appointments[day].forEach(appointment => {
      	const startTime = appointment.hora_inicio;
        const endTime = appointment.hora_termino;
      	let blockSpan = 0;
        
        if (startTime === '00:00' && endTime === '00:00') {
        	blockSpan = Math.ceil(24 * 60 / blockSize);
        }
        else {
          const startSplit = startTime.split(':');
          let hour = parseInt(startSplit[0]);
          let minutes = parseInt(startSplit[1]);
          let timeString = appointment.startTime;

          while (timeString !== appointment.hora_termino) {
            blockSpan++;
            minutes += blockSize;

            if (minutes >= 60) {
              minutes = 0;
              hour += 1;
            }

            timeString = toTimeString(hour, minutes);
          }
        }
        
        eventBlocks[startTime] = eventBlocks[startTime] || {};
        eventBlocks[startTime][day] = Object.assign({}, appointment, {
          blockSpan
        });
      });
    }
    
    for (let hour = 0; hour < 24; hour++) {
      for (let minutes = 0; minutes < 60; minutes += blockSize) {
        const timeString = toTimeString(hour, minutes);
      
        timeBlocks[timeString] = eventBlocks[timeString] || {};
      }
    }
    
    this.timeBlocks = timeBlocks;
  };

  render() {
    const { classes } = this.props;
    const rows = [];

    for (let time in this.timeBlocks) {
      const block = this.timeBlocks[time];

      rows.push(
        <Row key={time}>
          <TimeCell className="calendar__cell--time-col">{time}</TimeCell>
          <AppointmentCell className="calendar__cell--time-spacing" />
          <AppointmentCell appointment={block.lunes} />
          <AppointmentCell appointment={block.martes} />
          <AppointmentCell appointment={block.miercoles} />
          <AppointmentCell appointment={block.jueves} />
          <AppointmentCell appointment={block.viernes} />
          <AppointmentCell className="calendar__cell--weekend" />
          <AppointmentCell className="calendar__cell--weekend" />
        </Row>
      );
    }
    
    const monday = startOfWeek(new Date);
  
    return (
      <Paper className={classes.paper}>
        <div className="calendar">
          <Row>
            <HeaderCell className="calendar__cell--time-col" />
            <Cell className="calendar__cell--time-spacing" />
            <HeaderCell day={monday} />
            <HeaderCell day={addDays(monday, 1)} />
            <HeaderCell day={addDays(monday, 2)} />
            <HeaderCell day={addDays(monday, 3)} />
            <HeaderCell day={addDays(monday, 4)} />
            <HeaderCell day={addDays(monday, 5)} />
            <HeaderCell day={addDays(monday, 6)} />
          </Row>
    
          <div className="calendar__body">
            {rows}
          
            <Row className="calendar__row--deco-last-row">
              <TimeCell className="calendar__cell--time-col">00:00</TimeCell>
              <AppointmentCell />
            </Row>
            
            <CurrentTimeIndicator />
          </div>
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(Calendar);