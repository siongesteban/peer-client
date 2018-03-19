import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Card, { CardContent } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';

import { PRIMARY_COLOR } from '../LayoutConstants';

const styles = theme => ({
  root: {
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
  state = {
    value: this.props.location.pathname === '/login' ? 0 : 1,
  };

  switchTab = (e, value) => {
    this.setState({ value });
  }

  render() {
    const { classes, children } = this.props;
    const { value } = this.state;

    return(
      <div className={classes.root}>
        <div className={classes.flexItem}>
          <img
            className={classes.logo}
            src="/static/images/logo/logo-inverse.svg"
          />
        </div>
        <Card className={classes.flexItem}>
          <CardContent>
            {children}
          </CardContent>
        </Card>
      </div>
    );
  }
}

AuthLayout.propTypes = propTypes;
AuthLayout = withStyles(styles)(AuthLayout);
AuthLayout = withRouter(AuthLayout);

export default AuthLayout;