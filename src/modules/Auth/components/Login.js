import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

import TabContainer from '../../../components/TabContainer';
import LoginForm from './LoginForm';

import { logIn as logInUser, reset } from '../AuthActions';
import { showSnackbar } from '../../Layout/LayoutActions';

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
  auth: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

class Login extends Component {
  handleSubmit = values => {
    this.props.logInUser(values);
  }

  render() {
    const { classes } = this.props;
    const { isLoading, isAuthenticated } = this.props.auth;
    const { from } = this.props.location.state || { from: { pathname: '/'} };

    if (isAuthenticated) {
      return <Redirect to={from} />;
    }

    return(
      <LoginForm
        onSubmit={this.handleSubmit}
        isLoading={isLoading}
      />
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  snackbarMessage: state.layout.page.snackbarMessage,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  logInUser,
  reset,
  showSnackbar
}, dispatch);

Login.propTypes = propTypes;
Login = withStyles(styles)(Login);
Login = connect(mapStateToProps, mapDispatchToProps)(Login);

export default Login;