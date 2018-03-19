import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Offline } from 'react-detect-offline';

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
// import AccountCircle from 'material-ui-icons/AccountCircle';
import Menu, { MenuItem } from 'material-ui/Menu';

import { toggleDrawer } from '../LayoutActions';
import { DRAWER_WIDTH } from '../LayoutConstants';
import { logOut } from '../../Auth/AuthActions';

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
  avatar: {
    width: 32,
    height: 32,
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
    width: 40,
    height: 40,
  },
  title: {
    flex: 1,
  },
  offlineIndicator: {
    background: '#fff !important',
    marginRight: theme.spacing.unit,
  },
  offlineIndicatorIcon: {
    marginRight: theme.spacing.unit,
  }
});

const propTypes = {
  classes: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
};

class TopNav extends Component {
  state = {
    anchorEl: null,
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, pageName, isOpen, logOut } = this.props;
    const { anchorEl } = this.state;
    const profileMenuIsOpen = Boolean(anchorEl);

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
          <img
            className={classes.logo}
            src="/static/images/logo/logo-inverse.svg"
            alt="stdnt.io"
          />
          <Typography
            className={classes.title}
            variant="title"
            color="inherit"
          >
             | {`${pageName.charAt(0).toUpperCase()}${pageName.slice(1)}`}
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
          <div>
            <IconButton
              aria-owns={profileMenuIsOpen ? 'menu-appbar' : null}
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit"
            >
              <Avatar
                className={classes.avatar}
                alt="Siong Esteban"
                src="/static/images/siong.jpg"
              />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={profileMenuIsOpen}
              onClose={this.handleClose}
            >
              <MenuItem
                onClick={this.handleClose}
                component={Link}
                to="/me"
              >
                Account
              </MenuItem>
              <MenuItem onClick={logOut}>Log Out</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({
  isOpen: state.layout.drawer.isOpen,
  pageName: state.layout.page.current,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleDrawer,
  logOut,
}, dispatch);

TopNav.propTypes = propTypes;
TopNav = withStyles(styles)(TopNav);
TopNav = connect(mapStateToProps, mapDispatchToProps)(TopNav);

export default TopNav;