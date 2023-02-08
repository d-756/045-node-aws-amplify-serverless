import { takeEvery, takeLatest, all } from 'redux-saga/effects';
import { AppTypes } from '../actions/app';
import API from '../services/api';

import {
    loginRequest,
    logoutRequest,
    getapplicationsRequest,
    getsubscriptionsRequest,
    setsubscriptionRequest,
    cancelsubscriptionRequest,
} from './app'

const api = API.create();

export default function* root() {
    yield all([
        // ------------------------- App Sagas
        takeLatest(AppTypes.LOGIN_REQUEST, loginRequest, api),
        takeLatest(AppTypes.LOGOUT_REQUEST, logoutRequest, api),
        takeLatest(AppTypes.GETAPPLICATIONS_REQUEST, getapplicationsRequest, api),
        takeLatest(AppTypes.GETSUBSCRIPTIONS_REQUEST, getsubscriptionsRequest, api),
        takeLatest(AppTypes.SETSUBSCRIPTION_REQUEST, setsubscriptionRequest, api),
        takeLatest(AppTypes.CANCELSUBSCRIPTION_REQUEST, cancelsubscriptionRequest, api),
    ])
}