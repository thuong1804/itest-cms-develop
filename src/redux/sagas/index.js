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
];

function* rootSaga() {
    yield all(sagas);
}

export default rootSaga;