import React from "react";
import { Router, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Amplify from 'aws-amplify';
import awsConfig from './config';

import Root from "./root";
import { store, persistor, history } from './reducers'
Amplify.configure(awsConfig);

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Router history={history}>
            <Switch>
              <Root />
            </Switch>
          </Router>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
