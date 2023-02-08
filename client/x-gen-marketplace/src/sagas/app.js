import { call, put, select } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { history } from '../reducers';
import AppActions from '../actions/app'
// import { UserRoles } from '../services/config'

export function* loginRequest(api, action) {
    const { payload } = action
    const { user, token } = payload
    if(user && token) {
      // console.log(token);
        yield put(AppActions.loginSuccess({ user, token }))
        yield put(AppActions.getsubscriptionsRequest({token}))
        yield call(history.push, '/apps')
    }
    else {
        yield put(AppActions.loginFailure())
    }
}

export function* logoutRequest(api, action) {
  yield put(AppActions.clearRequest())
  yield put(AppActions.logoutSuccess())
  yield put(AppActions.getapplicationsRequest())
  yield call(history.push, '/apps')
}

export function* getapplicationsRequest(api) {
  const response = yield api.getApplications();
  if (response.statusCode === 200) {
    const res = JSON.parse(response.body)
    yield put(AppActions.getapplicationsSuccess(res))
  } else {
    yield put(AppActions.getapplicationsFailure())
    toast.error('Oops, Your action cannot be completed!. Please try again', {
      position: toast.POSITION.TOP_CENTER,
    })
  }
}

export function* getsubscriptionsRequest(api, action) {
  const { payload } = action;
  // console.log("getSubscriptions:", payload);
  const response = yield api.getSubscriptions(payload.token);
  // console.log("getSubscriptions Response:", response);
  if (response.statusCode === 200) {
    const res = JSON.parse(response.body)
    // console.log("getSubscriptions Response:", res);
    yield put(AppActions.getsubscriptionsSuccess(res))
  } else {
    yield put(AppActions.getsubscriptionsFailure())
    toast.error('Oops, Your action cannot be completed!. Please try again', {
      position: toast.POSITION.TOP_CENTER,
    })
  }
}

export function* setsubscriptionRequest(api, action) {
  const { payload } = action;
  // console.log("setsubscribe", payload);
  const response = yield api.setSubscription(payload);
  // console.log("setsubscribe response---------", response);
  if (response.statusCode === 200) {
    yield put(AppActions.getsubscriptionsRequest({token: payload.token}))
  } else {
    yield put(AppActions.setsubscriptionFailure())
    toast.error('Oops, Your action cannot be completed!. Please try again', {
      position: toast.POSITION.TOP_CENTER,
    })
  }
}

export function* cancelsubscriptionRequest(api, action) {
  const { payload } = action; 
  // console.log("cancelsubscribe", payload);
  const response = yield api.cancelSubscription(payload);
  if (response.statusCode === 200) {
    // console.log("cancelsubscribe token", payload.token);
    yield put(AppActions.getsubscriptionsRequest({token: payload.token}))
  } else {
    yield put(AppActions.getsubscriptionsFailure())
    toast.error('Oops, Your action cannot be completed!. Please try again', {
      position: toast.POSITION.TOP_CENTER,
    })
  }
}