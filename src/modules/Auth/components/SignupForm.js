import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

import { withStyles } from 'material-ui/styles';
import { FormGroup } from 'material-ui/Form';
import { CircularProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';

import validateFields from '../../../utils/validate';

const styles = theme => ({
  wrapper: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    position: 'relative',
  },
  button: {
    width: '100%'
  },
  formGroup: {
    marginBottom: 10
  },
  buttonProgress: {
    color: theme.palette.primary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

const validate = values => {
  const fields = [
    'givenName',
    'familyName',
    'email',
    'password'
  ];

  return validateFields(values, fields);
};

class SignupForm extends Component {
  render() {
    const { classes, handleSubmit, isLoading } = this.props;

    return(
      <form onSubmit={handleSubmit}>
        <FormGroup className={classes.formGroup}>
          <Field
            component={TextField}
            fullWidth
            autoFocus
            margin="normal"
            name="givenName"
            label="First Name"
          />
          <Field
            component={TextField}
            fullWidth
            margin="normal"
            name="familyName"
            label="Last Name"
          />
          <Field
            component={TextField}
            fullWidth
            margin="normal"
            name="email"
            label="Email Address"
          />
          <Field
            component={TextField}
            fullWidth
            margin="normal"
            name="password"
            type="password"
            label="Password"
          />
          <div className={classes.wrapper}>
            <Button
              className={classes.button}
              variant="raised"
              color="primary"
              type="submit"
              disabled={isLoading}
            >
              Sign Up
            </Button>
            {
              isLoading &&
              <CircularProgress
                className={classes.buttonProgress}
                size={24}
              />
            }
          </div>
        </FormGroup>
      </form>
    );
  }
}

SignupForm.propTypes = {
  classes: PropTypes.object.isRequired
};
SignupForm = reduxForm({
  form: 'signup',
  validate
})(SignupForm);
SignupForm = withStyles(styles)(SignupForm);

export default SignupForm;