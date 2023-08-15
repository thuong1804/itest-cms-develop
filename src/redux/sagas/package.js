import { takeLatest } from 'redux-saga/effects';

import { packageActionTypes } from '@/redux/actions';
import apiConfig from '@/constants/apiConfig';

import { processLoadingAction } from '../helper';

const {
    GET_LIST,
} = packageActionTypes;

const getList = (action) => {
    return processLoadingAction(apiConfig.package.getList, action);
}

const packageSagas = [
    takeLatest(GET_LIST, getList),
];

export default packageSagas;