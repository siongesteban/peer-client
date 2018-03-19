import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

import Snackbar from '../../../components/Snackbar';

import { setSnackbarMessage, showSnackbar } from '../LayoutActions';
import { PRIMARY_COLOR } from '../LayoutConstants';

const styles = theme => ({
  container: {
    height: '100%',
    background: PRIMARY_COLOR,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexItem: {
    paddingTop: 0,
    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '50%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '25%',
    },
    [theme.breakpoints.up('xl')]: {
      width: '15%',
    }
  },
  logo: {
    width: 96,
    height: 96,
    display: 'block',
    margin: '30px auto',
  },
});

const propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

class AuthLayout extends Component {
  componentDidUpdate() {
    if (this.props.snackbarMessage) {
      this.props.showSnackbar();
    }
  }

  render() {
    const { classes, children, location } = this.props;

    return(
      <div>
        <div className={classes.container}>
          <div className={classes.flexItem}>
            <img
              className={classes.logo}
              src="/static/images/logo/logo-inverse.svg"
              alt="Peer"
            />
          </div>
          <Card className={classes.flexItem}>
            <CardContent style={{ paddingBottom: 0 }}>
              <Typography
                style={{ color: '#4C3F77'}}
                variant="headline"
              >
                {
                  location.pathname.substr(1) === 'login'
                  ? 'Log In'
                  : 'Sign Up'
                }
              </Typography>
              {children}
            </CardContent>
          </Card>
        </div>
          {
            this.props.snackbarIsVisible &&
            <Snackbar
              className={classes.snackbar}
              isOpen={this.props.snackbarIsVisible}
              message={this.props.snackbarMessage}
              reset={this.props.setSnackbarMessage}
            />
          }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  snackbarMessage: state.layout.page.snackbarMessage,
  snackbarIsVisible: state.layout.page.snackbarIsVisible,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setSnackbarMessage,
  showSnackbar
}, dispatch);

AuthLayout.propTypes = propTypes;
AuthLayout = withStyles(styles)(AuthLayout);
AuthLayout = withRouter(AuthLayout);
AuthLayout = connect(mapStateToProps, mapDispatchToProps)(AuthLayout);

export default AuthLayout;