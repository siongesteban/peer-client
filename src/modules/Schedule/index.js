import React from 'react';
import { Route } from 'react-router-dom';

import ScheduleList from './components/ScheduleList';

const Schedule = () => <Route path="/schedules" component={ScheduleList} />;

export default Schedule;