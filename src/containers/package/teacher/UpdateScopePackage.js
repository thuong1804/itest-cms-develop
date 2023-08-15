import { AsyncDropdownField, PageWrapper, SearchForm } from "@/components";
import TransferTable from "src/components/TransferTable";
import { DATE_FORMAT_VALUE, fieldTypes } from "@/constants";
import apiConfig from "@/constants/apiConfig";
import paths from "@/constants/paths";
import { cleanObject } from "@/utils";
import { Row, Col, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import { useParams, useSearchParams } from "react-router-dom";

const UpdateScopePackage = () => {
    const {id} = useParams();
    const [searchForm] = useForm();
    const [searchParams, setSearchParams] = useSearchParams();

    const breadcrumbs = [
        { breadcrumbName: 'Gói dịch vụ cho Giáo viên', path: paths.teacherPackageList },
        { breadcrumbName: 'Gói phổ thông', path: paths.teacherPackageDetail.replace(":id", id) },
        { breadcrumbName: 'Cập nhật phạm vi dữ liệu'},
    ]

    const searchFields = [
        { key: 'username', gridCol: 24, searchPlaceholder: 'Tìm kiếm theo mã/tên đề thi' },
        {
            key: 'status',
            searchPlaceholder: 'Gói đang sử dụng',
            gridCol: 8,
            fieldType: fieldTypes.SELECT,
            mode: 'multiple',
        },
        {
            key: 'status1',
            searchPlaceholder: 'Nguồn',
            gridCol: 8,
            fieldType: fieldTypes.SELECT,
        },
        {
            key: 'status2',
            searchPlaceholder: 'Gói đang sử dụng',
            gridCol: 8,
            fieldType: fieldTypes.SELECT,
            mode: 'multiple',
        },
        {
            key: 'status3',
            searchPlaceholder: 'Nguồn',
            gridCol: 16,
            fieldType: fieldTypes.SELECT,
        },
    ]

    const onSearch = (values) => {
        Object.keys(values).map(key => {
            if (dayjs.isDayjs(values[key])){
                values[key] = dayjs(values[key]).format(DATE_FORMAT_VALUE)
            } else {
                values[key] = values[key].trim();
            }
        })

        setSearchParams(cleanObject(values));
    }

    const onResetSearch = () => {
        searchForm.resetFields();
        setSearchParams({});
    }

    const renderSearchForm = () => {
        return <SearchForm
            searchFields={searchFields}
            onSubmit={onSearch}
            onResetForm={onResetSearch}
            form={searchForm}
        />;
    }

    const mappingDropdownData = (res) =>{
        return res.data.map(item => ({label: item.name, value: item.code}));
    }

    return (
        <PageWrapper
            breadcrumbs={breadcrumbs}>
                <Row gutter={[16, 16]} style={{background: 'white'}}>
                        <Col span={12}>
                            <Typography.Title level={5}>DANH SÁCH ĐỀ THI</Typography.Title>
                            {renderSearchForm()}
                        </Col>
                        <Col span={12}>
                            <Typography.Title level={5}>GÓI ĐỀ THI</Typography.Title>
                            <Col span={8} style={{padding: 0}}>
                                <AsyncDropdownField
                                    placeholder={"Vui lòng chọn"}
                                    fieldName={"package"} 
                                    apiConfig={apiConfig.admin.getRoleList} 
                                    mappingData={mappingDropdownData}/>
                            </Col>
                        </Col>
                        <Col span={24} style={{marginBottom: 16}}>
                            <TransferTable
                                leftColumns={[
                                    { title: 'Mã đề thi', dataIndex: 'username' },
                                    { title: 'Tên đề thi', dataIndex: 'email' },
                                ]}
                                rightColumns={[
                                    { title: 'Mã đề thi', dataIndex: 'username' },
                                    { title: 'Tên đề thi', dataIndex: 'email' },
                                ]}
                                dataSource={[{username: '11', email: 'asdas'}, {username: '12', email: 'asdas'},
                                {username: '13', email: 'asdas'}, {username: '19', email: 'asdas'},
                                {username: '14', email: 'asdas'}, {username: '20', email: 'asdas'},
                                {username: '15', email: 'asdas'}, {username: '21', email: 'asdas'},
                                {username: '16', email: 'asdas'}, {username: '22', email: 'asdas'},
                                {username: '17', email: 'asdas'}, {username: '23', email: 'asdas'},
                                {username: '18', email: 'asdas'}, {username: '24', email: 'asdas'}]}
                                targetKeys={['11']}
                            />
                        </Col>
                </Row>
        </PageWrapper>
    )
}

export default UpdateScopePackage;