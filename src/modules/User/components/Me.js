import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import AccountCircleIcon from 'material-ui-icons/AccountCircle';
import PersonIcon from 'material-ui-icons/Person';
import SettingsIcon from 'material-ui-icons/Settings';
import LogoutIcon from 'material-ui-icons/ExitToApp';

import ProfileEdit from './ProfileEdit';

import { logOut } from '../../Auth/AuthActions';
import { reset } from '../UserActions';

const styles = theme => ({
  grid: {
    marginTop: 3,
  },
  avatar: {
    width: 96,
    height: 96,
    color: '#6C6C6C',
  },
});

const propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  logOut: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

class User extends Component {
  render() {
    const { classes } = this.props;
    const { givenName, familyName, imageUrl } = this.props.user;

    return (
      <div>
      <Route path="/me/edit-profile" component={ProfileEdit} />
        <Grid
          className={classes.grid}
          container
          direction="row"
          justify="center"
        >
          <Grid
            item
            xs={11}
            sm={6}
            md={5}
            lg={4}
            xl={3}
          >
            <Paper>
              <List component="nav">
                <ListItem button>
                  <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item>
                      {
                        imageUrl
                        ? <Avatar
                            className={classes.avatar}
                            alt="Siong Esteban"
                            src="/static/images/siong.jpg"
                          />
                        : <AccountCircleIcon className={classes.avatar} />
                      }
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="body2"
                        gutterBottom
                      >
                        {`${givenName} ${familyName}`}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <Divider />
                <ListItem
                  button
                  component={Link}
                  to="/me/edit-profile"
                >
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary="Edit Profile" />
                </ListItem>
                <Divider />
                <ListItem button>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Log Out"
                    onClick={this.props.logOut}
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = dispatch => bindActionCreators({
  logOut,
  reset
}, dispatch);

User.propTypes = propTypes;
User = withStyles(styles)(User);
User = connect(mapStateToProps, mapDispatchToProps)(User);

export default User;