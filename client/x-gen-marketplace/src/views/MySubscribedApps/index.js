import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AppActions from '../../actions/app';
import { makeStyles } from '@material-ui/core/styles';

import ApplicationList from '../../components/ApplicationList';

const useStyles = makeStyles({
    root: {
      width: '100%',
      padding: 30
    },
});

function MySubscribedApps(props) {
    const classes = useStyles();
    const [appData, setAppData] = useState([]);

    const subscriptionData = (apps, subs, userId) => {
        let extendedSubs = [];
        const mySubs = subs.filter(item => item.userId === userId);
        mySubs.forEach(subscription => {
            const appElement = apps.filter(app => app.id == subscription.appId);
            extendedSubs.push({
                id: subscription.appId,
                name: appElement[0].name,
                description: appElement[0].description,
                domain: appElement[0].domain,
                isSubscribed: true,
                subId: subscription.id
            })
        })
        return extendedSubs;
    }

    useEffect(() => {
        const { apps, subs, userId } = props;
        setAppData(subscriptionData(apps, subs, userId));
    }, [props.subs]);

    return (
        <div className={classes.root} align="center">
            <ApplicationList appData={appData}/>
        </div>
    );
}

const mapStateToProps = state => ({
    userId: state.app.userId,
    apps: state.app.applications,
    subs: state.app.subscriptions,
})

export default connect(mapStateToProps, null)(MySubscribedApps);