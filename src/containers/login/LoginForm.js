import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import { TextField } from '@/components/Form';
import { accountActions } from '@/redux/actions';
import { useNotification } from '@/hooks';
import paths from '@/constants/paths';

import styles from './LoginForm.module.scss';

const LoginForm = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const { showErrorMessage } = useNotification();

    // const nameValue = Form.useWatch('name', form);

    const onLoginFail = (err) => {
        showErrorMessage('Email hoặc password của bạn không chính xác. Vui lòng thử lại!'); 
        setLoading(false);
    }

    const onLogin = (values) => {
        setLoading(true);
        dispatch(accountActions.login({
            params: values,
            onCompleted: response => {
                if(response?.result) {
                    const { token, refreshToken } = response?.data || {};
                    dispatch(accountActions.updateToken({
                        accessToken: token,
                        refreshToken
                    }))
                    window.location.replace(paths.adminList);
                }
                setLoading(false);
            },
            onError: onLoginFail
        }))
    }

    return (
        <Form
            name="login-form"
            onFinish={onLogin}
            form={form}
            className={styles.loginForm}
        >
            <TextField
                fieldName="usernameOrEmail"
                required
                requiredMsg="Username không được bỏ trống!"
                placeholder="Username"
                prefix={<UserOutlined />}
            />
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Password không được bỏ trống!' }]}
            >
                <Input.Password
                    placeholder="Password"
                    prefix={<LockOutlined />}
                    autoComplete="off"
                    // size="large"
                />
            </Form.Item>
            <Form.Item>
                <Button
                    className={styles.btnLogin}
                    htmlType="submit"
                    size="medidum"
                    type="primary"
                    loading={loading}
                >
                    Đăng nhập
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;