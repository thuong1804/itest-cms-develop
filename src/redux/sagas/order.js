import { takeLatest } from 'redux-saga/effects';

import {orderActionTypes} from '@/redux/actions';
import apiConfig from '@/constants/apiConfig';

import { processCallbackAction } from '../helper';

const {
    GET_LIST,
} = orderActionTypes;

const getList = (action) => {
    return processCallbackAction(apiConfig.order.getList, action);
}

const adminSagas = [
    takeLatest(GET_LIST, getList),
];

export default adminSagas;