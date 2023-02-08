import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import AppActions from '../../actions/app';
import { makeStyles } from '@material-ui/core/styles';
import LoadingAnimation from '../../components/LoadingAnimation';
import { equals, isEmpty } from 'ramda'

import ApplicationList from '../../components/ApplicationList';

const useStyles = makeStyles({
    root: {
      width: '100%',
      padding: 30
    },
});

function ApplciationDashboard(props) {
    const classes = useStyles();

    const [appData, setAppData] = useState([]);
    const authenticatedAppData = (apps, subs) => {
        const userSubs = subs.filter(item => item.userId === props.userId);
        const appIdArray = userSubs.map(item => {
            return {
                subId: item.id,
                appId: item.appId
            }
        });
        let authenticatedAllApps = [];
    
        apps.forEach(item => {
            const subscribedAppRow = appIdArray.find(ele => item.id === ele.appId);
            if (subscribedAppRow) {
                authenticatedAllApps.push({
                    ...item,
                    isSubscribed: true,
                    subId: subscribedAppRow.subId
                });
            } else {
                authenticatedAllApps.push({
                    ...item,
                    isSubscribed: false
                });
            }
        })

        return authenticatedAllApps;
    }

    useEffect(() => {
        props.getApplications();
    }, []);

    useEffect(() => {
        const { apps, subs, isAuthenticated } = props;
        setAppData(isAuthenticated ? authenticatedAppData(apps, subs) : apps);
    }, [props.apps, props.subs, props.isAuthenticated]);

    return (
        <div className={classes.root} align="center">
            <LoadingAnimation loading={props.isBusy} />
            <ApplicationList appData={appData} />
        </div>
    );
}

const mapStateToProps = state => ({
    isBusy: equals(state.app.status, 'pending'),
    isAuthenticated: state.app.isAuthenticated,
    token: state.app.token,
    userId: state.app.userId,
    apps: state.app.applications,
    subs: state.app.subscriptions,
})

const mapDispatchToProps = dispatch => ({
    getApplications: () => dispatch(AppActions.getapplicationsRequest()),
    // setSubscription: (payload) => dispatch(AppActions.setsubscriptionRequest(payload)),
    // cancelSubscription: (payload) => dispatch(AppActions.cancelsubscriptionRequest(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ApplciationDashboard);