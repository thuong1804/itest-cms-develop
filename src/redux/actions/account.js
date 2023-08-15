import { createAction } from 'redux-actions';

export const actionTypes = {
    LOGOUT: 'account/LOGOUT',
    REMOVE_TOKEN: 'account/REMOVE_TOKEN',
    GET_PROFILE: 'account/GET_PROFILE',
    REFRESHING_TOKEN: 'account/REFRESHING_TOKEN',
    REFRESH_TOKEN: 'account/REFRESH_TOKEN',
    UPDATE_TOKEN: 'account/UPDATE_TOKEN',
    UPDATE_PROFILE: 'account/UPDATE_PROFILE',
    UPDATE_PROFILE_LOCAL: 'account/UPDATE_PROFILE_LOCAL',
    CHANGE_PASSWORD: 'account/CHANGE_PASSWORD',
}

export const actions = {
    logout: createAction(actionTypes.LOGOUT),
    removeToken: createAction(actionTypes.REMOVE_TOKEN),
    getProfile: createAction(actionTypes.GET_PROFILE),
    refreshingToken: createAction(actionTypes.REFRESHING_TOKEN),
    refreshToken: createAction(actionTypes.REFRESH_TOKEN),
    updateToken: createAction(actionTypes.UPDATE_TOKEN),
    updateProfile: createAction(actionTypes.UPDATE_PROFILE),
    updateProfileLocal: createAction(actionTypes.UPDATE_PROFILE_LOCAL),
    changePassword: createAction(actionTypes.CHANGE_PASSWORD),
}

