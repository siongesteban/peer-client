import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux'
import { submit } from 'redux-form'

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
  DialogContentText,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';
import { CircularProgress } from 'material-ui/Progress';
import ArrowBackIcon from 'material-ui-icons/ArrowBack';

import ProfileEditForm from './ProfileEditForm';

import { updateUser } from '../UserActions';

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
      paddingTop: 20,
      paddingLeft: 0,
      paddingRight: 0,
    },
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
  user: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  goBack: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
};

class ProfileEdit extends React.Component {
  handleSubmit = values => {
    console.log(values);
    this.props.updateUser(this.props.auth.user.id, values);
  }

  handleClose = () => {
    this.props.goBack();
  };

  render() {
    const { classes, fullScreen } = this.props;
    const { isLoading, successful } = this.props.user;

    if (successful) {
      this.handleClose();
    }

    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          maxWidth="xs"
          open
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <Hidden mdUp>
            <AppBar position="static">
              <Toolbar>
                <IconButton
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="Back"
                  onClick={this.handleClose}
                >
                  <ArrowBackIcon />
                </IconButton>
                <Typography
                  className={classes.flex}
                  variant="title"
                  color="inherit"
                >
                  Edit Profile
                </Typography>
                <div className={classes.wrapper}>
                  <Button
                    color="inherit"
                    disabled={isLoading}
                    onClick={this.props.submitForm}
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
              {"Edit Profile"}
            </DialogTitle>
          </Hidden>
          <DialogContent className={classes.dialogContent}>
            <DialogContentText>
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText>
            <ProfileEditForm onSubmit={this.handleSubmit} />
          </DialogContent>
          <Hidden smDown>
            <DialogActions>
              <Button
                color="primary"
                onClick={this.handleClose}
              >
                Cancel
              </Button>
              <Button
                autoFocus
                color="primary"
                onClick={this.props.submitForm}
              >
                Save
              </Button>
            </DialogActions>
          </Hidden>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  goBack: () => push('/me'),
  submitForm: () => submit('profileEdit'),
  updateUser,
}, dispatch);

ProfileEdit.propTypes = propTypes;
ProfileEdit = withMobileDialog()(ProfileEdit);
ProfileEdit = withStyles(styles)(ProfileEdit);
ProfileEdit = connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);

export default ProfileEdit;