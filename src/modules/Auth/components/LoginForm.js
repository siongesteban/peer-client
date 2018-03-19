import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
});

const propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

const validate = values => {
  const fields = ['email', 'password'];
  
  return validateFields(values, fields);
};

class LoginForm extends Component {
  render() {
    const { classes, handleSubmit, isLoading } = this.props;

    return(
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Field
            component={TextField}
            fullWidth
            name="email"
            type="email"
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
              Log In
            </Button>
            {
              isLoading &&
              <CircularProgress
                className={classes.buttonProgress}
                size={24}
              />
            }
          </div>
          <Button
            className={classes.button}
            variant="raised"
            color="default"
            component={Link}
            to="/signup"
          >
            Sign Up
          </Button>
        </FormGroup>
      </form>
    );
  }
}

LoginForm.propTypes = propTypes;
LoginForm = withStyles(styles)(LoginForm);
LoginForm = reduxForm({
  form: 'login',
  validate
})(LoginForm);

export default LoginForm;