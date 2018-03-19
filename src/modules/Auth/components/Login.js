import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import LoginForm from './LoginForm';

import { logIn as logInUser, reset } from '../AuthActions';
import { showSnackbar } from '../../Layout/LayoutActions';

const propTypes = {
  logInUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

class Login extends Component {
  handleSubmit = values => {
    this.props.logInUser(values);
  }

  render() {
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
Login = connect(mapStateToProps, mapDispatchToProps)(Login);

export default Login;