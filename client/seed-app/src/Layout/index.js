import React from "react";
import { Amplify, Auth } from 'aws-amplify';
import { useHistory } from "react-router-dom";

const Layout = ({ children }) => {
    const history = useHistory();

    const signOut = async () => {
        try {
          await Auth.signOut({ global: true });
          await localStorage.clear();
          await history.push('/')
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }
    return (
    <>
        <h2>Seed Project</h2>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <ul className="navbar-nav mr-auto">
          {/* <li><Link to={'/'} className="nav-link">Login</Link></li> */}
          { localStorage.getItem("appClientId") ? <li><button onClick={signOut}>Logout</button></li> : '' }
        </ul>
        </nav>
        <hr />
        {children}
    </>
  );
};

export default Layout;
