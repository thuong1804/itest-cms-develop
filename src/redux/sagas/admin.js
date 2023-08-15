import { takeLatest } from 'redux-saga/effects';

import { adminActionTypes } from '@/redux/actions';
import apiConfig from '@/constants/apiConfig';

import { processCallbackAction, processLoadingAction } from '../helper';

const {
    GET_LIST,
    GET_ROLE_LIST,
    GET_DETAIL,
    CREATE,
    UPDATE,
    DELETE,
    UPDATE_STATUS,
} = adminActionTypes;

const getList = (action) => {
    return processCallbackAction(apiConfig.admin.getList, action);
}

const getRoleList = (action) => {
    return processLoadingAction(apiConfig.admin.getRoleList, action);
}

const getDetail = ({ payload }) => {
    const { params, onCompleted, onError } = payload;
    const apiOptions = {
        ...apiConfig.admin.getDetail,
        path: apiConfig.admin.getDetail.path.replace(':id', params.id)
    }
    return processCallbackAction(apiOptions, { payload: { params: {}, onCompleted, onError }});
}

const create = (action) => {
    return processCallbackAction(apiConfig.admin.create, action);
}

const update = (action) => {
    return processCallbackAction(apiConfig.admin.update, action);
}

const deleteAdmin = ({ payload }) => {
    const { params, onCompleted, onError } = payload;
    const apiOptions = {
        ...apiConfig.admin.delete,
        path: apiConfig.admin.delete.path.replace(':id', params.id)
    }
    return processCallbackAction(apiOptions, { payload: { params: {}, onCompleted, onError }});
}

const updateStatus = (action) => {
    return processCallbackAction(apiConfig.admin.updateStatus, action);
}

const adminSagas = [
    takeLatest(GET_LIST, getList),
    takeLatest(GET_ROLE_LIST, getRoleList),
    takeLatest(CREATE, create),
    takeLatest(GET_DETAIL, getDetail),
    takeLatest(UPDATE, update),
    takeLatest(DELETE, deleteAdmin),
    takeLatest(UPDATE_STATUS, updateStatus),
];

export default adminSagas;