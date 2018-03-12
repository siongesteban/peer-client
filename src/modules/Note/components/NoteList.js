import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
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

import { getNotes } from '../NoteActions';

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
  notes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  getNotes: PropTypes.func.isRequired,
};

class NoteList extends Component {
  state = {
    canConnect: true,
  };

  componentDidMount() {
    if (!this.props.notes.isLoaded) {
      if (window.navigator.onLine) {
        this.props.getNotes();
      } else {
        this.setState({ canConnect: false });
      }
    }
  }

  handleRefresh() {
    this.props.getNotes();
  }

  render() {
    const { classes } = this.props;
    const { all, isLoading } = this.props.notes;

    if (!this.state.canConnect) {
      return <Typography>Can't connect right now.</Typography>;
    }

    if (isLoading) {
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
        <Route
          path="/notes/:id"
          component={NoteDetail}
        />
        {
          all.length > 0
          ? <Grid
              component={Masonry}
              container
            >
              {all.map(note => (
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
                  <Note note={note} />
                </Grid>
              ))}
            </Grid>
          : 'Empty'
        }
        <Button
          variant="fab"
          color="primary"
          aria-label="add"
          className={classes.fab}
        >
          <AddIcon />
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  notes: state.notes,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getNotes,
}, dispatch);

NoteList.propTypes = propTypes;
NoteList = withStyles(styles)(NoteList);
NoteList = connect(mapStateToProps, mapDispatchToProps)(NoteList);

export default NoteList;