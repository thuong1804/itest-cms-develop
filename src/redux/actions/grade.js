import { createAction } from "redux-actions";

export const actionTypes = {
    GET_LIST: 'grade/GET_LIST',
    GET_DETAIL: 'grade/GET_DETAIL',
    CREATE: 'grade/CREATE',
    UPDATE: 'grade/UPDATE',
    DELETE: 'grade/DELETE'
}

export const actions = {
    getList: createAction(actionTypes.GET_LIST),
    getDetail: createAction(actionTypes.GET_DETAIL),
    create: createAction(actionTypes.CREATE),
    update: createAction(actionTypes.UPDATE),
    delete: createAction(actionTypes.DELETE)
}