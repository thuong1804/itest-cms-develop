import { Space, Tag, Typography } from "antd";
import qs from 'query-string';
import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import dayjs from "dayjs";

import { ListPageContainer } from "@/components";
import {
    DATETIME_FORMAT_DISPLAY,
    DATETIME_FORMAT_VALUE,
    fieldTypes,
    orderStatusCode,
    storageKeys,
    userRoles
} from "@/constants";
import { orderStatusDDL } from "@/constants/masterData";
import { formatNumber } from "@/utils";
import { convertUtcToLocalTimeString } from "@/utils/date";
import apiConfig from "@/constants/apiConfig";
import { useNotification } from "@/hooks";
import { getCookie } from "@/utils/localStorage";

import { ClockCircleFilled, DownloadOutlined } from "@ant-design/icons";
import paths from "@/constants/paths";

const {Text, Link : TextLink} = Typography;

const ListPage = () => {
    const {showErrorMessage, showSuccessMessage} = useNotification()
    const [searchParams] = useSearchParams();
    const isOrderSuccess = (row) => {
        return row.vnpResponseCode === '00' && row.vnpTransactionStatus === "00";
    }
    const isOrderProcessing = (row) => {
        return !row.vnpResponseCode && !row.vnpTransactionStatus && row.status === orderStatusCode.NEW;
    }

    const mappingSearchParams = (searchFields) => {
        const filter = {};
        searchFields?.forEach(searchField => {
            if (searchParams.has(searchField.key)) {
                if (searchField.key === 'fromDate') {
                    filter[searchField.key] = dayjs(searchParams.get(searchField.key))
                                                .startOf("date").format(DATETIME_FORMAT_VALUE);
                } else if (searchField.key === 'toDate') {
                    filter[searchField.key] = dayjs(searchParams.get(searchField.key))
                                                .endOf("date").format(DATETIME_FORMAT_VALUE);
                } else {
                    filter[searchField.key] = searchParams.get(searchField.key);
                }

            }
        });
        return filter;
    }

    const searchFields = useMemo(()=> {
        return [
            {
                key: 'transactionId',
                searchPlaceholder: 'Tìm kiếm theo mã giao dịch',
                gridCol: 4,
                fieldType: fieldTypes.NUMBER,
            },
            {
                key: 'search',
                searchPlaceholder: 'Tìm kiếm theo số điện thoại/email KH',
                gridCol: 4,
            },
            {
                key: 'status',
                searchPlaceholder: 'Trạng thái thanh toán',
                gridCol: 4,
                fieldType: fieldTypes.SELECT,
                options: orderStatusDDL,
            },
            {
                key: 'fromDate',
                searchPlaceholder: 'Từ ngày',
                gridCol: 4,
                fieldType: fieldTypes.DATE,
            },
            {
                key: 'toDate',
                searchPlaceholder: 'Đến ngày',
                gridCol: 4,
                fieldType: fieldTypes.DATE,
            },
        ]
    }, [])

    const onExportExcel = (e, getList, list) => {
        if(!list || list?.length < 1){
            e.preventDefault();
            showErrorMessage('Bạn cần ít nhất 1 dòng dữ liệu để thực hiện xuất Excel!')
            return;
        }

        const userToken = getCookie(storageKeys.ACCESS_TOKEN);
        const options = {
            ...apiConfig.order.exportExcel,
            headers: {
                ...apiConfig.order.exportExcel.headers,
                Authorization: `Bearer ${userToken}`,
            }
        }
        const url = `${apiConfig.order.exportExcel.path}?${qs.stringify(mappingSearchParams(searchFields))}`;
        fetch(url, options)
            .then(res => {
                if (res.ok) {
                    return res.blob()
                }
                throw new Error("Export SMS Transactions failed. Please try again!");
            })
            .then(data => {
                let a = document.createElement("a");
                a.href = window.URL.createObjectURL(data);
                a.download = `TransactionList.xlsx${dayjs().format('DD-MM-YYYY')}`;
                a.click();
                showSuccessMessage("Xuất Excel danh sách giao dịch thành công");
            }).catch((err) => {
                showErrorMessage(err);
            });
    }

    return (
        <ListPageContainer
            objectName="Giáo viên"
            breadcrumbs={[
                {breadcrumbName: 'Quản lý thanh toán'}
            ]}
            columns={[
                {
                    title: 'Mã giao dịch',
                    dataIndex: 'vnpTransactionNo',
                    render: (vnpTransactionNo, row) => (
                        <Space direction="vertical" size={1}>
                            <b style={{fontSize: 14, opacity: 0.8}}>{vnpTransactionNo || "N/A"}</b>
                            <span style={{fontSize: 12, opacity: 0.8}}>
                                <ClockCircleFilled style={{opacity: 0.5}}/> {convertUtcToLocalTimeString(row.createdDate, DATETIME_FORMAT_DISPLAY)}
                            </span>
                        </Space>
                    )
                },
                {
                    title: 'Mã đơn hàng',
                    dataIndex: 'id',
                    render: (id) => id
                },
                {
                    title: 'Khách hàng',
                    dataIndex: ['user', 'email'],
                    render: (email, {user}) => {
                        const isNotTeacher = user.role?.code !== userRoles.TEACHER;
                        return (
                            <Space direction="vertical" size={1}>
                                {
                                    user?.deleted ?
                                        <Text delete>{`${user?.fullName || ''} (deleted)`}</Text>
                                        :
                                        isNotTeacher ?
                                            <Text>{user?.fullName || ''}</Text>
                                            :
                                            <Link to={`${paths.teacherDetail.replace(":id", user?.id)}`}>
                                                <TextLink>{user?.fullName || ''}</TextLink>
                                            </Link>
                                }
                                <Text>{user?.phone}</Text>
                                <Text>{user?.email}</Text>
                            </Space>
                        )
                    }
                },
                {
                    title: 'Giá trị',
                    dataIndex: 'total',
                    render: (total) => `${formatNumber(total)}đ`
                },
                {
                    title: 'Phương thức thanh toán',
                    dataIndex: '',
                    render: () => "VNPAY"
                },
                {
                    title: 'Trạng thái giao dịch',
                    dataIndex: '_',
                    render: (_, row) => {
                        const isSuccess = isOrderSuccess(row);
                        const isProcessing = isOrderProcessing(row);
                        return (
                            <Tag
                                style={{minWidth: 75, textAlign: "center"}}
                                color={isProcessing ? "warning" : isSuccess ? "success" : "error"}>
                                {isProcessing ? "Đang xử lý" : isSuccess ? "Thành công" : "Thất bại"}
                            </Tag>
                        )
                    }
                },
                {
                    title: 'Nội dung giao dịch',
                    dataIndex: 'note',
                    render: (note, row) => {
                        const isSuccess = isOrderSuccess(row);
                        const isProcessing = isOrderProcessing(row);

                        return (
                            <div style={{maxWidth: 400}}>
                                {isProcessing ? "Thanh toán đang được VNPAY xử lý" : isSuccess ? "Thanh toán thành công" : note || 'Có lỗi xảy ra trong quá trình thanh toán.'}
                            </div>
                        )
                    },
                },
            ]}
            searchFields={searchFields}
            mappingSearchParams={mappingSearchParams}
            actionBar={{}}
            buttonActions={[
                {
                    label: "Xuất Excel",
                    icon: <DownloadOutlined/>,
                    onClick: onExportExcel,
                }
            ]}
            // getListAction={orderActions.getList}
        />
    )
}

export default ListPage;