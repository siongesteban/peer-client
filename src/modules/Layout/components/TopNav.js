import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Offline, Online } from 'react-detect-offline';

import { withStyles } from 'material-ui/styles';
import Hidden from 'material-ui/Hidden';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import MenuIcon from 'material-ui-icons/Menu';
import CheckIcon from 'material-ui-icons/CheckCircle';
import ErrorIcon from 'material-ui-icons/Error';
import red from 'material-ui/colors/red';
import orange from 'material-ui/colors/orange';

import { toggleDrawer } from '../LayoutActions';
import { DRAWER_WIDTH } from '../LayoutConstants';

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    paddingRight: 16,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    })
  },
  appBarShift: {
    [theme.breakpoints.up('md')]: {
      marginLeft: DRAWER_WIDTH,
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
    },
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 16,
  },
  logo: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: 12,
    },
    marginRight: 12,
  },
  title: {
    flex: 1,
  },
  offlineIndicator: {
    background: '#fff !important'
  },
  offlineIndicatorIcon: {
    marginRight: theme.spacing.unit,
  }
});

const propTypes = {
  classes: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

class TopNav extends Component {
  render() {
    const { classes, isOpen } = this.props;

    return (
      <AppBar
        className={
          classNames(
            classes.appBar,
            isOpen && classes.appBarShift
          )
        }
      >
        <Toolbar disableGutters>
          <Hidden smDown>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.props.toggleDrawer}
              className={
                classNames(
                  classes.menuButton,
                  isOpen && classes.hide
                )
              }
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Avatar
            className={classes.logo}
            src="/static/images/logo.png"
            alt="stdnt.io"
          />
          <Typography
            className={classes.title}
            variant="title"
            color="inherit"
          >
            stdnt.io
          </Typography>
          <Offline>
            <Button
              className={classes.offlineIndicator}
              size="small"
              color="secondary"
              disabled
              style={{ color: '#EF5350' }}
            >
              <CheckIcon className={classes.offlineIndicatorIcon} /> Offline
            </Button>
          </Offline>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({
  isOpen: state.layout.drawer.isOpen
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleDrawer,
}, dispatch);

TopNav.propTypes = propTypes;
TopNav = withStyles(styles)(TopNav);
TopNav = connect(mapStateToProps, mapDispatchToProps)(TopNav);

export default TopNav;