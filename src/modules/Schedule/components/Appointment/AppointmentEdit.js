import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { submit } from 'redux-form'
import * as moment from 'moment';

import { withStyles } from 'material-ui/styles';

import ScheduleFormDialog from '../ScheduleFormDialog';
import ScheduleColorPicker from '../ScheduleColorPicker';
import AppointmentEditForm from './AppointmentEditForm';
import AppointmentDayPicker from './AppointmentDayPicker';

import { reset } from '../../ScheduleActions';
import { setCurrentAppointment, updateAppointment } from '../../AppointmentActions'
import { parseTime } from '../Calendar/helpers';

const styles = theme => ({

});

const propTypes = {
  classes: PropTypes.object.isRequired,
  setCurrentAppointment: PropTypes.func.isRequired,
  updateAppointment: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
};

class AppointmentEdit extends Component {
  state = {
    appointmentColor: this.props.currentAppointment.color,
    appointmentDay: this.props.currentAppointment.day,
    timeStart: moment(`2018 ${this.props.currentAppointment.timeStart}:00`),
    timeEnd: moment(`2018 ${this.props.currentAppointment.timeEnd}:00`)
  }

  componentDidUpdate() {
    if (this.props.successful) {
      this.props.reset();
      this.handleClose();
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
      ...values,
      day: this.state.appointmentDay,
      timeStart: parseTime(moment(this.state.timeStart)).format('HH:mm'),
      timeEnd: parseTime(moment(this.state.timeEnd)).format('HH:mm'),
      color: this.state.appointmentColor
    }

    this.props.updateAppointment(this.props.currentAppointment._id, values);
  }

  handleClose = () => {
    this.props.setCurrentAppointment();
    this.props.close(this.props.schedule._id);
  }

  render() {
    const { currentAppointment, submitForm, isLoading } = this.props;
    const { appointmentColor, appointmentDay, timeStart, timeEnd } = this.state;
    return (
      <ScheduleFormDialog
        handleClose={this.handleClose}
        title={'Edit Appointment'}
        isLoading={isLoading}
        submitForm={submitForm}
      >
        <AppointmentDayPicker
          currentDay={appointmentDay}
          handleSetAppointmentDay={this.handleSetAppointmentDay}
        />
        <AppointmentEditForm
          currentAppointment={currentAppointment}
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

const mapStateToProps = (state, ownProps) => ({
  schedule: state.schedules.current,
  currentAppointment: state.schedules.current.appointments.filter(
    appointment => appointment._id === ownProps.match.params.appointmentId
  )[0],
  isLoading: state.schedules.isLoading,
  successful: state.schedules.successful,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  close: scheduleId => push(`/schedules/${scheduleId}/appointments`),
  submitForm: () => submit('appointmentEdit'),
  setCurrentAppointment,
  updateAppointment,
  reset
}, dispatch);

AppointmentEdit.propTypes = propTypes;
AppointmentEdit = withStyles(styles)(AppointmentEdit);
AppointmentEdit = connect(mapStateToProps, mapDispatchToProps)(AppointmentEdit);

export default AppointmentEdit;