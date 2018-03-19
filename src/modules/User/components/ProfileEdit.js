import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import { submit } from 'redux-form'

import Button from 'material-ui/Button';

import ResponsiveDialog from '../../../components/ResponsiveDialog';
import ProfileEditForm from './ProfileEditForm';
import PasswordUpdate from './PasswordUpdate';

import { updateUser, reset } from '../UserActions';

const propTypes = {
  user: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  goBack: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
};

class ProfileEdit extends React.Component {
  state = {
    passwordDialogisOpen: false,
  };

  componentDidUpdate() {
    if (this.props.user.successful) {
      this.handleClose();
    }
  }

  handleSubmit = values => {
    this.props.updateUser(this.props.auth.user.id, values);
  }

  handleClose = () => {
    this.props.goBack();
  };

  togglePasswordDialog = () => {
    this.setState({
      passwordDialogisOpen: !this.state.passwordDialogisOpen
    });
  }

  render() {
    const { submitForm } = this.props;
    const { isLoading, } = this.props.user;
    const { passwordDialogisOpen } = this.state;

    return (
      <div>
        <ResponsiveDialog
          title={'Edit Profile'}
          isLoading={isLoading}
          handleClose={this.handleClose}
          submitForm={submitForm}
        >
          <ProfileEditForm onSubmit={this.handleSubmit} />
          <Button
            style={{ justifyContent: 'left' }}
            fullWidth
            onClick={this.togglePasswordDialog}
          >
            Update Password
          </Button>
        </ResponsiveDialog>
        {
          passwordDialogisOpen &&
          <PasswordUpdate
            handleClose={this.togglePasswordDialog}
          />
        }
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
  reset,
}, dispatch);

ProfileEdit.propTypes = propTypes;
ProfileEdit = connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);
ProfileEdit = withRouter(ProfileEdit);

export default ProfileEdit;