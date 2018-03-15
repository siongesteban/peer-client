import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import { withStyles } from 'material-ui/styles';

import NoteDialog from './NoteDialog';
import NoteCreateForm from './NoteCreateForm';

import { updateThemeColor } from '../../Layout/LayoutUtils';

const styles = theme => ({
  active: {
    background: '#E0E0E0',
  }
});

const propTypes = {
  classes: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
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

  handleChangeColor = color => {
    this.setState({ activeColor: color });
  }

  handleClose = () => {
    this.props.close();
  };

  render() {
    const { classes } = this.props;
    const { activeColor } = this.state;
    console.log(activeColor);
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
        >
          <NoteCreateForm />
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
}, dispatch);

NoteCreate.propTypes = propTypes;
NoteCreate = withStyles(styles)(NoteCreate);
NoteCreate = connect(null, mapDispatchToProps)(NoteCreate);

export default NoteCreate;