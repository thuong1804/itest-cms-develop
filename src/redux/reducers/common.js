import { handleActions } from "redux-actions";
import { commonActionTypes } from "../actions";

const {SHOW_ALERT_MESSAGE} = commonActionTypes;

const initialState = {
    alertMessageProps: {
        message: '',
        type: 'error',
    }
}

const common = handleActions(
  {
    [SHOW_ALERT_MESSAGE]: (state, action) => {
      return {
        ...state,
        alertMessageProps: action.payload,
      };
    },
  },
  initialState
);

export default common;