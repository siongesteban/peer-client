import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import EditIcon from 'material-ui-icons/Create';
import Typography from 'material-ui/Typography';

import formatDate from '../../../utils/formatDate';

const styles = theme => ({
  header: {
    padding: '0 20px',
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    minHeight: 120,
    display: 'flex',
    alignItems: 'center',
  },
  cardContent: {
    padding: 0,
  },
  name: {
    color: '#fff',
  },
  date: {
    color: 'rgba(0, 0, 0, 0.5)',
    marginLeft: 15,
  },
  actions: {
    padding: 0,
  },
  editButtonBlock: {
    display: 'flex',
  },
  editButton: {
    marginTop: -30,
    marginLeft: 'auto',
    marginRight: 20,
  },
});

class ScheduleCard extends Component {
  render() {
    const { classes, schedule } = this.props;

    return (
      <div>
        <Card>
          <CardContent className={classes.cardContent}>
            <div
              className={classes.header}
              style={{ background: schedule.color }}
            >
              <Typography
                className={classes.name}
                variant="headline"
                component="h2"
              >
                {schedule.name}
              </Typography>
            </div>
            <div className={classes.editButtonBlock}>
              <Button
                className={classes.editButton}
                variant="fab"
                aria-label="add"
                component={Link}
                to={`/schedules/${schedule._id}/edit`}
              >
                <EditIcon />
              </Button>
            </div>
            <Typography className={classes.date}>
              {
                schedule.createdAt === schedule.updatedAt
                ? 'Date Created: '
                : 'Last Update: '
              }
              {formatDate(schedule.updatedAt)}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="primary"
              component={Link}
              to={`/schedules/${schedule._id}/appointments`}
            >
              View Schedule
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

ScheduleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};
ScheduleCard = withStyles(styles)(ScheduleCard);
ScheduleCard = withRouter(ScheduleCard);

export default ScheduleCard;