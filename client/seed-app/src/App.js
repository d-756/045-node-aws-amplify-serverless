import React  from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { Amplify, Auth } from 'aws-amplify';
import SignIn from './SignIn'
import Home from './Home';
import Layout from './Layout';

import awsConfig from './config.js';

const newConfig = {
  ...awsConfig,
  Auth: {
    ...awsConfig.Auth,
    userPoolWebClientId: localStorage.getItem("appClientId")
  }
}

const config = localStorage.getItem("appClientId") ? newConfig : awsConfig;

Amplify.configure(config);

function App() {
  const history = useHistory();

  const renderWithLayout = (component, MainLayout) => 
  (
    <>
      <MainLayout>
        {component}
      </MainLayout>
    </>
  )

  return (
    <Router>
      <Switch>
        <PrivateRoute exact path='/home' render={()=> renderWithLayout(<Home />, Layout)} />
        <Route path='/' render={()=> localStorage.getItem("appClientId") ? renderWithLayout(<Home />, Layout) : renderWithLayout(<SignIn />, Layout) } />
      </Switch>
    </Router>
  );
}

export const PrivateRoute = (props) => {
  return (
    localStorage.getItem("appClientId") ? 
      <Route
        {...props}
      /> :
      <Redirect
        to={{
          pathname: '/'
        }}
      />
  )
}

export default App;
