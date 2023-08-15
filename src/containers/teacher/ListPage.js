import { useState, useMemo, useEffect, useCallback } from "react";
import { Modal, Tag, Upload, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { ListPageContainer} from '@/components';
import { packageActions, teacherActions, packageActionTypes } from '@/redux/actions';
import { teacherSourceDDL } from '@/constants/masterData';
import { PACKAGES, fieldTypes, teacherSourceTypes } from '@/constants';
import paths from '@/constants/paths';
import { useNotification } from '@/hooks';
import { diffTimeLeft, formatDate } from "@/utils/date";

import { InboxOutlined } from '@ant-design/icons';

import styles from "./ListPage.module.scss";

// const {info} = Modal;

const ListPage = () => {
    // const { showAlertMessage } = useAlert();
    const {showErrorMessage} = useNotification();
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();

    const packages = useSelector((state) => state.packageReducer.packages);
    const packageLoading = useSelector(state => state.loading[packageActionTypes.GET_LIST])

    useEffect(()=> {
        dispatch(packageActions.getList());
    }, [dispatch]);

    // showAlertMessage({
    //     message: (
    //     <Row align="middle">
    //         <Col>Một số người dùng có thông tin chưa hợp lệ.</Col>
    //         <Col><Button type='link'>Xem chi tiết</Button></Col>
    //     </Row>
    //     ),
    //     type: 'error',
    // })

    // const onShowDetailUploadErrs = () => {
    //     const ErrorRow = ({children}) => (
    //         <p style={{margin: 0}}><ExclamationCircleFilled style={{color: '#ff4d4f', marginRight: '10px'}}/>{children}</p>
    //     )

    //     const contentModal = () => (
    //         <div>
    //             Tải dữ liệu từ Excel thất bại (3/12) 

    //             <Card bodyStyle={{background: '#F3F6FC', padding: '8px 16px'}} bordered={false}>
    //                 <ErrorRow>Dòng 2: Số điện thoại, Email đã tồn tại</ErrorRow>
    //                 <ErrorRow>Dòng 2: Số điện thoại, Email đã tồn tại</ErrorRow>
    //                 <ErrorRow>Dòng 2: Số điện thoại, Email đã tồn tại</ErrorRow>
    //             </Card>
    //         </div>
    //     );

    //     info({
    //         title: `Danh sách các lỗi ở file tải lên`,
    //         content: contentModal(),
    //         okText: 'Đóng',
    //         okType: 'primary',
    //         cancelText: 'Hủy',
    //         onOk: () => {
    //         },
    //         onCancel() {
    //         },
    //     });
    // }

    const acceptFileType = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"];

    const beforeUpload = (file) => {
        const isExcelFile = acceptFileType.includes(file.type)
        if(!isExcelFile){
            showErrorMessage("Vui lòng chọn file đúng định dạng!");
        }

        return isExcelFile || Upload.LIST_IGNORE;
    }

    const searchFields = useMemo(() => {
        return [
            { key: 'search', searchPlaceholder: 'Tìm kiếm theo email/SĐT/Tên đăng nhập/Họ và tên' },
            {
                key: 'packageId',
                searchPlaceholder: 'Gói đang sử dụng',
                gridCol: 5,
                fieldType: fieldTypes.SELECT,
                options: packages.map(item => ({label: item.name, value: item.id})),
                loading: packageLoading,
            },
            {
                key: 'source',
                searchPlaceholder: 'Nguồn',
                gridCol: 5,
                fieldType: fieldTypes.SELECT,
                options: teacherSourceDDL,
            },
        ]
    }, [packageLoading])

    const getListAction = useCallback((params)=> {
        return teacherActions.getList(params);
    }, [teacherActions.getList])

    return (
        <>
            <ListPageContainer
                objectName="giáo viên"
                detailUrl ={paths.teacherDetail}
                createUrl={paths.teacherCreate}
                breadcrumbs={[
                    { breadcrumbName: 'Quản lý user'},
                    { breadcrumbName: 'Danh sách giáo viên' }
                ]}
                columns={[
                    { title: 'Tên đăng nhập', dataIndex: 'username', className: styles.columnWidth },
                    { title: 'E-mail', dataIndex: 'email', className: styles.columnWidth },
                    { title: 'Số điện thoại', dataIndex: 'phone' },
                    { title: 'Họ và tên', dataIndex: 'fullName' },
                    { 
                        title: 'Thời hạn',
                        dataIndex: ["assets", "0", "endDate"],
                        render: (endDate) => {
                            return diffTimeLeft(endDate)
                        }
                    },
                    { 
                        title: 'Ngày tạo',
                        dataIndex: 'createdDate',
                        render: (createdDate) => <>{formatDate(createdDate)}</>
                    },
                    { 
                        title: 'Gói đang sử dụng', 
                        dataIndex: ["assets", "0", "name"],
                        render: (usingPlan, row) => {
                            const renderColor = () => {
                                switch (row.assets?.[0]?.code) {
                                    case PACKAGES.BASIC:
                                        return "error";
                                    case PACKAGES.ADVANCE:
                                        return "purple";
                                    case PACKAGES.INTERNATIONAL:
                                        return "processing";
                                    default:
                                        return "";
                                }
                            }

                            return  <Tag 
                                        style={{minWidth: 100, textAlign: "center"}} 
                                        color={renderColor()}>
                                            {usingPlan || 'N/A'}
                                    </Tag>
                        }
                    },
                    { 
                        title: 'Nguồn', dataIndex: 'source', 
                        render: source => 
                                        <Tag 
                                            style={{minWidth: 65, textAlign: "center"}} 
                                            color={source === 'DTP' ? '#58B778' : '#4267B2'}>
                                                {source === teacherSourceTypes.DTP ? 'DTP' : 'Tự do'}
                                        </Tag>
                    },
                ]}
                searchFields={searchFields}
                actionBar={{
                    isEdit: true,
                    isCreate: true,
                    isDelete: true,
                    isUpdateStatus: true,
                }}
                getListAction={getListAction}
                deleteAction={teacherActions.delete}
                updateStatusAction={teacherActions.updateStatus}
            >
            </ListPageContainer>

            <Modal 
                open={isOpen} 
                title="Import danh sách người dùng"
                closable
                okText="Tải lên"
                onOk={() => {}}
                cancelText="Hủy"
                onCancel={()=> setIsOpen(false)}
            >
                <Upload.Dragger 
                    accept={acceptFileType.join(", ")}
                    multiple={false}
                    maxCount={1}
                    beforeUpload={beforeUpload}
                >
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Nhấn chọn hoặc kéo tệp vào khu vực này <br/> để thực hiện tải file lên</p>
                </Upload.Dragger>

                <ul>
                    <li style={{color: '#7C88A6'}}>Tải xuống file nhập mẫu
                        <Typography.Link download={true} href="/files/Import_teacher_template.xlsx"> tại đây</Typography.Link>, điền đủ và đúng thông tin theo mẫu. 
                    </li>
                    <li style={{color: '#7C88A6'}}>Không thay đổi thứ tự các cột trong file mẫu.</li>
                    <li style={{color: '#7C88A6'}}>Chỉ nhận file tải lên có định dạng .xls, .xlsx</li>
                    <li style={{color: '#7C88A6'}}>Dung lượng file tối đa 5MB.</li>
                </ul>
            </Modal>
        </>
       
    )
}

export default ListPage;