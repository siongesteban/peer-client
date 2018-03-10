import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

import { switchPage } from '../modules/Layout/LayoutActions';

const styles = theme => ({
  root: {
    height: '100%',
    position: 'fixed'
  },
});

class Discussions extends Component {

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
            Discussions
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

Discussions.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  switchPage
}, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(Discussions));