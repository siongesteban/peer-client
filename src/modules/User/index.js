import React from 'react';
import { Route } from 'react-router-dom';

import Me from './components/Me';

const User = props => <Route path="/me" component={Me} />;

export default User;