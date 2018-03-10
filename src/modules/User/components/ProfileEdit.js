import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux'
import { submit } from 'redux-form'

import Button from 'material-ui/Button';

import ResponsiveDialog from '../../../components/ResponsiveDialog';
import ProfileEditForm from './ProfileEditForm';

import { updateUser } from '../UserActions';

const propTypes = {
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
    const { submitForm } = this.props;
    const { isLoading, successful } = this.props.user;

    if (successful) {
      this.handleClose();
    }

    return (
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
        >
          Update Password
        </Button>
      </ResponsiveDialog>
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
ProfileEdit = connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);

export default ProfileEdit;