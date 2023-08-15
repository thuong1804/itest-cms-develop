import { Modal } from 'antd';
import { ListPageContainer, TextField } from '@/components';
import { adminActions } from '@/redux/actions';
import paths from '@/constants/paths';
import { fieldTypes } from '@/constants';

import globalIcon from "@/assets/images/global.svg";
import { useParams } from 'react-router-dom';

const {confirm} = Modal;

const ListPage = () => {
    const {id} = useParams();
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
                { breadcrumbName: 'Gói dịch vụ cho Giáo viên', path: paths.teacherPackageList },
                { breadcrumbName: 'Gói phổ thông' }
            ]}
            columns={[
                { title: 'Mã đề thi', dataIndex: 'username' },
                { title: 'Tên đề thi', dataIndex: 'email' },
                { title: 'Nhóm đề thi', dataIndex: 'role' },
                { title: 'Chương trình', dataIndex: 'username' },
                { title: 'Khối lớp', dataIndex: 'email' },
                { title: 'Danh mục đề thi', dataIndex: 'role' },
                { 
                    title: 'Thứ tự',
                    dataIndex: 'username',
                    render: (username) => {
                        return <TextField defaultValue={username}/>
                    }
                },
                { 
                    title: 'Trạng thái',
                    dataIndex: 'username',
                    render: (id) => {
                       return <div style={{textAlign: 'center'}}>
                            <img src={globalIcon} alt="privacy"/>
                       </div>
                    }
                },
            ]}
            searchFields={[
                { key: 'username', gridCol: 4, searchPlaceholder: 'Tìm kiếm theo mã/tên đề thi' },
                {
                    key: 'status',
                    searchPlaceholder: 'Gói đang sử dụng',
                    gridCol: 4,
                    fieldType: fieldTypes.SELECT,
                    mode: 'multiple',
                },
                {
                    key: 'status1',
                    searchPlaceholder: 'Nguồn',
                    gridCol: 4,
                    fieldType: fieldTypes.SELECT,
                },
                {
                    key: 'status2',
                    searchPlaceholder: 'Gói đang sử dụng',
                    gridCol: 4,
                    fieldType: fieldTypes.SELECT,
                    mode: 'multiple',
                },
                {
                    key: 'status3',
                    searchPlaceholder: 'Nguồn',
                    gridCol: 4,
                    fieldType: fieldTypes.SELECT,
                },
            ]}
            actionBar={{
            }}
            buttonActions={[
                {
                    label: 'Chỉnh sửa phạm vi dữ liệu gói ',
                    href: paths.teacherScopePackageUpdate.replace(":id", id),
                    ghost: "ghost",
                },
                {
                    label: 'Cập nhật thứ tự đề thi',
                }
            ]}
            getListAction={adminActions.getList}
        >
        </ListPageContainer>

    )
}

export default ListPage;