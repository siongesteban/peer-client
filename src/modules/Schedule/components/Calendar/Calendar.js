import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

import {
  Row,
  TimeCell,
  AppointmentCell,
  HeaderCell,
  Cell
} from './Table';

import { toTimeString, startOfWeek, addDays } from './helpers';

const body = document.body,
html = document.documentElement;

const docHeight = Math.max(
  body.scrollHeight, body.offsetHeight, 
  html.clientHeight, html.scrollHeight, html.offsetHeight
);

const styles = theme => ({
  // paper: {
  //   padding: 20,
  //   [theme.breakpoints.down('sm')]: {
  //     overflowX: 'scroll',
  //   },
  // },
  calendar: {
    background: '#fff',
    overflowX: 'auto',
    position: 'fixed',
    top: 64,
    right: 0,
    left: 60,
    [theme.breakpoints.down('sm')]: {
      top: 56,
      bottom: 56,
      left: 0,
    },
  },
  calendarBody: {
    paddingTop: 10,
    overflowY: 'auto',
    [theme.breakpoints.down('sm')]: {
      height: docHeight - 210,
    },
    [theme.breakpoints.up('md')]: {
      height: docHeight - 160,
    },
  },
});

export const appointmentPropType = PropTypes.shape({
  description: PropTypes.string.isRequired,
  timeStart: PropTypes.string.isRequired,
  timeEnd: PropTypes.string.isRequired,
  blockSpan: PropTypes.number
});

const appointmentsPropType = PropTypes.arrayOf(appointmentPropType);

class Calendar extends Component {
  static propTypes = {
    appointments: PropTypes.shape({
      monday: appointmentsPropType.isRequired,
      tuesday: appointmentsPropType.isRequired,
      wednesday: appointmentsPropType.isRequired,
      thursday: appointmentsPropType.isRequired,
      friday: appointmentsPropType.isRequired
    }).isRequired
  };
  
  constructor(props) {
  	super(props);
    this.normalizeTimeBlocks(props.appointments);
  }

  componentWillReceiveProps(nextProps) {
  	if (this.props.appointments !== nextProps.appointments) {
    	this.normalizeTimeBlocks(nextProps.appointments);
    }
  }
  
  normalizeTimeBlocks = (appointments) => {
  	const blockSize = 30;
    const timeBlocks = {};
    const eventBlocks = {};
    
    for (let day in appointments) {
      appointments[day].forEach(appointment => {
      	const startTime = appointment.timeStart;
        const endTime = appointment.timeEnd;
        let blockSpan = 0;
        
        if (startTime === '00:00' && endTime === '00:00') {
        	blockSpan = Math.ceil(24 * 60 / blockSize);
        }
        else {
          const startSplit = startTime.split(':');
          let hour = parseInt(startSplit[0], 10);
          let minutes = parseInt(startSplit[1], 10);
          let timeString = appointment.startTime;

          while (timeString !== appointment.timeEnd) {
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

    console.log(docHeight);

    for (let time in this.timeBlocks) {
      const block = this.timeBlocks[time];

      rows.push(
        <Row key={time}>
          <TimeCell className="calendar__cell--time-col">{time}</TimeCell>
          <AppointmentCell className="calendar__cell--time-spacing" />
          <AppointmentCell appointment={block.monday} />
          <AppointmentCell appointment={block.tuesday} />
          <AppointmentCell appointment={block.wednesday} />
          <AppointmentCell appointment={block.thursday} />
          <AppointmentCell appointment={block.friday} />
          <AppointmentCell appointment={block.saturday} />
          <AppointmentCell appointment={block.sunday} />
          {/* <AppointmentCell className="calendar__cell--weekend" />
          <AppointmentCell className="calendar__cell--weekend" /> */}
        </Row>
      );
    }
    
    const monday = startOfWeek(new Date());
  
    return (
      <div className={classNames(classes.calendar, 'calendar')}>
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
      {/*
      672 - 142
      605 - 190
      */}
        <div className={classNames(classes.calendarBody, 'calendar__body')}>
          {rows}
        
          <Row className="calendar__row--deco-last-row">
            <TimeCell className="calendar__cell--time-col">00:00</TimeCell>
            <AppointmentCell />
          </Row>
          
          {/* <CurrentTimeIndicator /> */}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Calendar);