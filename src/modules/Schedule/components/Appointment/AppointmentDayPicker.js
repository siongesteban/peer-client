import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';

import { PRIMARY_COLOR } from '../../../Layout/LayoutConstants';

const styles = theme => ({
  activeButton: {
    background: '#E0E0E0',
  },
  iconButton: {
    width: 42,
    height: 42,
  },
  activeAvatar: {
    background: PRIMARY_COLOR,
  },
  avatar: {
    width: 36,
    height: 36,
  },
});

const propTypes = {
  classes: PropTypes.object.isRequired,
};

class AppointmentDayPicker extends Component {
  render() {
    const {
      classes,
      currentDay, 
      handleSetAppointmentDay
    } = this.props;

    const days = [
      {
        _abbr: 'M',
        value: 'MONDAY'
      },
      {
        _abbr: 'TU',
        value: 'TUESDAY'
      },
      {
        _abbr: 'W',
        value: 'WEDNESDAY'
      },
      {
        _abbr: 'TH',
        value: 'THURSDAY'
      },
      {
        _abbr: 'F',
        value: 'FRIDAY'
      },
      {
        _abbr: 'SA',
        value: 'SATURDAY'
      },
      {
        _abbr: 'SU',
        value: 'SUNDAY'
      },
    ];

    return(
      <div>
        {
          days.map(day => (
            <IconButton
              className={classNames(classes.iconButton, day.value === currentDay ? classes.activeButton : '')}
              key={day._abbr}
              aria-label={day.value}
              onClick={() => handleSetAppointmentDay(day.value)}
            >
              <Avatar className={classNames(classes.avatar, day.value === currentDay ? classes.activeAvatar : '')}>{day._abbr}</Avatar>
            </IconButton>
          ))
        }
      </div>
    );
  }
}

AppointmentDayPicker.propTypes = propTypes;
AppointmentDayPicker = withStyles(styles)(AppointmentDayPicker);

export default AppointmentDayPicker;