import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { submit } from 'redux-form'

import { withStyles } from 'material-ui/styles';

import ScheduleFormDialog from './ScheduleFormDialog';
import ScheduleEditForm from './ScheduleEditForm';
import ScheduleColorPicker from './ScheduleColorPicker';

import { updateSchedule, reset } from '../ScheduleActions';

const styles = theme => ({

});

const propTypes = {
  classes: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
  updateSchedule: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

class ScheduleEdit extends Component {
  state = {
    scheduleColor: this.props.schedule.color,
  }

  componentDidUpdate() {
    if (this.props.successful) {
      this.props.reset();
      this.handleClose();
    }
  }

  handleSetScheduleColor = color => {
    this.setState({
      scheduleColor: color,
    });
  }

  handleSubmit = values => {
    values = {
      ...values,
      color: this.state.scheduleColor
    }
    this.props.updateSchedule(this.props.schedule._id, values);
  }

  handleClose = () => {
    this.props.close();
  }

  render() {
    const { schedule, submitForm, isLoading } = this.props;
    const { scheduleColor } = this.state;
    return (
      <ScheduleFormDialog
        handleClose={this.handleClose}
        title={'Edit Schedule'}
        isLoading={isLoading}
        submitForm={submitForm}
      >
        <ScheduleEditForm
          schedule={schedule}
          onSubmit={this.handleSubmit}
          isLoading={isLoading}
        />
        <ScheduleColorPicker
          currentColor={scheduleColor}
          handleSetScheduleColor={this.handleSetScheduleColor}
        />
      </ScheduleFormDialog>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  schedule: state.schedules.all.filter(schedule => (
    schedule._id === ownProps.match.params.id
  ))[0],
  isLoading: state.schedules.isLoading,
  successful: state.schedules.successful,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  close: () => push('/schedules'),
  submitForm: () => submit('scheduleEdit'),
  updateSchedule,
  reset,
}, dispatch);

ScheduleEdit.propTypes = propTypes;
ScheduleEdit = withStyles(styles)(ScheduleEdit);
ScheduleEdit = connect(mapStateToProps, mapDispatchToProps)(ScheduleEdit);

export default ScheduleEdit;