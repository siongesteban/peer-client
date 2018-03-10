import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Hidden from 'material-ui/Hidden';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';
import { CircularProgress } from 'material-ui/Progress';
import ArrowBackIcon from 'material-ui-icons/ArrowBack';

const styles = theme => ({
  wrapper: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  dialogContent: {
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
    minWidth: 360,
    
    paddingBottom: 0,
  },
  buttonProgress: {
    color: '#fff',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

const propTypes = {
  classes: PropTypes.object.isRequired,
  fullScreen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
};

class ProfileEdit extends React.Component {
  render() {
    const {
      classes,
      fullScreen,
      title,
      children,
      isLoading,
      handleClose,
      submitForm
    } = this.props;

    return (
      <Dialog
        fullScreen={fullScreen}
        open
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Hidden mdUp>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                className={classes.menuButton}
                color="inherit"
                aria-label="Back"
                onClick={handleClose}
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography
                className={classes.flex}
                variant="title"
                color="inherit"
              >
                {title}
              </Typography>
              <div className={classes.wrapper}>
                <Button
                  color="inherit"
                  disabled={isLoading}
                  onClick={submitForm}
                >
                  Save
                </Button>
                {
                  isLoading &&
                  <CircularProgress
                    className={classes.buttonProgress}
                    size={24}
                  />
                }
              </div>
            </Toolbar>
          </AppBar>
        </Hidden>
        <Hidden smDown> 
          <DialogTitle id="responsive-dialog-title">
            {title}
          </DialogTitle>
        </Hidden>
        <DialogContent className={classes.dialogContent}>
          {children}
        </DialogContent>
        <Hidden smDown>
          <DialogActions>
            <Button
              color="primary"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              autoFocus
              color="primary"
              onClick={submitForm}
            >
              Save
            </Button>
          </DialogActions>
        </Hidden>
      </Dialog>
    );
  }
}

ProfileEdit.propTypes = propTypes;
ProfileEdit = withMobileDialog()(ProfileEdit);
ProfileEdit = withStyles(styles)(ProfileEdit);

export default ProfileEdit;