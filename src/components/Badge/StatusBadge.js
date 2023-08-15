import { Badge } from 'antd';
import { commonStatus } from '@/constants';

const metadatas = {
    [commonStatus.ACTIVE]: {
        color: 'green', text: 'Active'
    },
    [commonStatus.INACTIVE]: {
        color: 'yellow', text: 'Inactive'
    },
    [commonStatus.LOCK]: {
        color: 'red', text: 'Lock'
    }
}
const StatusBadge = ({ status }) => {
    const metadata = metadatas[status];
    if (!metadata)
        return null;
    return (
        <Badge {...metadata} />
    )
}

export default StatusBadge;