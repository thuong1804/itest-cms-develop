import { notification } from 'antd';

const useNotification = () => {

    const showSuccessMessage = (content) => {
        notification.success({
            message: 'Success',
            description: content,
            // placement: 'bottomRight'
        });
    }
    
    const showErrorMessage = (content) => {
        notification.error({
            message: 'Error',
            description: content,
            // placement: 'bottomRight'
        });
    }
    
    const showWarningMessage = (content) => {
        notification.warning({
            message: 'Error Message',
            description: content,
            // placement: 'bottomRight'
        });
    }

    return {
        showSuccessMessage,
        showWarningMessage,
        showErrorMessage
    }
}

export default useNotification;