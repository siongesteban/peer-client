import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import truncate from 'truncate';

import { withStyles } from 'material-ui/styles';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import ButtonBase from 'material-ui/ButtonBase';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import MoreVertIcon from 'material-ui-icons/MoreVert';

import formatDate from '../../../utils/formatDate';
import { setCurrentNote } from '../NoteActions';

const styles = theme => ({
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  buttonBase: {
    width: 'inherit'
  },
  card: {
    width: 'inherit'
  },
  actions: {
    display: 'flex',
  },
  pos: {
    marginBottom: 12,
  },
  typography: {
    textAlign: 'left',
    color: '#000',
  },
  date: {
    color: 'rgba(0, 0, 0, 0.5)',
    marginBottom: 20,
  },
});

const propTypes = {
  classes: PropTypes.object.isRequired,
  note: PropTypes.object.isRequired,
  setCurrentNote: PropTypes.func.isRequired,
  goToDetail: PropTypes.func.isRequired,
};

class Note extends Component {
  handleSetNote = () => {
    this.props.setCurrentNote(this.props.note);
    this.props.goToDetail(this.props.note._id);
  }

  render() {
    const { classes } = this.props;
    const note = this.props.note.isPartOfCollab
      ? this.props.note.parentNote
      : this.props.note;

    return (
      <Card
        style={{ backgroundColor: note.color }} 
        className={classes.card}
      >
        <CardContent onClick={this.handleSetNote}>
          <Typography
            className={classes.typography}
            variant="headline"
            component="h2"
          >
            {note.title}
          </Typography>
          <Typography className={classNames(classes.typography, classes.date)}>
            {
              note.createdAt === note.updatedAt
              ? 'Date Created: '
              : 'Last Update: '
            }
            {formatDate(note.updatedAt)}
          </Typography>
          <Typography
            className={classes.typography}
            variant={note.content.length <= 90 ? 'display1' : 'subheading'}
          >
            {note.content.length > 230 ? truncate(note.content, 230) : note.content}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton style={{ marginLeft: 'auto' }}>
            <MoreVertIcon />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  setCurrentNote,
  goToDetail: noteId => push(`/notes/${noteId}`),
}, dispatch);

Note.propTypes = propTypes;
Note = withStyles(styles)(Note);
Note = connect(null, mapDispatchToProps)(Note);

export default Note;