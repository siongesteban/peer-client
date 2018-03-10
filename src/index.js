import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import registerServiceWorker from './registerServiceWorker';
import store, { history } from './store';
import { setAuthorizationToken } from './modules/Auth/AuthUtils';
import { setUser } from './modules/Auth/AuthActions';
import App from './App';

const token = localStorage.getItem('token');

if (token) {
  setAuthorizationToken(token);
  store.dispatch(setUser(token));
}

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
), document.getElementById('root'));

registerServiceWorker();
