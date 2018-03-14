import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import TextTruncate from 'react-text-truncate';

import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import ButtonBase from 'material-ui/ButtonBase';
import Typography from 'material-ui/Typography';

import formatDate from '../../../utils/formatDate';

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
  pos: {
    marginBottom: 12,
  },
  typography: {
    textAlign: 'left'
  },
  date: {
    color: 'rgba(0, 0, 0, 0.5)',
  },
});

const propTypes = {
  classes: PropTypes.object.isRequired,
  note: PropTypes.object.isRequired,
};

class Note extends Component {
  render() {
    const { classes } = this.props;
    const note = this.props.note.isPartOfCollab
      ? this.props.note.parentNote
      : this.props.note;

    return (
      <ButtonBase
        className={classes.buttonBase}
        focusRipple
        component={Link}
        to={`/notes/${this.props.note._id}`}
      >
        <Card
          style={{ backgroundColor: note.color }} 
          className={classes.card}
        >
          <CardContent>
            <Typography
              className={classes.typography}
              variant="headline"
              component="h2"
            >
              {note.title}
            </Typography>
            <Typography className={classNames(classes.typography, classes.date)}>
              {formatDate(note.updatedAt)}
            </Typography>
            {
              note.collabs.length > 0 &&
              <Typography
                className={classNames(classes.typography, classes.pos)}
                variant="body2"
              >
                Shared
              </Typography>
            }
            <Typography
              className={classes.typography}
              component={TextTruncate}
              line={4}
              truncateText="..."
              text={note.content}
            >
            </Typography>
          </CardContent>
        </Card>
      </ButtonBase> 
    );
  }
}

Note.propTypes = propTypes;
Note = withStyles(styles)(Note);

export default Note;