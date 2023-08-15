import { ListPageContainer } from '@/components';
import { adminActions } from '@/redux/actions';
import paths from '@/constants/paths';
import { formatDate } from '@/utils/date';

import styles from "./ListPage.module.scss";

const ListPage = () => {

    return (
        <ListPageContainer
            objectName="tài khoản"
            detailUrl ={paths.adminDetail}
            createUrl={paths.adminCreate}
            breadcrumbs={[
                { breadcrumbName: 'Quản lý user'},
                { breadcrumbName: 'Danh sách administrator' }
            ]}
            columns={[
                { title: 'Tên đăng nhập', dataIndex: 'username', className: styles.columnWidth },
                { title: 'E-mail', dataIndex: 'email', className: styles.columnWidth },
                { title: 'Số điện thoại', dataIndex: 'phone' },
                { title: 'Họ và tên', dataIndex: 'fullName' },
                { title: 'Đối tượng', dataIndex: ["role", "name"] },
                { 
                    title: 'Ngày tạo',
                    dataIndex: 'createdDate',
                    render: (createdDate) => <>{formatDate(createdDate)}</>
                },
            ]}
            searchFields={[{ key: 'search', searchPlaceholder: 'Tìm kiếm theo email/SĐT/Tên đăng nhập/Họ và tên' },]}
            actionBar={{
                isEdit: true,
                isCreate: true,
                isDelete: true,
                isUpdateStatus: true,
            }}
            getListAction={adminActions.getList}
            deleteAction={adminActions.delete}
            updateStatusAction={adminActions.updateStatus}
        >
        </ListPageContainer>

    )
}

export default ListPage;