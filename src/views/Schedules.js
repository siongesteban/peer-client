import React from 'react';
import moment from 'moment';

import Schedule from '../modules/Schedule';

function round(date, duration, method) {
  return moment(Math[method]((+date) / (+duration)) * (+duration)); 
}

var date = moment('2018-12-08 09:31');
var roundedDate = round(date, moment.duration(30, "minutes"), "ceil");

const ScheduleView = () => <Schedule />;

export default ScheduleView;