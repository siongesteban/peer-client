import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { submit } from 'redux-form'
import objectid from 'objectid';

import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import { withStyles } from 'material-ui/styles';

import ScheduleFormDialog from './ScheduleFormDialog';
import ScheduleCreateForm from './ScheduleCreateForm';
import ScheduleColorPicker from './ScheduleColorPicker';

import { createSchedule, reset } from '../ScheduleActions';

const styles = theme => ({

});

const propTypes = {
  classes: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
  createSchedule: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

class ScheduleCreate extends Component {
  state = {
    scheduleColor: '#757575',
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
    this.props.createSchedule(values);
  }

  handleClose = () => {
    this.props.close();
  }

  render() {
    const { classes, submitForm, isLoading } = this.props;
    const { scheduleColor } = this.state;
    return (
      <ScheduleFormDialog
        handleClose={this.handleClose}
        title={'New Schedule'}
        isLoading={isLoading}
        submitForm={submitForm}
      >
        <ScheduleCreateForm
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

const mapStateToProps = state => ({
  isLoading: state.schedules.isLoading,
  successful: state.schedules.successful,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  close: () => push('/schedules'),
  submitForm: () => submit('scheduleCreate'),
  createSchedule,
  reset,
}, dispatch);

ScheduleCreate.propTypes = propTypes;
ScheduleCreate = withStyles(styles)(ScheduleCreate);
ScheduleCreate = connect(mapStateToProps, mapDispatchToProps)(ScheduleCreate);

export default ScheduleCreate;