import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react'

import AppActions from '../../actions/app'

function AmplifyAuth({
    login
}) {

    useEffect(() => {
        async function fetchMyAPI() {
            try {
                const userData = await Auth.currentAuthenticatedUser();
                const user = userData.attributes
                const token = userData.signInUserSession.idToken.jwtToken
                // console.log(userData);
                localStorage.setItem("token", token);
                await login({user, token});
            } catch (err) {
                console.log('error:', err);
            }
        }
        fetchMyAPI();
    });

    return (
        <div />
    )
}

const mapDispatchToProps = dispatch => ({
    login: (payload) => dispatch(AppActions.loginRequest(payload)),
})

export default withAuthenticator(connect(null, mapDispatchToProps)(AmplifyAuth), { usernameAlias: "email" });
