import { takeLatest } from 'redux-saga/effects';

import { gradeActionTypes } from '@/redux/actions';
import apiConfig from '@/constants/apiConfig';

import { processCallbackAction } from '../helper';

const {
    GET_LIST,
    GET_DETAIL,
    CREATE,
    UPDATE,
    DELETE,
} = gradeActionTypes;

const getList = (action) => {
    return processCallbackAction(apiConfig.grade.getList, action);
}

const getDetail = ({ payload }) => {
    const { params, onCompleted, onError } = payload;
    const apiOptions = {
        ...apiConfig.grade.getDetail,
        path: apiConfig.grade.getDetail.path.replace(':id', params.id)
    }
    return processCallbackAction(apiOptions, { payload: { params: {}, onCompleted, onError } });
}

const create = (action) => {
    return processCallbackAction(apiConfig.grade.create, action);
}

const update = (action) => {
    return processCallbackAction(apiConfig.grade.update, action);
}

const deleteGrade = ({ payload }) => {
    const { params, onCompleted, onError } = payload;
    const apiOptions = {
        ...apiConfig.grade.delete,
        path: apiConfig.grade.delete.path.replace(':id', params.id)
    }
    return processCallbackAction(apiOptions, { payload: { params: {}, onCompleted, onError } });
}

const gradeSagas = [
    takeLatest(GET_LIST, getList),
    takeLatest(CREATE, create),
    takeLatest(GET_DETAIL, getDetail),
    takeLatest(UPDATE, update),
    takeLatest(DELETE, deleteGrade),
];

export default gradeSagas;