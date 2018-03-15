import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

const ConfirmationDialog = props => (
  <div>
    <Dialog
      open={props.isOpen}
      onClose={props.toggleDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={props.toggleDialog}
          color="primary"
        >
          {props.buttons.neg}
        </Button>
        <Button
          onClick={props.handlePos}
          color="primary"
          disabled={props.isLoading}
        >
          {props.buttons.pos}
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);

export default ConfirmationDialog;
