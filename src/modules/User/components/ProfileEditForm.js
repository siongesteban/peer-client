import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

import { withStyles } from 'material-ui/styles';
import { FormGroup } from 'material-ui/Form';
import List, { ListItem, ListItemIcon } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import AccountIcon from 'material-ui-icons/AccountBox';
import EmailIcon from 'material-ui-icons/Email';

import validateFields from '../../../utils/validate';

const styles = theme => ({
  wrapper: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    position: 'relative',
  },
  button: {
    width: '100%',
  },
  buttonProgress: {
    color: theme.palette.primary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  list: {
    [theme.breakpoints.up('md')]: {
      padding: 0
    }
  }
});

const propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const validate = values => {
  const fields = ['givenName', 'familyName', 'email'];
  
  return validateFields(values, fields);
};

class ProfileEditForm extends Component {
  render() {
    const { classes, handleSubmit } = this.props;
    
    return(
     <form onSubmit={handleSubmit}>
      <FormGroup className={classes.formGroup}>
        <List
          className={classes.list}
          component="nav">
          <ListItem>
            <ListItemIcon>
              <AccountIcon />
            </ListItemIcon>
            <Field
              name="givenName"
              component={TextField}
              placeholder="First Name"
              fullWidth
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <AccountIcon />
            </ListItemIcon>
            <Field
              name="familyName"
              component={TextField}
              placeholder="Last Name"
              fullWidth
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <Field
              name="email"
              component={TextField}
              placeholder="Email"
              fullWidth
            />
          </ListItem>
          <ListItem button>
            <Typography variant="button">Change Password</Typography>
          </ListItem>
        </List>
      </FormGroup>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  initialValues: state.auth.user
});

ProfileEditForm.propTypes = propTypes;
ProfileEditForm = withStyles(styles)(ProfileEditForm);
ProfileEditForm = reduxForm({
  form: 'profileEdit',
  validate
})(ProfileEditForm);
ProfileEditForm = connect(mapStateToProps)(ProfileEditForm);

export default ProfileEditForm;