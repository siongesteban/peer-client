import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { submit } from 'redux-form'

import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import { withStyles } from 'material-ui/styles';

import NoteDialog from './NoteDialog';
import NoteCreateForm from './NoteCreateForm';

import { updateThemeColor } from '../../Layout/LayoutUtils';
import { createNote } from '../NoteActions';

const styles = theme => ({
  active: {
    background: '#E0E0E0',
  }
});

const propTypes = {
  classes: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
  createNote: PropTypes.func.isRequired,
};

class NoteCreate extends Component {
  state = {
    activeColor: '#FFFFFF',
  };

  componentDidMount() {
    updateThemeColor(this.state.activeColor);
  }

  componentDidUpdate() {
    updateThemeColor(this.state.activeColor);
  }

  handleSubmit = values => {
    values = {
      ...values,
      color: this.state.activeColor,
    };

    this.props.createNote(values);
    this.handleClose();
  }

  handleClose = () => {
    this.props.close();
  }

  handleChangeColor = color => {
    this.setState({ activeColor: color });
  }

  

  render() {
    const { classes, submitForm } = this.props;
    const { activeColor } = this.state;
    const colors = [
      {
        label: 'White',
        color: '#FFFFFF'
      },
      {
        label: 'Red',
        color: '#EF9A9A'
      },
      {
        label: 'Blue',
        color: '#90CAF9'
      },
      {
        label: 'Lime',
        color: '#E6EE9C'
      },
      {
        label: 'Orange',
        color: '#FFCC80'
      },
      {
        label: 'BlueGrey',
        color: '#B0BEC5'
      },
    ];

    return (
      <div>
        <NoteDialog
          handleClose={this.handleClose}
          title={'Create Note'}
          noteColor={activeColor}
          submitForm={submitForm}
        >
          <NoteCreateForm onSubmit={this.handleSubmit} />
          <div>
            {
              colors.map(color => (
                <IconButton
                  className={color.color === activeColor ? classes.active : ''}
                  key={color.color}
                  aria-label={color.label}
                  onClick={() => this.handleChangeColor(color.color)}
                >
                  <Avatar
                    style={{ background: color.color }}
                  > </Avatar>
                </IconButton>
              ))
            }
          </div>
        </NoteDialog>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  close: () => push('/notes'),
  submitForm: () => submit('noteCreate'),
  createNote,
}, dispatch);

NoteCreate.propTypes = propTypes;
NoteCreate = withStyles(styles)(NoteCreate);
NoteCreate = connect(null, mapDispatchToProps)(NoteCreate);

export default NoteCreate;