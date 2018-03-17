import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { connect } from 'react-redux'

import { withStyles } from 'material-ui/styles';
import { FormGroup } from 'material-ui/Form';

import validateFields from '../../../utils/validate';

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
  const fields = ['name'];
  
  return validateFields(values, fields);
};

class ScheduleEditForm extends Component {
  render() {
    const { classes, handleSubmit, isLoading } = this.props;
    
    return(
     <form onSubmit={handleSubmit}>
        <FormGroup className={classes.formGroup}>
          <Field
            name="name"
            component={TextField}
            label="Name"
            disabled={isLoading}
            margin="normal"
            fullWidth
          />
        </FormGroup>
      </form>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  initialValues: { name: ownProps.schedule.name },
});

ScheduleEditForm.propTypes = propTypes;
ScheduleEditForm = withStyles(styles)(ScheduleEditForm);
ScheduleEditForm = reduxForm({
  form: 'scheduleEdit',
  validate
})(ScheduleEditForm);
ScheduleEditForm = connect(mapStateToProps)(ScheduleEditForm);

export default ScheduleEditForm;