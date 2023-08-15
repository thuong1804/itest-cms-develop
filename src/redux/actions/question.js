import { createAction } from 'redux-actions';

export const actionTypes = {
    GET_LIST: 'question/GET_LIST',
    GET_DETAIL: 'question/GET_DETAIL',
    CREATE: 'question/CREATE',
    UPDATE: 'question/UPDATE',
    DELETE: 'question/DELETE',
    UPDATE_STATUS: 'question/UPDATE_STATUS',
}

export const actions = {
    getList: createAction(actionTypes.GET_LIST),
    getDetail: createAction(actionTypes.GET_DETAIL),
    create: createAction(actionTypes.CREATE),
    update: createAction(actionTypes.UPDATE),
    delete: createAction(actionTypes.DELETE),
    updateStatus: createAction(actionTypes.UPDATE_STATUS),
}

