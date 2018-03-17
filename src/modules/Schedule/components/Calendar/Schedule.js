import React from 'react';

import Grid from 'material-ui/Grid';

import Calendar from './Calendar';

const Schedule = (props) => (
  <div className="container">
    <Grid container>
      <Grid item xs={12}>
        <Calendar {...props} />
      </Grid>
    </Grid>
  </div>
);

export default Schedule;