import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Card from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';

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
      <Grid
        className={classes.root}
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid
          item
          xs={11}
          sm={6}
          lg={4}
          xl={2}
        >
          <Card>
            <AppBar position="static">
              <Tabs
                fullWidth
                value={value}
                onChange={this.switchTab}
              >
                <Tab
                  label="Log In"
                  component={Link}
                  to="/login"
                />
                <Tab
                  label="Sign Up"
                  component={Link}
                  to="/signup"
                />
              </Tabs>
            </AppBar>
            {children}
          </Card>
        </Grid>
      </Grid>
    );
  }
}

AuthLayout.propTypes = propTypes;
AuthLayout = withStyles(styles)(AuthLayout);
AuthLayout = withRouter(AuthLayout);

export default AuthLayout;