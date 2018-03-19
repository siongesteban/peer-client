import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

import { withStyles } from 'material-ui/styles';
import { FormGroup } from 'material-ui/Form';
import { CircularProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import validateFields from '../../../utils/validate';

const styles = theme => ({
  wrapper: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    position: 'relative',
  },
  button: {
    width: '100%',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  buttonProgress: {
    color: '#43A047',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  link: {
    color: theme.palette.primary.main,
  }
});

const propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

const validate = values => {
  const fields = ['username', 'password'];
  
  return validateFields(values, fields, 'register');
};

class SignupForm extends Component {
  render() {
    const { classes, handleSubmit, isLoading } = this.props;

    return(
      <form onSubmit={handleSubmit}>
        <FormGroup>
            <Field
              component={TextField}
              fullWidth
              margin="normal"
              name="username"
              label="Username"
              type="text"
              disabled={isLoading}
            />
            <Field
              component={TextField}
              fullWidth
              name="password"
              type="password"
              label="Password"
              disabled={isLoading}
            />
          <div className={classes.wrapper}>
            <Button
              style={{
                background: !isLoading ? '#43A047' : '#E0E0E0',
                color: !isLoading ? '#fff' : '#A6A6A6'
              }}
              className={classes.button}
              variant="raised"
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
          <Typography variant="caption" gutterBottom align="center">
            Already have an account? &nbsp;
            <Link className={classes.link} to="/login">
              Log In
            </Link>
          </Typography>
        </FormGroup>
      </form>
    );
  }
}

SignupForm.propTypes = propTypes;
SignupForm = withStyles(styles)(SignupForm);
SignupForm = reduxForm({
  form: 'signup',
  validate
})(SignupForm);

export default SignupForm;