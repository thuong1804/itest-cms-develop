import { Form, Row, Col, Input } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { commonStatus, userRoles } from '@/constants';
import { TextField } from '@/components/Form';
import { DropdownField } from '@/components';
import { validationEmail, validationPassword, validationPhone } from '@/utils/validator';

import { LockOutlined } from "@ant-design/icons"
import { adminActions } from "@/redux/actions";

const AdminForm = ({
    form,
    formId,
    detailData,
    isCreating,
    onSubmit
}) => {
    const dispatch = useDispatch();

    const roles = useSelector(state => state.admin?.roles) || [];
    const handleSubmit = (values) => {
        if(values.role) {
            values.roleId = values.role.id;
            delete values.role
        }
        values.status = values.status ? commonStatus.ACTIVE : commonStatus.LOCK;
        onSubmit(values);
    }

    const mappingDropdownData = (options) =>{
       return options.map(item => ({label: item.name, value: item.id, other: item.code}))
                        .filter(item => [userRoles.ADMIN, userRoles.OPERATOR, userRoles.SALE].includes(item.other));
    }

    useEffect(() => {
        dispatch(adminActions.getRoleList());
    }, [])

    return (
        <Form
            id={formId}
            onFinish={handleSubmit}
            form={form}
            layout="vertical"
            initialValues={{...detailData}}
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
                        type="phone"
                        onlyNumber={true}
                        validators={validationPhone()}
                    />
                </Col>
                <Col span={12}>
                    <DropdownField
                        fieldName={["role", "id"]}
                        label="Vai trò"
                        options={mappingDropdownData(roles)}
                        required
                    />
                </Col>
                <Col span={18}/>
                <Col span={12}>
                    <Form.Item
                        label={isCreating ? "Mật khẩu" : "Mật khẩu mới"}
                        name="password"
                        rules={validationPassword(isCreating ? "Mật khẩu" : "Mật khẩu mới").filter(item => isCreating ? true : !item.required)}
                    >
                        <Input.Password
                            placeholder={isCreating ? "Mật khẩu" : "Mật khẩu mới"}
                            prefix={<LockOutlined />}
                            autoComplete="off"
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="confirmPassword"
                        label={isCreating ? "Xác nhận mật khẩu" : "Xác nhận mật khẩu mới"}
                        rules={[
                            { required: true, message: `Vui lòng nhập ${isCreating ? "Xác nhận mật khẩu" : "Xác nhận mật khẩu mới"}`},
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Thông tin chưa trùng khớp, vui lòng nhập mật khẩu xác nhận trùng với mật khẩu'));
                                },
                                }),
                        ].filter(item => isCreating ? true : !item.required)}
                    >
                        <Input.Password
                            placeholder={isCreating ? "Xác nhận mật khẩu" : "Xác nhận mật khẩu mới"}
                            prefix={<LockOutlined />}
                            autoComplete="off"
                        />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default AdminForm;