import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import EditIcon from 'material-ui-icons/Create';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  cardContent: {
    padding: 0,
  },
  name: {
    padding: 20,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    color: '#fff',
  },
  description: {
    padding: 20,
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

const ScheduleCard = props => {
  const { classes, schedule } = props;
  return (
    <div>
      <Card>
        <CardContent className={classes.cardContent}>
          <Typography
            className={classes.name}
            style={{ background: schedule.color }}
            variant="display1"
            component="h2"
          >
            {schedule.name} and friends
          </Typography>
          <div className={classes.editButtonBlock}>
            <Button variant="fab" color="primary" aria-label="add" className={classes.editButton}>
              <EditIcon />
            </Button>
          </div>
          <Typography
            className={classes.description}
            component="p"
          >
            {schedule.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            View Schedule
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

ScheduleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScheduleCard);