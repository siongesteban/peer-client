import React, { Component } from 'react';
import classNames from 'classnames';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TextTruncate from 'react-text-truncate';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Card, { CardContent, CardActions } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import NoteIcon from 'material-ui-icons/NoteAdd';
import ScheduleIcon from 'material-ui-icons/DateRange';
import DiscussionIcon from 'material-ui-icons/Chat';
import red from 'material-ui/colors/red';
import blue from 'material-ui/colors/blue';
import teal from 'material-ui/colors/teal';

const styles = theme => ({
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  card: {
    boxShadow: theme.shadows[2]
  },
  category: {
    marginBottom: 16,
    fontSize: 11,
  },
  pos: {
    marginBottom: 12,
  },
  typography: {
    textAlign: 'left'
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  button: {
    margin: theme.spacing.unit,
    boxShadow: theme.shadows[0]
  },
});

class Home extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Grid container
        direction="row"
        justify="center"
        alignItems="flex-start">
        <Grid item xs={12} md={4} lg={4}>
          <Typography variant="button" align="center" style={{ margin: 20 }}>
            Create new
          </Typography>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            style={{ marginBottom: 16 }}
          >
            <Grid item>
              <Button variant="fab" color="primary" className={classes.button} style={{ backgroundColor: red[500] }}>
                <NoteIcon />
              </Button>
              <Typography variant="body2" align="center">
                Note
              </Typography>
            </Grid>
            <Grid item>
              <Button variant="fab" color="primary" className={classes.button} style={{ backgroundColor: blue[500] }}>
                <ScheduleIcon />
              </Button>
              <Typography variant="body2" align="center">
                Schedule
              </Typography>
            </Grid>
            <Grid item>
              <Button variant="fab" color="primary" className={classes.button} style={{ backgroundColor: teal[500] }}>
                <DiscussionIcon />
              </Button>
              <Typography variant="body2" align="center">
                Discussion
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            alignItems="stretch"
            direction="column"
            justify="center"
          >
            <Grid item>
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="button" className={classNames(classes.typography, classes.category)} style={{ color: teal[500] }}>Discussion</Typography>
                  <Typography variant="headline" component="h2" className={classes.typography}>
                    CS411
                  </Typography>
                  <Typography className={classNames(classes.typography)}>
                    02/12/18
                  </Typography>
                  <Typography variant="body2" className={classNames(classes.typography, classes.pos)}>
                    Ervin Renz replied to your comment.
                  </Typography>
                  <Typography
                    component={TextTruncate}
                    className={classes.typography}
                    line={2}
                    truncateText="..."
                    text="Sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt.">
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" className={classes.button} color="primary">View Comment</Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item>
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="button" className={classNames(classes.typography, classes.category)} style={{ color: blue[500] }}>Schedule</Typography>
                  <Typography variant="headline" component="h2" className={classes.typography}>
                    CS411
                  </Typography>
                  <Typography className={classNames(classes.typography)}>
                    02/12/18
                  </Typography>
                  <Typography variant="body2" className={classNames(classes.typography, classes.pos)}>
                    You added a new schedule.
                  </Typography>
                  <Typography
                    component={TextTruncate}
                    className={classes.typography}
                    line={2}
                    truncateText="..."
                    text="Math class: 4:00 PM to 6:00 PM every monday.">
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" className={classes.button} color="primary">View Schedule</Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item>
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="button" className={classNames(classes.typography, classes.category)} style={{ color: teal[500] }}>Discussion</Typography>
                  <Typography variant="headline" component="h2" className={classes.typography}>
                    CODEC
                  </Typography>
                  <Typography className={classNames(classes.typography)}>
                    02/12/18
                  </Typography>
                  <Typography variant="body2" className={classNames(classes.typography, classes.pos)}>
                    Main thread update
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" className={classes.button} color="primary">Open Discussion</Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item>
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="button" className={classNames(classes.typography, classes.category)} style={{ color: red[500] }}>Note</Typography>
                  <Typography variant="headline" component="h2" className={classes.typography}>
                    Nemo enim
                  </Typography>
                  <Typography className={classNames(classes.typography)}>
                    02/12/18
                  </Typography>
                  <Typography variant="body2" className={classNames(classes.typography, classes.pos)}>
                    You created a new note.
                  </Typography>
                  <Typography
                    component={TextTruncate}
                    className={classes.typography}
                    line={2}
                    truncateText="..."
                    text="Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam.">
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" className={classes.button} color="primary">Open Note</Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item>
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="button" className={classNames(classes.typography, classes.category)} style={{ color: red[500] }}>Collab Note</Typography>
                  <Typography variant="headline" component="h2" className={classes.typography}>
                    Et harum quidem
                  </Typography>
                  <Typography className={classNames(classes.typography)}>
                    02/12/18
                  </Typography>
                  <Typography variant="body2" className={classNames(classes.typography, classes.pos)}>
                    Mica updated her note.
                  </Typography>
                  <Typography
                    component={TextTruncate}
                    className={classes.typography}
                    line={2}
                    truncateText="..."
                    text="Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.">
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" className={classes.button} color="primary">Open Note</Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item>
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="button" className={classNames(classes.typography, classes.category)} style={{ color: teal[500] }}>Discussion</Typography>
                  <Typography variant="headline" component="h2" className={classes.typography}>
                    CS411
                  </Typography>
                  <Typography className={classNames(classes.typography)}>
                    02/12/18
                  </Typography>
                  <Typography variant="body2" className={classNames(classes.typography, classes.pos)}>
                    Ervin Renz replied to your comment.
                  </Typography>
                  <Typography
                    component={TextTruncate}
                    className={classes.typography}
                    line={2}
                    truncateText="..."
                    text="Sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt.">
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" className={classes.button} color="primary">View Comment</Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item>
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="button" className={classNames(classes.typography, classes.category)} style={{ color: blue[500] }}>Schedule</Typography>
                  <Typography variant="headline" component="h2" className={classes.typography}>
                    CS411
                  </Typography>
                  <Typography className={classNames(classes.typography)}>
                    02/12/18
                  </Typography>
                  <Typography variant="body2" className={classNames(classes.typography, classes.pos)}>
                    You added a new schedule.
                  </Typography>
                  <Typography
                    component={TextTruncate}
                    className={classes.typography}
                    line={2}
                    truncateText="..."
                    text="Math class: 4:00 PM to 6:00 PM every monday.">
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" className={classes.button} color="primary">View Schedule</Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item>
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="button" className={classNames(classes.typography, classes.category)} style={{ color: teal[500] }}>Discussion</Typography>
                  <Typography variant="headline" component="h2" className={classes.typography}>
                    CODEC
                  </Typography>
                  <Typography className={classNames(classes.typography)}>
                    02/12/18
                  </Typography>
                  <Typography variant="body2" className={classNames(classes.typography, classes.pos)}>
                    Main thread update
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" className={classes.button} color="primary">Open Discussion</Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item>
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="button" className={classNames(classes.typography, classes.category)} style={{ color: red[500] }}>Note</Typography>
                  <Typography variant="headline" component="h2" className={classes.typography}>
                    Nemo enim
                  </Typography>
                  <Typography className={classNames(classes.typography)}>
                    02/12/18
                  </Typography>
                  <Typography variant="body2" className={classNames(classes.typography, classes.pos)}>
                    You created a new note.
                  </Typography>
                  <Typography
                    component={TextTruncate}
                    className={classes.typography}
                    line={2}
                    truncateText="..."
                    text="Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam.">
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" className={classes.button} color="primary">Open Note</Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item>
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="button" className={classNames(classes.typography, classes.category)} style={{ color: red[500] }}>Collab Note</Typography>
                  <Typography variant="headline" component="h2" className={classes.typography}>
                    Et harum quidem
                  </Typography>
                  <Typography className={classNames(classes.typography)}>
                    02/12/18
                  </Typography>
                  <Typography variant="body2" className={classNames(classes.typography, classes.pos)}>
                    Mica updated her note.
                  </Typography>
                  <Typography
                    component={TextTruncate}
                    className={classes.typography}
                    line={2}
                    truncateText="..."
                    text="Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.">
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" className={classes.button} color="primary">Open Note</Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/discussions'),
}, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(Home));