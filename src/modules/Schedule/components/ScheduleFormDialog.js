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
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool,
};

class ScheduleFormDialog extends React.Component {
  render() {
    const {
      classes,
      title,
      handleClose,
      submitForm,
      isLoading,
      children
    } = this.props;
  
    return (
      <div>
        <Dialog
          open
          aria-labelledby="form-dialog-title"
          maxWidth="xs"
          onClose={handleClose}
        >
          <DialogTitle id="form-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Create a new schedule. You may also want to provide a little
              description and a color to make your schedule unique.
            </DialogContentText>
            {children}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
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