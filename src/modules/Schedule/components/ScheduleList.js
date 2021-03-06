import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import { CircularProgress } from 'material-ui/Progress';

import DeleteConfirmationDialog from '../../../components/ConfirmationDialog';
import ScheduleCard from './ScheduleCard';
import ScheduleCreate from './ScheduleCreate';
import ScheduleEdit from './ScheduleEdit';

import { getSchedules, deleteSchedule, reset } from '../ScheduleActions';

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
  addCard: {
    minHeight: 218,
    color: '#827a7a',
    borderRadius: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  addIcon: {
    width: 120,
    height: 120,
  }
});

const propTypes = {
  classes: PropTypes.object.isRequired,
  schedules: PropTypes.array,
  location: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isDeleteSuccessful: PropTypes.bool,
  getSchedules: PropTypes.func.isRequired,
  deleteSchedule: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

class ScheduleList extends Component {
  state = {
    canConnect: true,
    dialogIsOpen: false,
    currentScheduleId: null,
  };

  componentWillMount() {
    if (!this.props.isLoaded) {
      if (window.navigator.onLine) {
        this.props.getSchedules();
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

  toggleDialog = scheduleId => {
    this.setState({
      dialogIsOpen: !this.state.dialogIsOpen
    });

    if (scheduleId) {
      this.setState({ currentScheduleId: scheduleId });
    } else {
      this.setState({ currentScheduleId: null });
    }
  }

  handleDeleteSchedule = () => {
    this.props.deleteSchedule(this.state.currentScheduleId);
  }

  handleRefresh() {
    this.props.getSchedules();
  }

  render() {
    const { classes, schedules, isLoading, isLoaded, goToCreate, match } = this.props;

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
            path={`/schedules/create`}
            component={ScheduleCreate}
          />
          <Route
            path={`/schedules/:id/edit`}
            component={ScheduleEdit}
          />
        </Switch>
        <DeleteConfirmationDialog
          isOpen={this.state.dialogIsOpen}
          isLoading={isLoading}
          title={'Delete note'}
          message={'Are you sure you want to delete this schedule?'}
          buttons={{ neg: 'No', pos: 'Yes' }}
          toggleDialog={this.toggleDialog}
          handlePos={this.handleDeleteSchedule}
        />
        {
          schedules.length > 0
          ? <Grid container>
              {
                schedules.map(schedule => (
                  <Grid
                    item
                    key={schedule._id}
                    xs={12}
                    md={3}
                  >
                    <ScheduleCard schedule={schedule} />
                  </Grid>
                ))
              }
              <Grid
                item
                xs={12}
                md={3}
              >
                <div
                  className={classes.addCard}
                  onClick={goToCreate}
                >
                  <AddIcon className={classes.addIcon}  />
                </div>
              </Grid>
            </Grid>
          : <Typography align="center">You currently don't have a schedule.</Typography>
        }
        <Button
          className={classes.fab}
          variant="fab"
          color="primary"
          aria-label="add"
          component={Link}
          to={`${match.url}/create`}
        >
          <AddIcon />
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  schedules: state.schedules.all,
  isLoading: state.schedules.isLoading,
  isLoaded: state.schedules.isLoaded,
  isDeleteSuccessful: state.schedules.isDeleteSuccessful,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  goToCreate: () => push('/schedules/create'),
  getSchedules,
  deleteSchedule,
  reset,
}, dispatch);

ScheduleList.propTypes = propTypes;
ScheduleList = withStyles(styles)(ScheduleList);
ScheduleList = connect(mapStateToProps, mapDispatchToProps)(ScheduleList);

export default ScheduleList;