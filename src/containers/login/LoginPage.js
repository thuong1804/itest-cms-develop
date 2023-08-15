import LoginForm from './LoginForm';

import styles from './LoginPage.module.scss';

const LoginPage = () => {
    return (
        <div className={styles.loginPage}>
            <h1 className={styles.title}>
                Đăng nhập
            </h1>
            <LoginForm/>
            <div className={styles.copyright}>
                © {new Date().getFullYear()} - Copyright © DAI TRUONG PHAT JSC, All Rights Reserved.
            </div>
        </div>
    )
}

export default LoginPage;
