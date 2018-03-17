import React, { Component } from 'react';

import Schedule from './Calendar/Schedule';
import './Calendar/styles.css';

const appointments = {
  monday: [
    { description: 'Gustavo', timeStart: '08:00', timeEnd: '09:00' },
    { description: 'Felipe', timeStart: '09:30', timeEnd: '11:00' },
    { description: 'Cony', timeStart: '18:00', timeEnd: '18:30' }
  ],
  tuesday: [],
  wednesday: [
  	{ description: 'Nicole', timeStart: '11:30', timeEnd: '14:00' }
  ],
  thursday: [
  	{ description: 'Alejandro', timeStart: '00:00', timeEnd: '00:00' }
  ],
  friday: []
}

class ScheduleDetail extends Component {
  render() {
    return(
      <div style={{ padding: 10, marginTop: 5 }}>
        <Schedule appointments={appointments} />
      </div>
    );
  }
}

export default ScheduleDetail;