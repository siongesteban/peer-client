import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import { submit } from 'redux-form'

import ResponsiveDialog from '../../../components/ResponsiveDialog';
import PasswordUpdateForm from './PasswordUpdateForm';

import { updateUser, reset } from '../UserActions';

const propTypes = {
  user: PropTypes.object.isRequired,
  goBack: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

class PasswordUpdate extends React.Component {
  componentDidUpdate() {
    if (this.props.user.successful) {
      this.props.handleClose();
    }
  }

  handleSubmit = values => {
    this.props.updateUser(this.props.auth.user.id, values);
  }

  render() {
    const { submitForm, handleClose } = this.props;
    const { isLoading } = this.props.user;

    return (
      <ResponsiveDialog
        title={'Update Password'}
        isLoading={isLoading}
        handleClose={handleClose}
        submitForm={submitForm}
      >
        <PasswordUpdateForm onSubmit={this.handleSubmit} />
      </ResponsiveDialog>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  goBack: () => push('/me/edit-profile'),
  submitForm: () => submit('passwordUpdate'),
  updateUser,
  reset,
}, dispatch);

PasswordUpdate.propTypes = propTypes;
PasswordUpdate = connect(mapStateToProps, mapDispatchToProps)(PasswordUpdate);

export default PasswordUpdate;