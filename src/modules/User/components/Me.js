import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Grid from 'material-ui/Grid';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import PersonIcon from 'material-ui-icons/Person';
import SettingsIcon from 'material-ui-icons/Settings';
import LogoutIcon from 'material-ui-icons/ExitToApp';

import { logOut } from '../../Auth/AuthActions';
import { reset } from '../UserActions';

const styles = theme => ({
  avatar: {
    width: 96,
    height: 96,
  },
});

const propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  logOut: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

class Me extends Component {
  render() {
    const { classes } = this.props;
    const { givenName, familyName } = this.props.user;

    return (
      <div>
        <List component="nav">
          <ListItem button>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <Avatar
                  alt="Siong Esteban"
                  src="/static/images/siong.jpg"
                  className={classes.avatar}
                />
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

Me.propTypes = propTypes;
Me = withStyles(styles)(Me);
Me = connect(mapStateToProps, mapDispatchToProps)(Me);

export default Me;