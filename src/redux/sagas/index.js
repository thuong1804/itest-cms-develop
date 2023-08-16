import { all } from 'redux-saga/effects';

import account from './account';
import admin from './admin';
import teacher from "./teacher";
import packageSaga from "./package";
import order from "./order";
import grade from "./grade";
import series from "./series";
import question from "./question";
import gradetest from "./gradetest";
import seriesTestSagsas from './seriestest'

const sagas = [
    ...account,
    ...admin,
    ...teacher,
    ...packageSaga,
    ...order,
    ...grade,
    ...series,
    ...question,
    ...gradetest,
    ...seriesTestSagsas
];

function* rootSaga() {
    yield all(sagas);
}

export default rootSaga;