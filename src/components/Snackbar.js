import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
  snackbar: {
    zIndex: 9999,
  },
});

const propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,
  reset: PropTypes.func,
};

class AppSnackbar extends Component {
  state = {
    open: true,
  };
  
  handleClose = (event, reason) => {
    
    if (reason === 'clickaway') {
      return;
    }

    if (this.refs.snackbar) {
      this.setState({ open: false });
      this.props.reset();
    }
  };

  render() {
    const { classes, message } = this.props;

    return (
      <div>
        <Snackbar
          className={classes.snackbar}
          ref="snackbar"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.props.isOpen}
          autoHideDuration={6000}
          onClose={this.handleClose}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{message}</span>}
          action={[
            <IconButton
              className={classes.close}
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    );
  }
}

AppSnackbar.propTypes = propTypes;
AppSnackbar = withStyles(styles)(AppSnackbar);

export default AppSnackbar;