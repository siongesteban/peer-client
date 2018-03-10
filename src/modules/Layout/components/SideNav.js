import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import Hidden from 'material-ui/Hidden';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import HomeIcon from 'material-ui-icons/Home';
import NoteIcon from 'material-ui-icons/NoteAdd';
import ScheduleIcon from 'material-ui-icons/DateRange';
import DiscussionIcon from 'material-ui-icons/Chat';
import UserIcon from 'material-ui-icons/AccountCircle';

import { toggleDrawer } from '../LayoutActions';
import { DRAWER_WIDTH } from '../LayoutConstants';

const styles = theme => ({
  drawerPaper: {
    position: 'fixed',
    height: '100%',
    width: DRAWER_WIDTH,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    width: 60,
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerInner: {
    width: DRAWER_WIDTH,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  }
});

const propTypes = {
  classes: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

class SideNav extends Component {
  render() {
    const { classes, isOpen } = this.props;
    const navItems = [
      {
        label: 'Home',
        icon: <HomeIcon />,
        path: '/'
      },
      {
        label: 'Notes',
        icon: <NoteIcon />,
        path: '/notes'
      },
      {
        label: 'Schedules',
        icon: <ScheduleIcon />,
        path: '/schedules'
      },
      {
        label: 'Discussions',
        icon: <DiscussionIcon />,
        path: '/discussions'
      },
      {
        label: 'Me',
        icon: <UserIcon />,
        path: '/me'
      }
    ];

    return (
      <Hidden smDown>
        <Drawer
          classes={{
            paper: classNames(classes.drawerPaper, !isOpen && classes.drawerPaperClose),
          }}
          variant="permanent"
          open={isOpen}
        >
          <div className={classes.drawerInner}>
            <div className={classes.drawerHeader}>
              <IconButton onClick={this.props.toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <List>
              {
                navItems.map(item => (
                  <ListItem
                    key={item.label}
                    button
                    component={Link}
                    to={item.path}
                  >
                    <ListItemIcon>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItem>
                ))
              }
            </List>
          </div>
        </Drawer>
      </Hidden>
    );
  }
}

const mapStateToProps = state => ({
  isOpen: state.layout.drawer.isOpen,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleDrawer
}, dispatch);

SideNav.propTypes = propTypes;
SideNav = withStyles(styles)(SideNav);
SideNav = connect(mapStateToProps, mapDispatchToProps)(SideNav);

export default SideNav;