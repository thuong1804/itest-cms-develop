import { takeLatest } from 'redux-saga/effects';

import { gradeActionTypesTest } from '../actions';
import apiConfig from '@/constants/apiConfig';

import { processCallbackAction } from '../helper';


const {
    GET_LIST,
    GET_DETAIL,
    CREATE,
    UPDATE,
    DELETE,
} = gradeActionTypesTest;

const getList = (action) => {
    return processCallbackAction(apiConfig.gradetest.getList, action);
}
const getDetail = ({ payload }) => {
    const { params, onCompleted, onError } = payload;
    const apiOptions = {
        ...apiConfig.gradetest.getDetail,
        path: apiConfig.gradetest.getDetail.path.replace(':id', params.id)
    }
    return processCallbackAction(apiOptions, { payload: { params: {}, onCompleted, onError } });
}

const create = (action) => {
    return processCallbackAction(apiConfig.gradetest.create, action);
}

const update = (action) => {
    return processCallbackAction(apiConfig.gradetest.update, action);
}

const deleteGradeTest = ({ payload }) => {
    const { params, onCompleted, onError } = payload;
    const apiOptions = {
        ...apiConfig.gradetest.delete,
        path: apiConfig.gradetest.delete.path.replace(':id', params.id)
    }
    return processCallbackAction(apiOptions, { payload: { params: {}, onCompleted, onError } });
}

const gradeTestSagas = [
    takeLatest(GET_LIST, getList),
    takeLatest(CREATE, create),
    takeLatest(GET_DETAIL, getDetail),
    takeLatest(UPDATE, update),
    takeLatest(DELETE, deleteGradeTest),
];

export default gradeTestSagas;