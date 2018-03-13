import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ConnectedRouter } from 'react-router-redux';

import registerServiceWorker from './registerServiceWorker';
import configureStore, { history } from './store';
import { setAuthorizationToken } from './modules/Auth/AuthUtils';
import { setUser } from './modules/Auth/AuthActions';
import App from './App';

const { store, persistor } = configureStore();
const token = localStorage.getItem('token');

global.store = store;

if (token) {
  setAuthorizationToken(token);
  store.dispatch(setUser(token));
}

ReactDOM.render((
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </PersistGate>
  </Provider>
), document.getElementById('root'));

registerServiceWorker();