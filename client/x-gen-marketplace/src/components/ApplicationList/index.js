import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AppActions from '../../actions/app';
import ApplicationDialog from '../ApplicationDialog';
import LoadingAnimation from '../LoadingAnimation';
import { equals, isEmpty } from 'ramda'

function ApplicationList(props) {
    const { appData, userId, isAuthenticated, history } = props;
    const [openSubscriptionModal, setOpenSubscriptionModal] = useState({});

    // Open subscription detail page
    const handleOpenSubscriptionModal = (e, id) => {
        e.stopPropagation();
        setOpenSubscriptionModal({
            [id]: true
        });
    };

    const handleCloseSubscriptionModal = (e, id) => {
        e.stopPropagation();
        setOpenSubscriptionModal(!openSubscriptionModal[id]);
    };

    // subscription event
    const onSubscription = (e, userId, appId) => {
        e.stopPropagation();
        props.setSubscription({userId, appId, token: props.token})
        handleCloseSubscriptionModal(e, appId)
    }

    const onCancelSubscription =  (e, appId, subId) => {
        e.stopPropagation();
        props.cancelSubscription({id: subId, token: props.token})
        handleCloseSubscriptionModal(e, appId);
    }

    const onGoToAuth = (e) => {
        e.stopPropagation();
        history.push('auth');
    }

    const onGoToApp = (app) => {
        window.open(`https://${app.domain}.xgenteam.com`);
    }

    return (
        <div align="center">
            <LoadingAnimation loading={props.isBusy} />
            <Grid container spacing={1}>
                { appData.length != 0 ? 
                    appData.map((item, index) => {
                        return (
                            <Grid key={index} item xs={12} sm={3} onClick={() => onGoToApp(item)}>
                                <Box bgcolor={ !item.isSubscribed ? "primary.main" : "secondary.main"} color="primary.contrastText" p={2} align='center'>
                                    <Typography variant="h4" gutterBottom align='center'>
                                        {item.name}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="default"
                                        onClick={(e) => isAuthenticated ? handleOpenSubscriptionModal(e, item.id) : onGoToAuth(e)}
                                    >
                                        { item.isSubscribed ? 'unSubscribe' : 'Subscribe'}
                                    </Button>
                                    <ApplicationDialog
                                        data={item}
                                        open={
                                            openSubscriptionModal[item.id] ? openSubscriptionModal[item.id] : false
                                        }
                                        onClose={(e) => handleCloseSubscriptionModal(e, item.id)}
                                        onConfirm={(e) => item.isSubscribed ? onCancelSubscription(e, item.id, item.subId): onSubscription(e, userId, item.id)} 
                                    />
                                </Box>
                            </Grid>
                        )
                    }) :
                    (
                        <>No Data!</>
                    )
                }
            </Grid>
        </div>
    );
}

const mapStateToProps = state => ({
    isBusy: equals(state.app.status, 'pending'),
    isAuthenticated: state.app.isAuthenticated,
    token: state.app.token,
    userId: state.app.userId,
    // apps: state.app.applications,
    // subs: state.app.subscriptions,
})

const mapDispatchToProps = dispatch => ({
    // getApplications: () => dispatch(AppActions.getapplicationsRequest()),
    setSubscription: (payload) => dispatch(AppActions.setsubscriptionRequest(payload)),
    cancelSubscription: (payload) => dispatch(AppActions.cancelsubscriptionRequest(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ApplicationList));