import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import ArrowBackIcon from 'material-ui-icons/ArrowBack';

import Calendar from './Calendar';

import { updateThemeColor } from '../../../Layout/LayoutUtils';

const styles = theme => ({
  appBar: {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: theme.shadows[0],
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

class Schedule extends Component {
  componentDidMount() {
    updateThemeColor(this.props.schedule.color);
  }

  render() {
    const { classes, schedule, appointments } = this.props;

    return(
      <div className="container">
        <div>
          <AppBar
            style={{ background: schedule.color }}
            className={classes.appBar}
            position="static"
          >
            <Toolbar>
              <IconButton
                className={classes.menuButton}
                color="inherit"
                aria-label="Back"
                component={Link}
                to="/schedules"
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="title" color="inherit">
                {schedule.name}
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
        <Grid container>
          <Grid item xs={12}>
            <Calendar appointments={appointments} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  schedule: state.schedules.current,
});

Schedule.propTypes = {
  classes: PropTypes.object.isRequired,
};
Schedule = withStyles(styles)(Schedule);
Schedule = connect(mapStateToProps)(Schedule);

export default Schedule;