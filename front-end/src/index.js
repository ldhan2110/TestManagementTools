import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import { PersistGate } from 'redux-persist/integration/react'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store/index';

ReactDOM.render(
  <Provider store={store.store}>
      <PersistGate loading={null} persistor={store.persistor}>
             <App />
      </PersistGate>
  </Provider>, document.getElementById('root'));
