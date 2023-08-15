import { handleActions } from 'redux-actions';
import { adminActionTypes } from '../actions';
import { createSuccessActionType } from '../helper';

const {
    GET_ROLE_LIST

} = adminActionTypes;

const initialState = {
    roles: []
};

const admin = handleActions(
    {
        [createSuccessActionType(GET_ROLE_LIST)]: (state, action) => {
            return {
                ...state,
                roles: action.payload.data || [],
            };
        },
    },
    initialState
);

export default admin;