import { ListPageContainer } from '@/components';
import { adminActions } from '@/redux/actions';
import paths from '@/constants/paths';
import { Switch, Modal } from 'antd';

const {confirm} = Modal;

const ListPage = () => {
    const onConfirmDeActive = () => {
        confirm({
            title: `Are you sure delete this?`,
            content: '',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
            },
            onCancel() {
            },
        });
    }
    return (
        <ListPageContainer
            objectName="Administrator"
            detailUrl ={paths.teacherPackageDetail}
            breadcrumbs={[
                { breadcrumbName: 'Gói dịch vụ cho Giáo viên' },
            ]}
            columns={[
                { title: 'Tên gói', dataIndex: 'username' },
                { title: 'Giá/tháng', dataIndex: 'email' },
                { 
                    title: 'Trạng thái', dataIndex: 'role', 
                    render: status => 
                                    <Switch 
                                        onChange={status ? onConfirmDeActive : undefined} 
                                        checked={status}/> 
                },
            ]}
            actionBar={{
                isEdit: true,
            }}
            getListAction={adminActions.getList}
        >
        </ListPageContainer>

    )
}

export default ListPage;