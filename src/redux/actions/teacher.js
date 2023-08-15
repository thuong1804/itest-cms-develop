import { createAction } from 'redux-actions';

export const actionTypes = {
    GET_LIST: 'teacher/GET_LIST',
    GET_DETAIL: 'teacher/GET_DETAIL',
    CREATE: 'teacher/CREATE',
    UPDATE: 'teacher/UPDATE',
    DELETE: 'teacher/DELETE',
    UPDATE_STATUS: 'teacher/UPDATE_STATUS',
}

export const actions = {
    getList: createAction(actionTypes.GET_LIST),
    getDetail: createAction(actionTypes.GET_DETAIL),
    create: createAction(actionTypes.CREATE),
    update: createAction(actionTypes.UPDATE),
    delete: createAction(actionTypes.DELETE),
    updateStatus: createAction(actionTypes.UPDATE_STATUS),
}

