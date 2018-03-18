import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ScheduleList from './components/ScheduleList';
import ScheduleDetail from './components/ScheduleDetail';

const Schedule = () => (
  <div>
    {/* <Route path="/schedules/:id" component={ScheduleDetail} /> */}
    <Switch>
      <Route path="/schedules/:id/appointments" component={ScheduleDetail} />
      <Route path="/schedules" component={ScheduleList} />
    </Switch>
  </div>
);

export default Schedule;