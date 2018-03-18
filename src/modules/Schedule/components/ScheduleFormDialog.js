import React from 'react';
import PropTypes from 'prop-types';

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

const propTypes = {
  title: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool,
  isLoading: PropTypes.bool,
};

class ScheduleFormDialog extends React.Component {
  render() {
    const {
      title,
      handleClose,
      submitForm,
      isOpen,
      isLoading,
      children
    } = this.props;
  
    return (
      <div>
        <Dialog
          open={isOpen === undefined ? true : isOpen}
          aria-labelledby="form-dialog-title"
          maxWidth="xs"
          onClose={handleClose}
        >
          <DialogTitle id="form-dialog-title">{title}</DialogTitle>
          <DialogContent>
            {children}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={submitForm}
              color="primary"
              disabled={isLoading}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ScheduleFormDialog.propTypes = propTypes;

export default ScheduleFormDialog;