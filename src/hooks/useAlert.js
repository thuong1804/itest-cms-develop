import { commonActions } from "@/redux/actions";
import { useDispatch, useSelector } from "react-redux";


const useAlert = () => {
    const dispatch = useDispatch();
    const alertProps = useSelector(state => state.common.alertMessageProps);

    const showAlertMessage = (options) => {
        dispatch(commonActions.showAlertMessage(options));
    }

    return {
        alertMessageProps: alertProps,
        showAlertMessage,
    }
}

export default useAlert;