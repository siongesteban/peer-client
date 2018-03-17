import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import { CircularProgress } from 'material-ui/Progress';
import Masonry from 'react-masonry-component';

import Note from './Note';
import NoteDetail from './NoteDetail';
import NoteCreate from './NoteCreate';
import DeleteConfirmationDialog from '../../../components/ConfirmationDialog';

import { getNotes, deleteNote, reset } from '../NoteActions';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit,
  },
  grid: {
    padding: theme.spacing.unit - 2,
    width: '100%',
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
  fab: {
    position: 'fixed',
    [theme.breakpoints.down('sm')]: {
      bottom: theme.spacing.unit * 9,
    },
    [theme.breakpoints.up('md')]: {
      bottom: theme.spacing.unit * 2,
    },
    right: theme.spacing.unit * 2,
  },
});

const propTypes = {
  classes: PropTypes.object.isRequired,
  notes: PropTypes.array,
  location: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isDeleteSuccessful: PropTypes.bool,
  getNotes: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

class NoteList extends Component {
  state = {
    canConnect: true,
    dialogIsOpen: false,
    currentNoteId: null,
  };

  componentWillMount() {
    if (!this.props.isLoaded) {
      if (window.navigator.onLine) {
        this.props.getNotes();
      } else {
        this.setState({ canConnect: false });
      }
    }
  }

  componentDidUpdate() {
    if (this.props.isDeleteSuccessful) {
      this.toggleDialog();
      this.props.reset();
    }
  }

  toggleDialog = noteId => {
    this.setState({
      dialogIsOpen: !this.state.dialogIsOpen
    });

    if (noteId) {
      this.setState({ currentNoteId: noteId });
    } else {
      this.setState({ currentNoteId: null });
    }
  }

  handleDeleteNote = () => {
    this.props.deleteNote(this.state.currentNoteId);
  }

  handleRefresh() {
    this.props.getNotes();
  }

  render() {
    const { classes, notes, isLoading, isLoaded } = this.props;

    if (!this.state.canConnect) {
      return <Typography align="center">Can't connect right now.</Typography>;
    }

    if (!isLoaded && isLoading) {
      return (
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start">
          <Grid item>
            <CircularProgress className={classes.progress} />
          </Grid>
        </Grid>)
      ;
    }

    return (
      <div className={classes.root}>
        <Switch>
          <Route
            path="/notes/create"
            component={NoteCreate}
          />
          <Route
            path="/notes/:id"
            component={NoteDetail}
          />
        </Switch>
        <DeleteConfirmationDialog
          isOpen={this.state.dialogIsOpen}
          isLoading={isLoading}
          title={'Delete note'}
          message={'Are you sure you want to delete the note?'}
          buttons={{ neg: 'No', pos: 'Yes' }}
          toggleDialog={this.toggleDialog}
          handlePos={this.handleDeleteNote}
        />
        {
          notes.length > 0
          ? <Grid
              component={Masonry}
              container
            >
              {notes.map(note => (
                <Grid
                  key={note._id}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  xl={2}
                  className={classes.grid}
                >
                  <Note
                    note={note}
                    toggleDialog={this.toggleDialog}
                  />
                </Grid>
              ))}
            </Grid>
          : <Typography align="center">You currently don't have a note.</Typography>
        }
        <Button
          className={classes.fab}
          variant="fab"
          color="secondary"
          aria-label="add"
          component={Link}
          to="/notes/create"
        >
          <AddIcon />
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  notes: state.notes.all,
  isLoading: state.notes.isLoading,
  isLoaded: state.notes.isLoaded,
  isDeleteSuccessful: state.notes.isDeleteSuccessful,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getNotes,
  deleteNote,
  reset
}, dispatch);

NoteList.propTypes = propTypes;
NoteList = withStyles(styles)(NoteList);
NoteList = connect(mapStateToProps, mapDispatchToProps)(NoteList);

export default NoteList;