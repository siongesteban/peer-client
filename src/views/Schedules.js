import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    height: '100%',
    position: 'fixed'
  },
});

class Schedules extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid className={classes.root}
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid item>
          <Typography variant="display2">
            Under construction
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="headline">
            Schedules
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

Schedules.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Schedules);