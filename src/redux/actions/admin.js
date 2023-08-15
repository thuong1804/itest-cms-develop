import { createAction } from 'redux-actions';

export const actionTypes = {
    GET_LIST: 'admin/GET_LIST',
    GET_ROLE_LIST: 'admin/GET_ROLE_LIST',
    GET_DETAIL: 'admin/GET_DETAIL',
    CREATE: 'admin/CREATE',
    UPDATE: 'admin/UPDATE',
    DELETE: 'admin/DELETE',
    UPDATE_STATUS: 'admin/UPDATE_STATUS',
}

export const actions = {
    getList: createAction(actionTypes.GET_LIST),
    getRoleList: createAction(actionTypes.GET_ROLE_LIST),
    getDetail: createAction(actionTypes.GET_DETAIL),
    create: createAction(actionTypes.CREATE),
    update: createAction(actionTypes.UPDATE),
    delete: createAction(actionTypes.DELETE),
    updateStatus: createAction(actionTypes.UPDATE_STATUS),
}

