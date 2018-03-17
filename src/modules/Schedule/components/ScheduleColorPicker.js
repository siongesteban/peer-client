import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';

const styles = theme => ({
  active: {
    background: '#E0E0E0',
  }
});

const propTypes = {
  classes: PropTypes.object.isRequired,
};

class ScheduleColorPicker extends Component {
  render() {
    const {
      classes,
      currentColor, 
      handleSetScheduleColor
    } = this.props;

    const colors = [
      {
        label: 'Grey',
        color: '#757575'
      },
      {
        label: 'Red',
        color: '#F44336'
      },
      {
        label: 'Pink',
        color: '#E91E63'
      },
      {
        label: 'Purple',
        color: '#9C27B0'
      },
      {
        label: 'Blue',
        color: '#2196F3'
      },
      {
        label: 'Green',
        color: '#43A047'
      },
    ];

    return(
      <div>
        {
          colors.map(color => (
            <IconButton
              className={color.color === currentColor ? classes.active : ''}
              key={color.color}
              aria-label={color.label}
              onClick={() => handleSetScheduleColor(color.color)}
            >
              <Avatar
                style={{ background: color.color }}
              > </Avatar>
            </IconButton>
          ))
        }
      </div>
    );
  }
}

ScheduleColorPicker.propTypes = propTypes;
ScheduleColorPicker = withStyles(styles)(ScheduleColorPicker);

export default ScheduleColorPicker;