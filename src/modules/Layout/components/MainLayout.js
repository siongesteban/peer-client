import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TopNav from './TopNav';
import SideNav from './SideNav';
import BottomNav from './BottomNav';
import Snackbar from '../../../components/Snackbar';

import { setSnackbarMessage, showSnackbar } from '../LayoutActions';

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
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing.unit + 4,
      marginTop: 60,
      marginLeft: 56,
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: 70,
      marginTop: 56,
    },
  },
  snackbar: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: 56,
      boxShadow: theme.shadows[0],
      zIndex: 1,
    },
  },
});

const propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  snackbarMessage: PropTypes.string,
  snackbarIsVisible: PropTypes.bool,
  setSnackbarMessage: PropTypes.func,
  showSnackbar: PropTypes.func,
};

class MainLayout extends Component {
  state = {
    isUpdateAvailable: false,
  };

  componentDidUpdate() {
    if (this.props.snackbarMessage) {
      this.props.showSnackbar();
    }
  }

  handleReload = () => {
    this.setState({ isUpdateAvailable: false });
    window.location.reload();
  }

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
      </div>
    );
  }
}

MainLayout.propTypes = propTypes;

const mapStateToProps = state => ({
  snackbarMessage: state.layout.page.snackbarMessage,
  snackbarIsVisible: state.layout.page.snackbarIsVisible,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setSnackbarMessage,
  showSnackbar
}, dispatch);
MainLayout = withStyles(styles)(MainLayout);
MainLayout = connect(mapStateToProps, mapDispatchToProps)(MainLayout);

export default MainLayout;