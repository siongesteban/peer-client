import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SignupForm from './SignupForm';

import { signUp as signUpUser, reset } from '../AuthActions';

const propTypes = {
  auth: PropTypes.object.isRequired,
  signUpUser: PropTypes.func.isRequired,
};

class Signup extends Component {
  submit = values => {
    this.props.signUpUser(values);
  }

  render() {
    const { isLoading, successful } = this.props.auth;

    if (successful) {
      return <Redirect to={{
        pathname: '/login'
      }} />;
    }

    return(
      <SignupForm
        onSubmit={this.submit}
        isLoading={isLoading}
      />
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => bindActionCreators({
  signUpUser,
  reset
}, dispatch);

Signup.propTypes = propTypes;
Signup = connect(mapStateToProps, mapDispatchToProps)(Signup);

export default Signup;