import { useState } from "react";
import { useDispatch } from "react-redux";
import { Row , Col, Form, Button, Avatar, Modal, Input } from "antd";

import { passwordRegex, whiteSpaceRegex } from "@/constants";
import { PageWrapper, TextField } from "@/components";
import { useAuth, useNotification } from "@/hooks";
import { accountActions } from "@/redux/actions";
import { cleanObject, getErrMsgFromApi } from "@/utils";
import { validationEmail, validationPhone } from "@/utils/validator";

import {FileImageTwoTone, LockOutlined} from '@ant-design/icons';

import styles from "./index.module.scss";

const ProfilePage = () => {
    const dispatch = useDispatch();
    const [passwordForm] = Form.useForm();
    const {showErrorMessage, showSuccessMessage} = useNotification();
    const {user} = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    
    const onUploadAvatar = (e) => {
        const file = e.target.files[0];

        if(file.size > 2 * 1024 * 1024){
            showErrorMessage('Avatar không được lớn hơn 2mb!');
            return; 
        }
        showSuccessMessage('Thay đổi avatar thành công.');
    }

    const onSubmit = (values) => {
        dispatch(accountActions.updateProfile({
            params: cleanObject(values),
            onCompleted: (res) => {
                if(res.result){
                    dispatch(accountActions.updateProfileLocal(res))
                    showSuccessMessage("Cập nhật thông tin tài khoản thành công!")
                }
            },
            onError: (res) => {
                showErrorMessage(getErrMsgFromApi(res));
            }
        }))
    }

    const onSubmitPassword = (values) => {
        dispatch(accountActions.changePassword({
            params: {password: values.password, oldPassword: values.oldPassword},
            onCompleted: (res) => {
                if(res.result){
                    showSuccessMessage(res.message);
                    setIsOpen(false);
                    passwordForm.resetFields();
                }
            },
            onError: (res) => {
                showErrorMessage(getErrMsgFromApi(res));
            }
        }))
    }

    return (
        <PageWrapper
            breadcrumbs={[
                { breadcrumbName: 'Thông tin cá nhân'},
            ]}>
                <Row gutter={16} className={styles.profile}>
                    <Col span={12}>
                        <div className={styles.content}>
                            <label className="cursor-pointer">
                                <Avatar
                                    icon={<FileImageTwoTone />}
                                    src={user.avatar}
                                    size={100}/>
                                <input type="file" hidden accept="image/*" onChange={onUploadAvatar} disabled/>
                            </label>
                            <h1>{user.fullName}</h1>
                            <h4>{user.role.name}</h4>
                            <Button type="primary" onClick={()=> {setIsOpen(true); passwordForm.resetFields()}}>Đổi mật khẩu</Button>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className={styles.content}>
                            <h3>THÔNG TIN</h3>
                            <Form
                                id={'profile'}
                                name="12312312"
                                onFinish={onSubmit}
                                layout="vertical"
                                initialValues={user}
                            >
                                <Row gutter={16} justify={"center"}>
                                    <Col span={20}>
                                        <TextField
                                            fieldName="email"
                                            label="E-mail"
                                            maxLength={64}
                                            validators={validationEmail()}
                                            required
                                            disabled
                                        />
                                    </Col>
                                    <Col span={20}>
                                        <TextField
                                            fieldName="phoneNumber"
                                            label="Số điện thoại"
                                            type="tel"
                                            onlyNumber
                                            validators={validationPhone()}
                                        />
                                    </Col>
                                    <Col span={20}>
                                        <TextField
                                            fieldName="username"
                                            label="Username"
                                            maxLength={50}
                                            required
                                            notAllowWhiteSpace
                                            disabled
                                        />
                                    </Col>
                                    <Col span={10}>
                                        <TextField
                                            fieldName="firstName"
                                            label="First Name"
                                            maxLength={45}
                                            required
                                            notAllowWhiteSpace
                                        />
                                    </Col>
                                    <Col span={10}>
                                        <TextField
                                            fieldName="lastName"
                                            label="Last Name"
                                            maxLength={45}
                                            notAllowWhiteSpace
                                        />
                                    </Col>
                                </Row>
                                <Row justify={"center"}>
                                    <Button htmlType="submit" type="primary" style={{minWidth: 100}}>Lưu</Button>
                                </Row>
                            </Form>
                        </div>
                    </Col>
                </Row>

                <Modal 
                    open={isOpen} 
                    title="ĐỔI MẬT KHẨU" 
                    onCancel={()=>setIsOpen(false)} 
                    footer={[
                            <Button key="change-pass" type="primary" htmlType="submit" form="change-password">Đổi mật khẩu</Button>
                    ]}>
                    <Form 
                        id="change-password"
                        form={passwordForm}
                        onFinish={onSubmitPassword}
                        layout="vertical">
                        <Row>
                            <Col span={24}>
                                <Form.Item
                                    label="Mật khẩu cũ"
                                    name="oldPassword"
                                    rules={[{ required: true, message: 'Mật khẩu cũ không được bỏ trống'}]}
                                >
                                    <Input.Password
                                        placeholder="Mật khẩu cũ"
                                        prefix={<LockOutlined />}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    label="Mật khẩu mới"
                                    name="password"
                                    rules={[
                                        { required: true, message: 'Mật khẩu mới không được bỏ trống' },
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
                                    ]}
                                >
                                    <Input.Password
                                        placeholder="Mật khẩu mới"
                                        prefix={<LockOutlined />}
                                        autoComplete="off"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
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
                                    ]}
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
                </Modal>
        </PageWrapper>
    )
}

export default ProfilePage;