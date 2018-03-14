import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Hidden from 'material-ui/Hidden';
import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import ArrowBackIcon from 'material-ui-icons/ArrowBack';
import Dialog, {
  DialogContent,
  withMobileDialog,
} from 'material-ui/Dialog';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import { withStyles } from 'material-ui/styles';

import { updateThemeColor } from '../../Layout/LayoutUtils';
import formatDate from '../../../utils/formatDate';

const styles = theme => ({
  appBar: {
    boxShadow: theme.shadows[1]
  },
  menuButton: {
    marginLeft: -12,
    color: '#000',
  },
  dialogContent: {
    paddingTop: 20,
  },
  divider: {
    marginTop: 20,
    marginBottom: 20,
  },
  date: {
    color: 'rgba(0, 0, 0, 0.5)',
  },
});

const propTypes = {
  classes: PropTypes.object.isRequired,
  note: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
  authUserId: PropTypes.string.isRequired,
};

class NoteDetail extends Component {
  componentDidMount() {
    updateThemeColor(this.props.note.color);
  }

  handleClose = () => {
    this.props.close();
  };

  render() {
    const { fullScreen, classes, authUserId } = this.props;
    const note = this.props.note.isPartOfCollab
      ? this.props.note.parentNote
      : this.props.note;

    return (
      <Dialog
        fullScreen={fullScreen}
        open
        onClose={this.handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Hidden mdUp>
          <AppBar
            className={classes.appBar}
            style={{ background: note.color || '#fff' }}
            position="static"
          >
            <Toolbar>
              <IconButton
                className={classes.menuButton}
                aria-label="Menu"
                onClick={this.handleClose}
              >
                <ArrowBackIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </Hidden>
        <DialogContent
          className={classes.dialogContent}
          style={{ background: note.color }}
        >
          <Typography
            variant="display2"
            gutterBottom
          >
            {note.title}
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
          >
            {
              this.props.note.isPartOfCollab &&
              <Typography
                variant="body2"
                gutterBottom
              >
                {`Shared by ${note.author.givenName}`}
              </Typography>
            }
          </Typography>
          <Typography
            gutterBottom
            className={classes.date}
          >
            {
              `Date Created: ${formatDate(note.createdAt)}`
            }
          </Typography>
          <Typography
            gutterBottom
            className={classes.date}
          >
            {
              `Last Update: ${formatDate(note.updatedAt)}`
            }
          </Typography>
          <Typography gutterBottom>
            {note.content}
          </Typography>
          {
            note.collabs.length > 0 &&
            note.collabs.map(collab => (
              <div key={collab._id}>
                <Divider
                  className={classes.divider}
                />
                <Typography
                  variant="body2"
                  gutterBottom
                >
                  {
                    collab.author !== authUserId
                    ? `${collab.author.givenName} ${collab.author.familyName}`
                    : 'You'
                  }
                </Typography>
                <Typography className={classes.date}>
                  Date Added: {formatDate(collab.createdAt)}
                </Typography>
                <Typography
                  gutterBottom
                  className={classes.date}
                >
                  {
                    collab.content &&
                    `Last Update: ${formatDate(collab.updatedAt)}`
                  }
                </Typography>
                {
                  collab.content
                  ? <Typography gutterBottom>
                      {collab.content}
                    </Typography>
                  : <Typography gutterBottom>
                      No content
                    </Typography>
                }
              </div>
            ))
          }
        </DialogContent>
      </Dialog>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  note: state.notes.all.filter(note => note._id === ownProps.match.params.id)[0],
  authUserId: state.auth.user.id,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  close: () => push('/notes'),
}, dispatch);

NoteDetail.propTypes = propTypes;
NoteDetail = withMobileDialog()(NoteDetail);
NoteDetail = withStyles(styles)(NoteDetail);
NoteDetail = connect(mapStateToProps, mapDispatchToProps)(NoteDetail);

export default NoteDetail;