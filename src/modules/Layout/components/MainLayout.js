import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import TopNav from './TopNav';
import SideNav from './SideNav';
import BottomNav from './BottomNav';

const styles = theme => ({
  root: {
    width: '100%',
    overflow: 'hidden',
  },
  appFrame: {
    display: 'flex',
  },
  content: {
    width: '100%',
    flexGrow: 1,
    padding: theme.spacing.unit,
    paddingBottom: 80,
    marginTop: 56,
    [theme.breakpoints.up('md')]: {
      marginLeft: 56,
    },
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },
});

const propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

class MainLayout extends Component {
  render() {
    const { classes, children } = this.props;
    return(
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <TopNav />
          <SideNav />
          <main className={classes.content}>
            {children}
          </main>
          <BottomNav />
        </div>
      </div>
    );
  }
}

MainLayout.propTypes = propTypes;
MainLayout = withStyles(styles)(MainLayout);

export default MainLayout;