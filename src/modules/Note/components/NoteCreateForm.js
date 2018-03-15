import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

import { withStyles } from 'material-ui/styles';
import { FormGroup } from 'material-ui/Form';

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
  isLoading: PropTypes.bool,
};

const validate = values => {
  const fields = ['title', 'content'];
  
  return validateFields(values, fields);
};

class NoteCreateForm extends Component {
  render() {
    const { classes, handleSubmit, isLoading } = this.props;
    
    return(
     <form onSubmit={handleSubmit}>
        <FormGroup className={classes.formGroup}>
          <Field
            name="title"
            component={TextField}
            label="Title"
            disabled={isLoading}
            fullWidth
          />
          <Field
            name="content"
            component={TextField}
            label="Content"
            disabled={isLoading}
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