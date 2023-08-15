import { takeLatest } from 'redux-saga/effects';

import { teacherActionTypes } from '@/redux/actions';
import apiConfig from '@/constants/apiConfig';

import { processCallbackAction } from '../helper';

const {
    GET_LIST,
    GET_DETAIL,
    CREATE,
    UPDATE,
    DELETE,
    UPDATE_STATUS,
} = teacherActionTypes;

const getList = (action) => {
    return processCallbackAction(apiConfig.teacher.getList, action);
}

const getDetail = ({ payload }) => {
    const { params, onCompleted, onError } = payload;
    const apiOptions = {
        ...apiConfig.teacher.getDetail,
        path: apiConfig.teacher.getDetail.path.replace(':id', params.id)
    }
    return processCallbackAction(apiOptions, { payload: { params: {}, onCompleted, onError }});
}

const create = (action) => {
    return processCallbackAction(apiConfig.teacher.create, action);
}

const update = (action) => {
    return processCallbackAction(apiConfig.teacher.update, action);
}

const deleteTeacher = ({ payload }) => {
    const { params, onCompleted, onError } = payload;
    const apiOptions = {
        ...apiConfig.teacher.delete,
        path: apiConfig.teacher.delete.path.replace(':id', params.id)
    }
    return processCallbackAction(apiOptions, { payload: { params: {}, onCompleted, onError }});
}

const updateStatus = (action) => {
    return processCallbackAction(apiConfig.teacher.updateStatus, action);
}

const teacherSagas = [
    takeLatest(GET_LIST, getList),
    takeLatest(CREATE, create),
    takeLatest(GET_DETAIL, getDetail),
    takeLatest(UPDATE, update),
    takeLatest(DELETE, deleteTeacher),
    takeLatest(UPDATE_STATUS, updateStatus),
];

export default teacherSagas;