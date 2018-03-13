import React, { Component } from 'react';
import {
  Switch,
  Route,
  Redirect,
  withRouter
} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Reboot from 'material-ui/Reboot';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Button from 'material-ui/Button';

import MainLayout from './components/MainLayout';
import AuthLayout from './components/AuthLayout';
import Home from '../../views/Home';
import Note from '../Note';
import Schedules from '../../views/Schedules';
import Discussions from '../../views/Discussions';
import User from '../User';
import Login from '../Auth/components/Login';
import Signup from '../Auth/components/Signup';

import { setSnackbarMessage } from './LayoutActions';

var customTheme = createMuiTheme({
  palette: {
    primary: {
      light: '#7a6aa6',
      main: '#4c3f77',
      dark: '#20184b',
      contrastText: '#fff',
    },
    secondary: {
      light: '#50afc8',
      main: '#007f97',
      dark: '#005269',
      contrastText: '#fff',
    }
  },
});

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route {...rest} render={props => (
    <Layout>
      <Component {...props} />
    </Layout>
  )} />
);

class PrivateAppRoute extends Component {
  render() {
    const {
      setSnackbarMessage,
      component: Component,
      layout: Layout,
      ...rest
    } = this.props;

    if (!localStorage.token) {
      setSnackbarMessage('Please log in.');
    }

    return(
      <Route {...rest} render={props => (
        localStorage.token
        ? <Layout>
            <Component {...props} />
          </Layout>
        : <Redirect
            to={{
              pathname: '/login',
              state: {
                from: props.location
              }
            }}
          />
      )} />
    );
  }
}

const mapDispatchToPropss = dispatch => bindActionCreators({
  setSnackbarMessage
}, dispatch);

PrivateAppRoute = connect(null, mapDispatchToPropss)(PrivateAppRoute);

class Layout extends Component {
  render() {
    return (
      <MuiThemeProvider theme={customTheme}>
        <Reboot />
        <Switch>
          <PrivateAppRoute
            exact
            path="/"
            layout={MainLayout}
            component={Home}
          />
          <PrivateAppRoute
            path="/notes"
            layout={MainLayout}
            component={Note}
          />
          <PrivateAppRoute
            path="/schedules"
            layout={MainLayout}
            component={Schedules}
          />
          <PrivateAppRoute
            path="/discussions"
            layout={MainLayout}
            component={Discussions}
          />
          <PrivateAppRoute
            path="/me"
            layout={MainLayout}
            component={User}
          />

          <AppRoute
            path="/login"
            layout={AuthLayout}
            component={Login}
          />
          <AppRoute
            path="/signup"
            layout={AuthLayout}
            component={Signup}
          />

          <Route path="*" render={() => <p>You lost, nigga?</p>} />
        </Switch>
      </MuiThemeProvider>
    );
  }
}

Layout = withRouter(Layout);

export default Layout;