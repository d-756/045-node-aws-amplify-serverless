/**
 * @author Sterling Smith
 * @description API.{TYPE}(`apiName`, `Path`)
 */

import { API, Auth } from 'aws-amplify';

const create = () => {
    const getApplications = () => API.get('xGenMarketAPI', '/applications');
    const getSubscriptions = (token) => {
        let init = { 
            headers: { Authorization: `Bearer ${token}` }
        }
        return API.get('xGenMarketAPI', '/subscriptions', init);
    };
    // const getSubscriptions = () => API.get('xGenMarketAPI', '/subscriptions');
    const setSubscription = (payload) => {
        // console.log("setSubscription api--------", payload.userId, payload.token, payload.appId)
        let init = {
            headers: {
                Authorization: `Bearer ${payload.token}`,
            },
            body: {
                userId: payload.userId,
                appId: payload.appId,
            }
        }
        return API.post('xGenMarketAPI', '/subscriptions', init)
    };
    const cancelSubscription = (payload) => {
        // console.log("--------subscription ID:", payload)
        let init = {
            headers: {
                Authorization: `Bearer ${payload.token}`,
            },
            body: {
                id: payload.id
            }
        }
        return API.del('xGenMarketAPI', '/subscriptions', init)
    };
    return {
        getApplications,
        getSubscriptions,
        setSubscription,
        cancelSubscription,
    }
}

export default {
    create,
}
