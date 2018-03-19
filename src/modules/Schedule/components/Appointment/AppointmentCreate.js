import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { submit } from 'redux-form'

import { withStyles } from 'material-ui/styles';

import ScheduleFormDialog from '../ScheduleFormDialog';
import ScheduleColorPicker from '../ScheduleColorPicker';
import AppointmentCreateForm from './AppointmentCreateForm';
import AppointmentDayPicker from './AppointmentDayPicker';

import { reset } from '../../ScheduleActions';
import { createAppointment } from '../../AppointmentActions'
import { parseTime } from '../Calendar/helpers';

const styles = theme => ({

});

const propTypes = {
  classes: PropTypes.object.isRequired,
  createAppointment: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

class AppointmentCreate extends Component {
  state = {
    appointmentColor: '#757575',
    appointmentDay: 'MONDAY',
    timeStart: null,
    timeEnd: null,
  }

  componentDidUpdate() {
    if (this.props.successful) {
      this.props.reset();
      this.props.handleClose();
    }
  }

  handleSetAppointmentColor = color => {
    this.setState({
      appointmentColor: color,
    });
  }

  handleSetAppointmentDay = day => {
    this.setState({
      appointmentDay: day,
    });
  }

  handleTimeStart = date => {
    this.setState({ timeStart: date });
  }

  handleTimeEnd = date => {
    this.setState({ timeEnd: date });
  }

  handleSubmit = values => {
    values = {
      scheduleId: this.props.schedule._id,
      ...values,
      day: this.state.appointmentDay,
      timeStart: parseTime(this.state.timeStart).format('HH:mm'),
      timeEnd: parseTime(this.state.timeEnd).format('HH:mm'),
      color: this.state.appointmentColor
    }

    this.props.createAppointment(values);
  }

  render() {
    const { submitForm, isLoading, isOpen, handleClose } = this.props;
    const { appointmentColor, appointmentDay, timeStart, timeEnd } = this.state;
    return (
      <ScheduleFormDialog
        handleClose={handleClose}
        isOpen={isOpen}
        title={'New Appointment'}
        isLoading={isLoading}
        submitForm={submitForm}
      >
        <AppointmentDayPicker
          currentDay={appointmentDay}
          handleSetAppointmentDay={this.handleSetAppointmentDay}
        />
        <AppointmentCreateForm
          onSubmit={this.handleSubmit}
          isLoading={isLoading}
          timeStart={timeStart}
          timeEnd={timeEnd}
          handleTimeStart={this.handleTimeStart}
          handleTimeEnd={this.handleTimeEnd}
        />
        <ScheduleColorPicker
          currentColor={appointmentColor}
          handleSetScheduleColor={this.handleSetAppointmentColor}
        />
      </ScheduleFormDialog>
    );
  }
}

const mapStateToProps = state => ({
  schedule: state.schedules.current,
  isLoading: state.schedules.isLoading,
  successful: state.schedules.successful,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  close: scheduleId => push(`/schedules/${scheduleId}/appointments`),
  submitForm: () => submit('appointmentCreate'),
  createAppointment,
  reset
}, dispatch);

AppointmentCreate.propTypes = propTypes;
AppointmentCreate = withStyles(styles)(AppointmentCreate);
AppointmentCreate = connect(mapStateToProps, mapDispatchToProps)(AppointmentCreate);

export default AppointmentCreate;