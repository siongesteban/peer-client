import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as moment from 'moment';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

import './Calendar/styles.css';
import Schedule from './Calendar/Schedule';
import AppointmentCreate from './Appointment/AppointmentCreate';

import { setCurrentSchedule } from '../ScheduleActions';

const styles = theme => ({
  fab: {
    position: 'fixed',
    [theme.breakpoints.down('sm')]: {
      bottom: theme.spacing.unit * 9,
    },
    [theme.breakpoints.up('md')]: {
      bottom: theme.spacing.unit * 2,
    },
    right: theme.spacing.unit * 2,
    zIndex: 2,
  },
});

const propTypes = {
  classes: PropTypes.object.isRequired,
  schedule: PropTypes.object.isRequired,
};

class ScheduleDetail extends Component {
  state = {
    createIsOpen: false,
  };
  
  componentWillMount() {
    this.props.setCurrentSchedule(this.props.schedule);
  }

  handleOpenCreate = () => {
    this.setState({ createIsOpen: true });
  }

  handleCloseCreate = () => {
    this.setState({ createIsOpen: false });
  }

  render() {
    const { classes, schedule } = this.props;
    let monday = [];
    let tuesday = [];
    let wednesday = [];
    let thursday = [];
    let friday = [];
    let saturday = [];
    let sunday = [];

    schedule.appointments.forEach(appointment => {
      switch (appointment.day) {
        case 'MONDAY': monday.push(appointment); break;
        case 'TUESDAY': tuesday.push(appointment); break;
        case 'WEDNESDAY': wednesday.push(appointment); break;
        case 'THURSDAY': thursday.push(appointment); break;
        case 'FRIDAY': friday.push(appointment); break;
        case 'SATURDAY': saturday.push(appointment); break;
        case 'SUNDAY': sunday.push(appointment); break;
      }
    });

    const appointments = {
      monday, tuesday, wednesday, thursday, friday, saturday, sunday
    };

    return(
      <div>
        <div style={{ padding: 10, marginTop: 5 }}>
          <AppointmentCreate
            isOpen={this.state.createIsOpen}
            handleClose={this.handleCloseCreate}
          />
          <Schedule appointments={appointments} />
          <Button
            className={classes.fab}
            variant="fab"
            color="secondary"
            aria-label="add"
            onClick={this.handleOpenCreate}
          >
            <AddIcon />
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  schedule: state.schedules.all.filter(schedule => {
    if (schedule._id === ownProps.match.params.id) {
      return schedule;
    }
  })[0],
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setCurrentSchedule,
}, dispatch);

ScheduleDetail.propTypes = propTypes;
ScheduleDetail = connect(mapStateToProps, mapDispatchToProps)(ScheduleDetail);
ScheduleDetail = withStyles(styles)(ScheduleDetail);

export default ScheduleDetail;