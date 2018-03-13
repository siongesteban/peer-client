import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';

const styles = theme => ({
  button: {
    marginBottom: theme.spacing.unit,
  },
  snackbar: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: 56,
      zIndex: 0,
    },
  },
  snackbarContent: {
    width: '100%',
  },
});

const AppUpdateMessage = props => {
  const { classes } = props;

  return(
    <Snackbar
      open
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      onClose={() => null}
      SnackbarContentProps={{
        'aria-describedby': 'snackbar-fab-message-id',
        className: classes.snackbarContent,
      }}
      message={<span id="snackbar-fab-message-id">New update available.</span>}
      action={
        <Button color="primary" size="small" onClick={() => null}>
          Reload
        </Button>
      }
      className={classes.snackbar}
    />
  );
};

AppUpdateMessage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppUpdateMessage);