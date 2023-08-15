import { handleActions } from "redux-actions";
import { createSuccessActionType } from "@/redux/helper";
import { seriesActionTypes } from "@/redux/actions";

const {GET_ALL_LIST} = seriesActionTypes;

const initialStates = {
    seriesAll: [],
}

const series = handleActions({
        [createSuccessActionType(GET_ALL_LIST)]: (state, action) => {
            return {
                ...state,
                seriesAll: action.payload.data || [],
            };
        },
    },
    initialStates
)

export default series;