import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import Hidden from 'material-ui/Hidden';
import BottomNavigation, { 
  BottomNavigationAction
} from 'material-ui/BottomNavigation';
import HomeIcon from 'material-ui-icons/Home';
import NoteIcon from 'material-ui-icons/NoteAdd';
import ScheduleIcon from 'material-ui-icons/DateRange';
import DiscussionIcon from 'material-ui-icons/Chat';
import UserIcon from 'material-ui-icons/AccountCircle';

const styles = theme => ({
  bottomNav: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    boxShadow: theme.shadows[1],
  },
  bottomNavAction: {
    [theme.breakpoints.down('sm')]: {
      minWidth: 0,
      maxWidth: 80,
    },
  }
});

const propTypes = {
  classes: PropTypes.object.isRequired,
  page: PropTypes.object.isRequired,
};

class BottomNav extends Component {
  render() {
    const { classes, page } = this.props;
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
      <Hidden mdUp>
        <BottomNavigation
          className={classes.bottomNav}
          showLabels
          value={page.current}
        >
          {
            navItems.map(item => (
              <BottomNavigationAction className={classes.bottomNavAction}
                key={item.label}
                label={item.label}
                value={item.label.toLowerCase()}
                icon={item.icon}
                component={Link}
                to={item.path}
              />
            ))
          }
        </BottomNavigation>
      </Hidden>
    );
  }
}

const mapStateToProps = state => ({
  page: state.layout.page,
});

BottomNav.propTypes = propTypes;
BottomNav = withStyles(styles)(BottomNav);
BottomNav = connect(mapStateToProps)(BottomNav);

export default BottomNav;