import { takeLatest } from 'redux-saga/effects';

import { questionActionTypes } from '@/redux/actions';
import apiConfig from '@/constants/apiConfig';

import { processCallbackAction } from '../helper';

const {
    GET_LIST,
    GET_DETAIL,
    CREATE,
    UPDATE,
    DELETE,
    UPDATE_STATUS,
} = questionActionTypes;

const getList = (action) => {
    return processCallbackAction(apiConfig.question.getList, action);
}

const getDetail = ({ payload }) => {
    const { params, onCompleted, onError } = payload;
    const apiOptions = {
        ...apiConfig.question.getDetail,
        path: apiConfig.question.getDetail.path.replace(':id', params.id)
    }
    return processCallbackAction(apiOptions, { payload: { params: {}, onCompleted, onError }});
}

const create = (action) => {
    return processCallbackAction(apiConfig.question.create, action);
}

const update = (action) => {
    return processCallbackAction(apiConfig.question.update, action);
}

const deleteTeacher = ({ payload }) => {
    const { params, onCompleted, onError } = payload;
    const apiOptions = {
        ...apiConfig.question.delete,
        path: apiConfig.question.delete.path.replace(':id', params.id)
    }
    return processCallbackAction(apiOptions, { payload: { params: {}, onCompleted, onError }});
}

const updateStatus = (action) => {
    return processCallbackAction(apiConfig.question.updateStatus, action);
}

const questionSagas = [
    takeLatest(GET_LIST, getList),
    takeLatest(CREATE, create),
    takeLatest(GET_DETAIL, getDetail),
    takeLatest(UPDATE, update),
    takeLatest(DELETE, deleteTeacher),
    takeLatest(UPDATE_STATUS, updateStatus),
];

export default questionSagas;