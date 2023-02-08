import React, { useEffect, useState } from "react";
import { withRouter } from 'react-router-dom'

import { Amplify, API, Auth } from "aws-amplify";

import awsConfig from './config.js';

function SignIn (props) {

  // const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [phone_number, setPhonenumber] = useState('');
  // const [code, setCode] = useState('');
  // const [user, setUser] = useState(null);

  const handleSignIn = async event => {
    event.preventDefault();
    // You can pass an object which has the username, password and validationData which is sent to a PreAuthentication Lambda trigger
    try {
      const user = await Auth.signIn({ username: email, password });
      // console.log("original auth with marketplace credentials", user);
      
      if(user.username) { // login success
        const userId = user.username;
        const token = user.signInUserSession.idToken.jwtToken;
        localStorage.setItem('userId', userId);
        localStorage.setItem('token', token);
        // const hostname = "aaa.xgenteam.com";
        const hostname = window.location.hostname;
        const domain = hostname.split(".")[0];
        // console.log("sub domain", domain);
        const appsRes = await API.get('xGenMarketAPI', '/applications');
        const apps = JSON.parse(appsRes.body);
        // console.log("apps", apps);
        const init = { 
          headers: { Authorization: `Bearer ${token}` }
        }
        const subsRes = await API.get('xGenMarketAPI', '/subscriptions', init);
        const subs = JSON.parse(subsRes.body);
        // console.log("subs", subs);
        const currentApp = apps.filter(item => item.domain === domain);
        if (currentApp.length) {
          const appClientId = currentApp[0].id; //currentApp[0].app_client_id;
          // console.log("marketplace appClientId", appClientId);
          const subscribedApps = subs.filter(item => item.userId === userId);
          // console.log("subscribedApps", subscribedApps);
          const isSubscribedCurrentApp = subscribedApps.find(ele => ele.appId === appClientId);
          // console.log(isSubscribedCurrentApp);

          // signout the original auth
          await Auth.signOut();

          if (isSubscribedCurrentApp) {
            // console.log("marketplace config", awsConfig);
            const newConfig = {
              ...awsConfig,
              Auth: {
                ...awsConfig.Auth,
                userPoolWebClientId: appClientId
              }
            }
            // console.log("new config", newConfig);
            Amplify.configure(newConfig);
            const user = await Auth.signIn({ username: email, password });
            // console.log("new auth", user);
            localStorage.setItem("appClientId", user.pool.clientId);
            // go to Single Hello Dashboard
            props.history.push('home');
          } else {
            // go to Marketplace
            window.location.href = "https://xgenteam.com";
          }
        }
      }
    } catch (error) {
      console.log("error", error)
    }
  };

  return (
    <form>
      <input
        type="text"
        name="email"
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />
      <input
        type="submit"
        value="SIGN IN"
        onClick={handleSignIn}
      />
    </form>
  );
}

export default withRouter(SignIn);