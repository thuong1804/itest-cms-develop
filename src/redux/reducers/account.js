import { handleActions } from 'redux-actions';
import { accountActionTypes } from '../actions';
import { createSuccessActionType, createFailureActionType } from '../helper';

const {
    GET_PROFILE,
    REFRESH_TOKEN,
    REFRESHING_TOKEN,
    UPDATE_PROFILE_LOCAL,

} = accountActionTypes;

const initialState = {
    profileData: null,
    isRefreshingToken: false
};

const account = handleActions(
    {
        [createSuccessActionType(GET_PROFILE)]: (state, action) => {
            return {
                ...state,
                profileData: action.payload.data,
                isGetTokenForGamePlaySuccess: true
            };
        },
        [createFailureActionType(GET_PROFILE)]: (state, action) => {
            return {
                ...state,
                profileData: null,
                isGetTokenForGamePlaySuccess: false
            };
        },
        [REFRESHING_TOKEN]: (state, action) => {
            return {
                ...state,
                isRefreshingToken: action.payload
            };
        },
        [REFRESH_TOKEN]: (state, action) => {
            return {
                ...state,
                isRefreshingToken: false
            };
        },
        [UPDATE_PROFILE_LOCAL]: (state, action) => {
            return {
                ...state,
                profileData: action.payload.data,
            };
        },
    },
    initialState
);

export default account;