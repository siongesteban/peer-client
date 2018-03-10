import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

import TabContainer from '../../../components/TabContainer';
import SignupForm from './SignupForm';
import Snackbar from '../../../components/Snackbar';

import { signUp as signUpUser, reset } from '../AuthActions';

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
  auth: PropTypes.object.isRequired,
  signUpUser: PropTypes.func.isRequired,
};

class Signup extends Component {
  submit = values => {
    this.props.signUpUser(values);
  }

  render() {
    const { classes } = this.props;
    const { isLoading, successful, message } = this.props.auth;

    if (successful) {
      return <Redirect to={{
        pathname: '/login',
        redirectMessage: 'You account has been created. Please log in.'
      }} />;
    }

    return(
      <div>
        <TabContainer>
          <SignupForm
            onSubmit={this.submit}
            isLoading={isLoading}
          />
          <Typography className={classes.subheading}>
            Forgot your password?
          </Typography>
        </TabContainer>
        {
          message &&
          <Snackbar
            message={message}
            reset={() => this.props.reset()}
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
  signUpUser,
  reset
}, dispatch);

Signup.propTypes = propTypes;
Signup = withStyles(styles)(Signup);
Signup = connect(mapStateToProps, mapDispatchToProps)(Signup);

export default Signup;