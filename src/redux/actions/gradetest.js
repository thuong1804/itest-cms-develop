import { createAction } from "redux-actions";

export const actionTypes = {
    GET_LIST: 'gradetest/GET_LIST',
    GET_DETAIL: 'gradetest/GET_DETAIL',
    CREATE: 'grade/CREATE',
    UPDATE: 'grade/UPDATE',
    DELETE: 'teacher/DELETE',
}
export const actions = {
    getList: createAction(actionTypes.GET_LIST),
    getDetail: createAction(actionTypes.GET_DETAIL),
    create: createAction(actionTypes.CREATE),
    update: createAction(actionTypes.UPDATE),
    delete: createAction(actionTypes.DELETE)
}