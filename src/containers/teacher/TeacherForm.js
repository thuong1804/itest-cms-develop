import { Form, Row, Col, Input } from 'antd';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { cleanObject } from '@/utils';
import { teacherSourceDDL } from '@/constants/masterData';
import { validationEmail, validationPhone } from "@/utils/validator";
import { passwordRegex, whiteSpaceRegex } from '@/constants';
import { TextField, DropdownField, NumericField } from '@/components/Form';
import { diffTimeLeft } from "@/utils/date";
import { packageActions, packageActionTypes } from "@/redux/actions";

import { LockOutlined } from "@ant-design/icons";

const TeacherForm = ({
    form,
    formId,
    detailData,
    isCreating,
    onSubmit
}) => {
    const dispatch = useDispatch();

    const packages = useSelector(state => state.packageReducer?.packages) || [];
    const isLoading = useSelector(state => state.loading[packageActionTypes.GET_LIST]);

    const handleSubmit = (values) => {
        if(values.role) {
            values.roleId = values.role.id;
            delete values.role
        }
        values.packageId = values.assets[0].id;

        onSubmit(cleanObject(values));
    }

    const renderPeriod = () => {
        const endDate = detailData?.assets?.[0]?.endDate;
        return diffTimeLeft(endDate)
    }

    const mappingDropdownData = (options) =>{
        return options.map(item => ({label: item.name, value: item.id, other: item.code}));
    }

    const selectedPackageId = Form.useWatch(['assets', "0", "id"], form);
    const isChangePackage = selectedPackageId !== detailData.assets?.[0]?.id;

    useEffect(() => {
        if((isChangePackage && selectedPackageId) || isCreating){
            form.setFieldValue('monthsOfUse', "1");
        } else {
            form.setFieldValue('monthsOfUse', "0");
        }
    }, [isChangePackage, selectedPackageId]);

    useEffect(() => {
        dispatch(packageActions.getList());
    }, []);

    return (
        <Form
            id={formId}
            onFinish={handleSubmit}
            form={form}
            layout="vertical"
            initialValues={{...detailData, source: isCreating ? "DTP" : '' }}
        >
            <Row gutter={16}>
                <Col span={12}>
                    <TextField
                        fieldName="username"
                        label="Tên đăng nhập"
                        maxLength={50}
                        notAllowWhiteSpace
                        required
                    />
                </Col>
                <Col span={12}>
                    <TextField
                        fieldName="email"
                        label="E-mail"
                        required
                        validators={validationEmail()}
                    />
                </Col>
                <Col span={12}>
                    <TextField
                        fieldName="fullName"
                        label="Họ và tên"
                        maxLength={45}
                        notAllowWhiteSpace
                    />
                </Col>
                <Col span={12}>
                    <TextField
                        fieldName="phone"
                        label="Số điện thoại"
                        type="tel"
                        validators={validationPhone()}
                        onlyNumber
                        required
                    />
                </Col>
                <Col span={12}>
                    <DropdownField
                        fieldName="source"
                        label="Nguồn"
                        required
                        options={teacherSourceDDL}
                    />
                </Col>
                <Col span={6}>
                    <DropdownField
                        fieldName={["assets", "0", "id"]}
                        label="Gói dịch vụ"
                        required
                        options={mappingDropdownData(packages)}
                        loading={isLoading}
                    />
                </Col>
                <Col span={6}>
                    {
                        isCreating || isChangePackage ?
                            <NumericField
                                fieldName="monthsOfUse"
                                label="Thời hạn (tháng)"
                                required
                                min={1}
                                max={120}
                                width={'100%'}
                            />
                            :
                            <div style={{marginBottom: 24}}>
                                <NumericField
                                    fieldName="monthsOfUse"
                                    label="Nhập thời hạn tăng thêm (tháng)"
                                    min={0}
                                    required
                                    width={'100%'}
                                    style={{marginBottom: 0}}
                                />
                                <span>Thời gian sử dụng còn lại: {renderPeriod()}</span>
                            </div>
                    }
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Mật khẩu mới"
                        name="password"
                        rules={[
                            { required: true, message: 'Vui lòng nhập mật khẩu mới' },
                            {
                                pattern: whiteSpaceRegex,
                                message: "Mật khẩu mới không được bắt đầu và kết thúc bằng khoảng trắng!"
                            },
                            {
                                pattern: passwordRegex,
                                message: "Mật khẩu mới chỉ được sử dụng chữ cái, số và ký tự đặc biệt thường gặp!"
                            },
                            {
                                min: 8,
                                message: "Mật khẩu mới phải có tối thiểu 8 ký tự!"
                            },
                        ].filter(item => isCreating ? true : !item.required)}
                    >
                        <Input.Password
                            placeholder="Mật khẩu mới"
                            prefix={<LockOutlined />}
                            autoComplete="off"
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="confirmPassword"
                        label="Xác nhận mật khẩu"
                        rules={[
                            { required: true, message: 'Vui lòng nhập xác nhận mật khẩu' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Thông tin chưa trùng khớp, vui lòng nhập mật khẩu xác nhận trùng với mật khẩu mới'));
                                },
                            }),
                        ].filter(item => isCreating ? true : !item.required)}
                    >
                        <Input.Password
                            placeholder="Xác nhận mật khẩu"
                            prefix={<LockOutlined />}
                            autoComplete="off"
                        />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default TeacherForm;