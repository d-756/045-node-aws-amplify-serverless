import { createReducer } from 'reduxsauce'
import { produce } from 'immer'

import { AppTypes } from '../actions/app'

const initialState = {
    status: '',
    isAuthenticated: false,
    token: '',
    userId: '',
    applications: [],
    subscriptions: [],
}

// LOGIN
const loginRequest = produce((draft, action) => {
    draft.status = 'pending'
})

const loginSuccess = produce((draft, action) => {
    const { token, user } = action.response;
    draft.status = 'done'
    draft.isAuthenticated = true
    draft.token = token
    draft.userId = user.sub
});

const loginFailure = produce((draft, action) => {
    draft.status = 'error'
})

// LOGOUT
const logoutRequest = produce((draft, action) => {
    draft.status = 'pedding'
})
const logoutSuccess = produce((draft, action) => {
    draft.status = 'done'
})
const logoutFailure = produce((draft, action) => {
    draft.status = 'error'
})

// GET APPLICATION DATA
const getapplicationsRequest = produce((draft, action) => {
    draft.status = 'pending'
})
const getapplicationsSuccess = produce((draft, action) => {
    draft.status = 'done'
    draft.applications = action.response
})
const getapplicationsFailure = produce((draft, action) => {
    draft.status = 'error'
})

// GET SUBSCRIPTION DATA
const getsubscriptionsRequest = produce((draft) => {
    draft.status = 'pending'
})
const getsubscriptionsSuccess = produce((draft, action) => {
    draft.status = 'done'
    draft.subscriptions = action.response
})
const getsubscriptionsFailure = produce((draft) => {
    draft.status = 'error'
})

// SET SUBSCRIPTION
const setsubscriptionRequest = produce((draft) => {
    draft.status = 'pending'
})
const setsubscriptionSuccess = produce((draft, action) => {
    draft.status = 'done'
})
const setsubscriptionFailure = produce((draft) => {
    draft.status = 'error'
})

// CANCEL SUBSCRIPTION
const cancelsubscriptionRequest = produce((draft) => {
    draft.status = 'pending'
})
const cancelsubscriptionSuccess = produce((draft, action) => {
    draft.status = 'done'
})
const cancelsubscriptionFailure = produce((draft) => {
    draft.status = 'error'
})

// INITIALIZE STORE
const clearRequest = produce((draft, action) => (draft = initialState))

export const reducer = createReducer(initialState, {
    // LOGIN
    [AppTypes.LOGIN_REQUEST]: loginRequest,
    [AppTypes.LOGIN_SUCCESS]: loginSuccess,
    [AppTypes.LOGIN_FAILURE]: loginFailure,

    // LOGOUT
    [AppTypes.LOGOUT_REQUEST]: logoutRequest,
    [AppTypes.LOGOUT_SUCCESS]: logoutSuccess,
    [AppTypes.LOGOUT_FAILURE]: logoutFailure,

    // APPLICATIONS
    [AppTypes.GETAPPLICATIONS_REQUEST]: getapplicationsRequest,
    [AppTypes.GETAPPLICATIONS_SUCCESS]: getapplicationsSuccess,
    [AppTypes.GETAPPLICATIONS_FAILURE]: getapplicationsFailure,

    // SUBSCRIPTIONS
    [AppTypes.GETSUBSCRIPTIONS_REQUEST]: getsubscriptionsRequest,
    [AppTypes.GETSUBSCRIPTIONS_SUCCESS]: getsubscriptionsSuccess,
    [AppTypes.GETSUBSCRIPTIONS_FAILURE]: getsubscriptionsFailure,

    // SET SUBSCRIPTION
    [AppTypes.SETSUBSCRIPTION_REQUEST]: setsubscriptionRequest,
    [AppTypes.SETSUBSCRIPTION_SUCCESS]: setsubscriptionSuccess,
    [AppTypes.SETSUBSCRIPTION_FAILURE]: setsubscriptionFailure,

    // CANCEL SUBSCRIPTION
    [AppTypes.CANCELSUBSCRIPTION_REQUEST]: cancelsubscriptionRequest,
    [AppTypes.CANCELSUBSCRIPTION_SUCCESS]: cancelsubscriptionSuccess,
    [AppTypes.CANCELSUBSCRIPTION_FAILURE]: cancelsubscriptionFailure,

    [AppTypes.CLEAR_REQUEST]: clearRequest,
})
