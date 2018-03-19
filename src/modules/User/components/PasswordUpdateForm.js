import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

import { withStyles } from 'material-ui/styles';
import { FormGroup } from 'material-ui/Form';
import List, { ListItem, ListItemIcon } from 'material-ui/List';
import LockIcon from 'material-ui-icons/Lock';

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
  const fields = [
    'password',
    'newPassword',
    'confirmPassword'
  ];
  
  return validateFields(values, fields, 'profileUpdate');
};

class PasswordUpdateForm extends Component {
  render() {
    const { classes, handleSubmit } = this.props;
    
    return(
     <form onSubmit={handleSubmit}>
        <FormGroup className={classes.formGroup}>
          <List
            className={classes.list}
            component="nav">
            <ListItem style={{ marginBottom: 20 }}>
              <ListItemIcon>
                <LockIcon />
              </ListItemIcon>
              <Field
                component={TextField}
                fullWidth
                name="password"
                type="password"
                placeholder="Existing Password"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <LockIcon />
              </ListItemIcon>
              <Field
                fullWidth
                component={TextField}
                name="newPassword"
                type="password"
                placeholder="New Password"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <LockIcon />
              </ListItemIcon>
              <Field
                fullWidth
                component={TextField}
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
              />
            </ListItem>
          </List>
        </FormGroup>
      </form>
    );
  }
}

PasswordUpdateForm.propTypes = propTypes;
PasswordUpdateForm = withStyles(styles)(PasswordUpdateForm);
PasswordUpdateForm = reduxForm({
  form: 'passwordUpdate',
  validate
})(PasswordUpdateForm);

export default PasswordUpdateForm;