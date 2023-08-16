import { takeLatest } from 'redux-saga/effects';

import { seriesActionTypesTest } from '@/redux/actions';
import apiConfig from '@/constants/apiConfig';

import { processCallbackAction, processLoadingAction } from '../helper';

const {
    GET_LIST,
    GET_DETAIL,
    CREATE,
    UPDATE,
    DELETE,
    SYNC_EDU_HOME,
    GET_ALL_LIST,
} = seriesActionTypesTest;

const getList = (action) => {
    return processCallbackAction(apiConfig.seriestest.getList, action);
}
const getDetail = ({ payload }) => {
    const { params, onCompleted, onError } = payload;
    const apiOptions = {
        ...apiConfig.seriestest.getDetail,
        path: apiConfig.seriestest.getDetail.path.replace(':id', params.id)
    }
    return processCallbackAction(apiOptions, { payload: { params: {}, onCompleted, onError } });
}

const create = (action) => {
    return processCallbackAction(apiConfig.seriestest.create, action);
}

const update = (action) => {
    return processCallbackAction(apiConfig.seriestest.update, action);
}

const deleteTeacher = ({ payload }) => {
    const { params, onCompleted, onError } = payload;
    const apiOptions = {
        ...apiConfig.seriestest.delete,
        path: apiConfig.seriestest.delete.path.replace(':id', params.id)
    }
    return processCallbackAction(apiOptions, { payload: { params: {}, onCompleted, onError } });
}

const syncEduHome = (action) => {
    return processCallbackAction(apiConfig.seriestest.syncEduHome, action);
}

const getAllList = (action) => {
    return processLoadingAction(apiConfig.seriestest.getAllList, action);
}

const seriesTestSagsas = [
    takeLatest(GET_LIST, getList),
    takeLatest(CREATE, create),
    takeLatest(GET_DETAIL, getDetail),
    takeLatest(UPDATE, update),
    takeLatest(DELETE, deleteTeacher),
    takeLatest(SYNC_EDU_HOME, syncEduHome),
    takeLatest(GET_ALL_LIST, getAllList),
];

export default seriesTestSagsas;