import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { submit } from 'redux-form'

import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import { withStyles } from 'material-ui/styles';

import NoteDialog from './NoteDialog';
import NoteEditForm from './NoteEditForm';

import { updateThemeColor } from '../../Layout/LayoutUtils';
import { updateNote, reset } from '../NoteActions';

const styles = theme => ({
  active: {
    background: '#E0E0E0',
  }
});

const propTypes = {
  classes: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
  updateNote: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

class NoteEdit extends Component {
  state = {
    activeColor: this.props.note.color,
  };

  componentDidMount() {
    updateThemeColor(this.state.activeColor);
  }

  componentDidUpdate() {
    updateThemeColor(this.state.activeColor);
    
    if (this.props.successful) {
      this.handleClose();
    }
  }

  handleSubmit = values => {
    values = {
      ...values,
      color: this.state.activeColor,
    };

    this.props.updateNote(this.props.note._id, values);
  }

  handleClose = () => {
    this.props.close(this.props.match.params.id);
  }

  handleChangeColor = color => {
    this.setState({ activeColor: color });
  }

  render() {
    const { classes, submitForm, isLoading } = this.props;
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
          title={'Edit Note'}
          noteColor={activeColor}
          isLoading={isLoading}
          submitForm={submitForm}
        >
          <NoteEditForm
            onSubmit={this.handleSubmit}
            isLoading={isLoading}
          />
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

const mapStateToProps = state => ({
  note: state.notes.current,
  isLoading: state.notes.isLoading,
  successful: state.notes.successful,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  close: noteId => push(`/notes/${noteId}`),
  submitForm: () => submit('noteEdit'),
  updateNote,
  reset,
}, dispatch);

NoteEdit.propTypes = propTypes;
NoteEdit = withStyles(styles)(NoteEdit);
NoteEdit = connect(mapStateToProps, mapDispatchToProps)(NoteEdit);

export default NoteEdit;