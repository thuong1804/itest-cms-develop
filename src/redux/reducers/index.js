import { combineReducers } from 'redux';

import loading from './loading';
import account from './account';
import admin from './admin';
import common from "./common";
import packageReducer from "./package";
import series from "./series";

const rootReducer = combineReducers({
    loading,
    account,
    admin,
    common,
    packageReducer,
    series,
});
export default rootReducer;