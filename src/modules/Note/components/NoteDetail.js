import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import { withStyles } from 'material-ui/styles';

import NoteDialog from './NoteDialog';

import { updateThemeColor } from '../../Layout/LayoutUtils';
import formatDate from '../../../utils/formatDate';
import { reset, setCurrentNote } from '../NoteActions';

const styles = theme => ({
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
  note: PropTypes.object,
  notes: PropTypes.array,
  close: PropTypes.func.isRequired,
  authUserId: PropTypes.string.isRequired,
  setCurrentNote: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

class NoteDetail extends Component {
  // componentWillMount() {
  //   let note = this.props.notes.filter(note => (
  //     note._id === this.props.match.params.id
  //   ))[0];
  //   note = note.isPartOfCollab
  //     ? note.parentNote
  //     : note;

  //   this.props.setCurrentNote(note);
  // }

  componentDidMount() {
    updateThemeColor(this.props.note.color);
  }

  handleClose = () => {
    this.props.close();
    this.props.reset();
  };

  render() {
    const { classes, authUserId, note } = this.props;

    return (
      <div>
        <NoteDialog
          handleClose={this.handleClose}
          noteColor={note.color}
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
        </NoteDialog>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  note: state.notes.current,
  notes: state.notes.all,
  authUserId: state.auth.user.id,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  close: () => push('/notes'),
  setCurrentNote,
  reset,
}, dispatch);

NoteDetail.propTypes = propTypes;
NoteDetail = withStyles(styles)(NoteDetail);
NoteDetail = connect(mapStateToProps, mapDispatchToProps)(NoteDetail);

export default NoteDetail;