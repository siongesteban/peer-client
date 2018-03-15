import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Hidden from 'material-ui/Hidden';
import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import ArrowBackIcon from 'material-ui-icons/ArrowBack';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Dialog, {
  DialogContent,
  DialogActions,
  withMobileDialog,
} from 'material-ui/Dialog';
import { withStyles } from 'material-ui/styles';

import { updateThemeColor } from '../../Layout/LayoutUtils';

const styles = theme => ({
  appBar: {
    boxShadow: theme.shadows[1],
    color: '#000',
  },
  menuButton: {
    marginLeft: -12,
    color: '#000',
  },
  dialogContent: {
    paddingTop: 20,
  },
  dialogActions: {
    margin: 0,
  },
  dialogActionButtons: {
    margin: theme.spacing.unit,
  },
  divider: {
    marginTop: 20,
    marginBottom: 20,
  },
  date: {
    color: 'rgba(0, 0, 0, 0.5)',
  },
  flex: {
    flex: 1,
  },
});

const propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  fullScreen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  noteColor: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

class NoteDialog extends Component {
  componentDidMount() {
    updateThemeColor(this.props.noteColor);
  }

  render() {
    const {
      classes,
      title,
      fullScreen,
      handleClose,
      noteColor,
      children
    } = this.props;

    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open
          fullWidth
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <Hidden mdUp>
            <AppBar
              className={classes.appBar}
              style={{ background: noteColor || '#fff' }}
              position="static"
            >
              <Toolbar>
                <IconButton
                  className={classes.menuButton}
                  aria-label="Menu"
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
              </Toolbar>
            </AppBar>
          </Hidden>
          <DialogContent
            className={classes.dialogContent}
            style={{ background: noteColor }}
          >
            {children}
          </DialogContent>
          <DialogActions
            className={classes.dialogActions}
            style={{ background: noteColor }}
          >
            <Hidden smDown>
              <Button
                className={classes.dialogActionButtons}
                onClick={handleClose}
              >
                Close
              </Button>
            </Hidden>
            <Button
              className={classes.dialogActionButtons}
              onClick={handleClose}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

NoteDialog.propTypes = propTypes;
NoteDialog = withMobileDialog()(NoteDialog);
NoteDialog = withStyles(styles)(NoteDialog);

export default NoteDialog;