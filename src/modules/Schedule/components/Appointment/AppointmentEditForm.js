import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import moment from 'moment';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import TimePicker from 'material-ui-pickers/TimePicker';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import { FormGroup } from 'material-ui/Form';

import validateFields from '../../../../utils/validate';

const styles = theme => ({
  wrapper: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    position: 'relative',
  },
  button: {
    width: '100%',
  },
  buttonProgress: {
    color: theme.palette.primary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  list: {
    [theme.breakpoints.up('md')]: {
      padding: 0
    }
  }
});

const propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

const validate = values => {
  const fields = ['description'];
  
  return validateFields(values, fields);
};

class AppointmentEditForm extends Component {
  render() {
    const {
      classes,
      handleSubmit,
      isLoading,
      timeStart,
      timeEnd,
      handleTimeStart,
      handleTimeEnd
    } = this.props;
    
    return(
     <form onSubmit={handleSubmit}>
        <FormGroup className={classes.formGroup}>
          <Field
            name="description"
            component={TextField}
            label="Description"
            disabled={isLoading}
            margin="normal"
            fullWidth
          />
        </FormGroup>
        <FormGroup className={classes.formGroup}>
          <MuiPickersUtilsProvider utils={MomentUtils} moment={moment}>
            <Grid container>
              <Grid item xs={6}>
                <TimePicker
                  name="timeStart"
                  label="Time Start"
                  ampm={false}
                  value={timeStart}
                  onChange={handleTimeStart}
                />
              </Grid>
              <Grid item xs={6}>
                <TimePicker
                  name="timeEnd"
                  label="Time End"
                  ampm={false}
                  value={timeEnd}
                  onChange={handleTimeEnd}
                />
              </Grid>
            </Grid>
          </MuiPickersUtilsProvider>
        </FormGroup>
      </form>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  initialValues: {
    description: ownProps.currentAppointment.description
  }
});

AppointmentEditForm.propTypes = propTypes;
AppointmentEditForm = withStyles(styles)(AppointmentEditForm);
AppointmentEditForm = reduxForm({
  form: 'appointmentEdit',
  validate
})(AppointmentEditForm);
AppointmentEditForm = connect(mapStateToProps)(AppointmentEditForm);

export default AppointmentEditForm;