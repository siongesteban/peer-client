import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withStyles } from 'material-ui/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Grid from 'material-ui/Grid';
import Card from 'material-ui/Card';

import Me from './components/Me';
import ProfileEdit from './components/ProfileEdit';

import { reset } from './UserActions';

function TabContainer({ children, dir }) {
  return (
    <div>
      {children}
    </div>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  container: {
    [theme.breakpoints.up('md')]: {
      marginTop: 20
    }
  },
  appBar: {
    [theme.breakpoints.up('md')]: {
      boxShadow: theme.shadows[0]
    }
  },
  swipeableViews: {
  },
  card: {
  }
});

class User extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;
    
    return (
      <div>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          style={{ paddingBottom: 5 }}
        >
          <Grid
            item
            xs={12} sm={4} lg={4}
            className={classes.container}
          >
            <Card className={classes.card}>
              <AppBar
                position="static"
                color="default"
                className={classes.appBar}
              >
                <Tabs
                  value={this.state.value}
                  onChange={this.handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  fullWidth
                >
                  <Tab label="Me" />
                  <Tab label="Notifications" />
                </Tabs>
              </AppBar>
              <SwipeableViews
                className={classes.swipeableViews}
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={this.state.value}
                onChangeIndex={this.handleChangeIndex}
              >
                <TabContainer dir={theme.direction}><Me /></TabContainer>
                <TabContainer dir={theme.direction}>Item Two</TabContainer>
              </SwipeableViews>
            </Card>
          </Grid>
        </Grid>
        <Route path="/me/edit-profile" component={ProfileEdit} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => bindActionCreators({
  reset
}, dispatch);

User.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(User));
