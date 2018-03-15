import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import { withStyles } from 'material-ui/styles';

import NoteDialog from './NoteDialog';
import NoteEdit from './NoteEdit';

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
  typography: {
    color: '#000',
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
  componentDidMount() {
    updateThemeColor(this.props.note.color);
  }

  handleClose = () => {
    this.props.close();
    this.props.reset();
  };

  handleGoToEdit = () => {
    this.props.goToEdit(this.props.match.params.id);
  }

  render() {
    const { classes, authUserId, note } = this.props;

    return (
      <div>
        <Switch>
          <Route
            path="/notes/:id/edit"
            component={NoteEdit}
          />
          <Route
            path="/notes/:id"
            render={() => (
              <NoteDialog
                handleClose={this.handleClose}
                noteColor={note.color}
              >
                <div onClick={this.handleGoToEdit}>
                  <Typography
                    className={classes.typography}
                    variant="display2"
                    gutterBottom
                  >
                    {note.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    gutterBottom
                  >
                  </Typography>
                  <Typography
                    className={classes.typography}
                    gutterBottom
                    variant={note.content.length <= 90 ? 'display1' : 'subheading'}
                  >
                    {note.content}
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
                    className={classes.date}
                  >
                    {
                      note.createdAt !== note.updatedAt &&
                      `Last Update: ${formatDate(note.updatedAt)}`
                    }
                  </Typography>
                </div>
              </NoteDialog>
            )}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  note: state.notes.current,
  authUserId: state.auth.user.id,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  goToEdit: noteId => push(`/notes/${noteId}/edit`),
  close: () => push('/notes'),
  setCurrentNote,
  reset,
}, dispatch);

NoteDetail.propTypes = propTypes;
NoteDetail = withStyles(styles)(NoteDetail);
NoteDetail = connect(mapStateToProps, mapDispatchToProps)(NoteDetail);

export default NoteDetail;