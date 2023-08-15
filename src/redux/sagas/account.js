import { put, takeLatest } from 'redux-saga/effects';

import { accountActions, accountActionTypes } from '@/redux/actions';
import { eraseCookie, setCookie } from '@/utils/localStorage';
import { storageKeys } from '@/constants';
import apiConfig from '@/constants/apiConfig';
import { processCallbackAction, processLoadingAction } from '../helper';
import paths from "@/constants/paths";

const {
    LOGOUT,
    REMOVE_TOKEN,
    UPDATE_TOKEN,
    GET_PROFILE,
    UPDATE_PROFILE,
    CHANGE_PASSWORD,
} = accountActionTypes;

const getProfile = (action) => {
    return processLoadingAction(apiConfig.account.getProfile, action);
}

const logout = (action) => {
    return processCallbackAction(apiConfig.account.logout, action);
}

const removeToken = (action) => {
    try {
        eraseCookie(storageKeys.ACCESS_TOKEN);
        eraseCookie(storageKeys.REFRESH_TOKEN);
        window.location.replace(paths.login);
    } catch (e) {
        console.log(e);
    }
}

function* updateToken(action) {
    const { accessToken, refreshToken, expirationInMs } = action.payload || {};
    if (accessToken && refreshToken && expirationInMs) {
        setCookie(storageKeys.ACCESS_TOKEN, accessToken, expirationInMs);
        setCookie(storageKeys.REFRESH_TOKEN, refreshToken, expirationInMs);
    }
    else {
        yield put(accountActions.removeToken());
    }
}

const updateProfile = (action) => {
    return processCallbackAction(apiConfig.account.updateProfile, action)
}

const changePassword = (action) => {
    return processCallbackAction(apiConfig.account.changePassword, action)
}

const accountSagas = [
    takeLatest(LOGOUT, logout),
    takeLatest(REMOVE_TOKEN, removeToken),
    takeLatest(UPDATE_TOKEN, updateToken),
    takeLatest(GET_PROFILE, getProfile),
    takeLatest(UPDATE_PROFILE, updateProfile),
    takeLatest(CHANGE_PASSWORD, changePassword),
];

export default accountSagas;