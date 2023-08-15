import { handleActions } from 'redux-actions';
import { packageActionTypes } from '../actions';
import { createSuccessActionType } from '../helper';

const {
    GET_LIST

} = packageActionTypes;

const initialState = {
    packages: []
};

const packageReducer = handleActions(
    {
        [createSuccessActionType(GET_LIST)]: (state, action) => {
            return {
                ...state,
                packages: action.payload.data || [],
            };
        },
    },
    initialState
);

export default packageReducer;