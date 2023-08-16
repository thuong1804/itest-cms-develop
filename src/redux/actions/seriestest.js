import { createAction } from 'redux-actions';

export const actionTypes = {
    GET_LIST: 'seriestest/GET_LIST',
    GET_DETAIL: 'seriestest/GET_DETAIL',
    CREATE: 'seriestest/CREATE',
    UPDATE: 'seriestest/UPDATE',
    DELETE: 'seriestest/DELETE',
    SYNC_EDU_HOME: 'seriestest/SYNC_EDU_HOME',
    GET_ALL_LIST: 'seriestest/GET_ALL_LIST',
}

export const actions = {
    getList: createAction(actionTypes.GET_LIST),
    getDetail: createAction(actionTypes.GET_DETAIL),
    create: createAction(actionTypes.CREATE),
    update: createAction(actionTypes.UPDATE),
    delete: createAction(actionTypes.DELETE),
    syncEduHome: createAction(actionTypes.SYNC_EDU_HOME),
    getAllList: createAction(actionTypes.GET_ALL_LIST),
}
