import { createAction } from "redux-actions"

export const actionTypes = {
    SHOW_ALERT_MESSAGE: 'common/SHOW_ALERT_MESSAGE',
}

export const actions = {
    showAlertMessage: createAction(actionTypes.SHOW_ALERT_MESSAGE),
}

