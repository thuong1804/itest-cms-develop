import { createAction } from 'redux-actions';

export const actionTypes = {
    GET_LIST: 'package/GET_LIST',
}

export const actions = {
    getList: createAction(actionTypes.GET_LIST),
}

