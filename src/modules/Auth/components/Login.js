import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

import TabContainer from '../../../components/TabContainer';
import LoginForm from './LoginForm';
import Snackbar from '../../../components/Snackbar';

import { logIn as logInUser, reset } from '../AuthActions';

const styles = theme => ({
  root: {
    height: '100%',
    position: 'fixed',
  },
  button: {
    margin: theme.spacing.unit,
  },
  divider: {
    margin: theme.spacing.unit,
  },
  subheading: {
    fontSize: '.8rem',
  },
  formGroup: {
    marginBottom: 10,
  },
  fontAwesome: {
    marginRight: theme.spacing.unit,
  },
});

const propTypes = {
  classes: PropTypes.object.isRequired,
  logInUser: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

class Login extends Component {
  handleSubmit = values => {
    this.props.logInUser(values);
  }

  render() {
    const { classes, reset } = this.props;
    const { isLoading, isAuthenticated, message } = this.props.auth;
    const { from } = this.props.location.state || { from: { pathname: '/'} };
    const { redirectMessage } = this.props.location;
    const snackbarMessage = message || redirectMessage;

    if (isAuthenticated) {
      return <Redirect to={from} />;
    }

    return(
      <div>
        <TabContainer>
          <LoginForm
            onSubmit={this.handleSubmit}
            isLoading={isLoading}
          />
          <Typography className={classes.subheading}>
            Forgot your password?
          </Typography>
        </TabContainer>
        {
          snackbarMessage &&
          <Snackbar
            message={snackbarMessage}
            reset={reset}
          />
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => bindActionCreators({
  logInUser,
  reset
}, dispatch);

Login.propTypes = propTypes;
Login = withStyles(styles)(Login);
Login = connect(mapStateToProps, mapDispatchToProps)(Login);

export default Login;