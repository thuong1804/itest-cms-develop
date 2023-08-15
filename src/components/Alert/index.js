import { useAlert } from "@/hooks";
import { Alert } from "antd";

const AlertMessage = ({message, ...rest}) => {
    const {showAlertMessage} = useAlert();

    return (
        message ? 
            <Alert
                message={message}
                closable
                showIcon
                afterClose={() => showAlertMessage({})}
                {...rest}
            />
            : 
            null
    )
}

export default AlertMessage;