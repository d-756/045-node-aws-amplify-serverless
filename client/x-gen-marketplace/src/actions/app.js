import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
    // login
    loginRequest: ['payload'],
    loginSuccess: ['response'],
    loginFailure: null,

    // logout
    logoutRequest: null,
    logoutSuccess: null,
    logoutFailure: null,

    // Clear all caches
    clearRequest: null,

    // get data from application table
    getapplicationsRequest: null,
    getapplicationsSuccess: ['response'],
    getapplicationsFailure: null,

    // get data from subscription table
    getsubscriptionsRequest: ['payload'],
    getsubscriptionsSuccess: ['response'],
    getsubscriptionsFailure: null,

    // subscribe
    setsubscriptionRequest: ['payload'],
    setsubscriptionSuccess: ['response'],
    setsubscriptionFailure: null,

    // unsubscribe
    cancelsubscriptionRequest: ['payload'],
    cancelsubscriptionSuccess: ['response'],
    cancelsubscriptionFailure: null,
})

export const AppTypes = Types
export default Creators
