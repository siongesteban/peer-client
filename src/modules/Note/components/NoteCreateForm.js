import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

import { withStyles } from 'material-ui/styles';
import { FormGroup } from 'material-ui/Form';
import List, { ListItem, ListItemIcon } from 'material-ui/List';
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
  const fields = ['title', 'content'];
  
  return validateFields(values, fields);
};

class NoteCreateForm extends Component {
  render() {
    const { classes, handleSubmit } = this.props;
    
    return(
     <form onSubmit={handleSubmit}>
        <FormGroup className={classes.formGroup}>
          <Field
            name="title"
            component={TextField}
            label="Title"
            fullWidth
          />
          <Field
            name="content"
            component={TextField}
            label="Content"
            margin="normal"
            placeholder="Start typing your note..."
            multiline
            rows={5}
            fullWidth
          />
        </FormGroup>
      </form>
    );
  }
}

NoteCreateForm.propTypes = propTypes;
NoteCreateForm = withStyles(styles)(NoteCreateForm);
NoteCreateForm = reduxForm({
  form: 'noteCreate',
  validate
})(NoteCreateForm);

export default NoteCreateForm;