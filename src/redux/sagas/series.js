import { takeLatest } from 'redux-saga/effects';

import { seriesActionTypes } from '@/redux/actions';
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
} = seriesActionTypes;

const getList = (action) => {
    return processCallbackAction(apiConfig.series.getList, action);
}

const getDetail = ({payload}) => {
    const {params, onCompleted, onError} = payload;
    const apiOptions = {
        ...apiConfig.series.getDetail,
        path: apiConfig.series.getDetail.path.replace(':id', params.id)
    }
    return processCallbackAction(apiOptions, {payload: {params: {}, onCompleted, onError}});
}

const create = (action) => {
    return processCallbackAction(apiConfig.series.create, action);
}

const update = (action) => {
    return processCallbackAction(apiConfig.series.update, action);
}

const deleteTeacher = ({payload}) => {
    const {params, onCompleted, onError} = payload;
    const apiOptions = {
        ...apiConfig.series.delete,
        path: apiConfig.series.delete.path.replace(':id', params.id)
    }
    return processCallbackAction(apiOptions, {payload: {params: {}, onCompleted, onError}});
}

const syncEduHome = (action) => {
    return processCallbackAction(apiConfig.series.syncEduHome, action);
}

const getAllList = (action) => {
    return processLoadingAction(apiConfig.series.getAllList, action);
}

const seriesSagas = [
    takeLatest(GET_LIST, getList),
    takeLatest(CREATE, create),
    takeLatest(GET_DETAIL, getDetail),
    takeLatest(UPDATE, update),
    takeLatest(DELETE, deleteTeacher),
    takeLatest(SYNC_EDU_HOME, syncEduHome),
    takeLatest(GET_ALL_LIST, getAllList),
];

export default seriesSagas;