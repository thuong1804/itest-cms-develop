import { Space, Switch, Modal, Typography } from "antd";
import { ListPageContainer } from "@/components";
import { fieldTypes } from "@/constants";
import { statusDDL, teacherSourceDDL } from "@/constants/masterData";
import paths from "@/constants/paths";
import { adminActions } from "@/redux/actions";

import { ClockCircleFilled } from "@ant-design/icons";

const { Text } = Typography;
const {confirm} = Modal;

const ListPage = () => {
    const onConfirmDeActiveAccount = () => {
        confirm({
            title: `Xác nhận ngừng kích hoạt tài khoản người dùng`,
            content: <div>Thao tác này sẽ ngừng kích hoạt tài khoản.
                            Người dùng này sẽ không thể truy cập vào hệ thống i-Test cho đến khi được kích hoạt tài khoản trở lại.
                            <br/>    
                            <br/> 
                            Bạn có chắc chắn muốn thực hiện?
                        </div>,
            okText: 'Xác nhận',
            okType: 'primary',
            cancelText: 'Hủy',
            onOk: () => {
            },
            onCancel() {
            },
        });
    }

    return (
        <ListPageContainer
            objectName="Giáo viên"
            detailUrl ={paths.teacherDetail}
            createUrl={paths.teacherCreate}
            breadcrumbs={[
                { breadcrumbName: 'Quản lý thanh toán' }
            ]}
            columns={[
                { 
                    title: 'Mã giao dịch',
                    dataIndex: 'username',
                    render: () => (
                        <Space direction="vertical" size={1}>
                            <b style={{fontSize: 14, opacity: 0.8}}>Ju20170801204621</b>
                            <span style={{fontSize: 12, opacity: 0.8}}>
                                <ClockCircleFilled style={{ opacity: 0.5}}/> 27/10/2023 14:30
                            </span>
                        </Space>
                    )
                },
                { 
                    title: 'Khách hàng',
                    dataIndex: 'email',
                    render: (email, row) => (
                        <Space direction="vertical" size={1}>
                            <Text style={{color: "#1890FF"}}>{row.fullname}</Text>
                            <Text>{email}</Text>
                            <Text>{row.username}</Text>
                        </Space>
                    )
                },
                { title: 'Giá trị', dataIndex: 'phone' },
                { title: 'Phương thức thanh toán', dataIndex: 'fullname' },
                { 
                    title: 'Trạng thái', dataIndex: 'status', 
                    render: status => 
                                    <Switch checked={status} disabled/> 
                },
                { title: 'Nội dung giao dịch', dataIndex: 'createDate' },
            ]}
            searchFields={[
                { key: 'username', searchPlaceholder: 'Tìm kiếm theo tên banner' },
                {
                    key: 'status',
                    searchPlaceholder: 'Gói đang sử dụng',
                    gridCol: 4,
                    fieldType: fieldTypes.SELECT,
                    options: statusDDL,
                },
                {
                    key: 'status1',
                    searchPlaceholder: 'Người tạo',
                    gridCol: 4,
                    fieldType: fieldTypes.SELECT,
                    options: teacherSourceDDL,
                },
                {
                    key: 'status2',
                    searchPlaceholder: 'Trạng thái',
                    gridCol: 4,
                    fieldType: fieldTypes.SELECT,
                    options: statusDDL,
                },
            ]}
            actionBar={{
                isCreate: true,
                isEdit: true,
                isDelete: true,
            }}
            // getListAction={adminActions.getList}
            deleteAction={adminActions.delete}
        />
    )
}

export default ListPage;