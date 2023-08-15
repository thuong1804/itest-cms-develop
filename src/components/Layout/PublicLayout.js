import React from 'react';
import { Layout } from 'antd';
import logoUrl from '@/assets/images/logo.svg';
import styles from './PublicLayout.module.scss';

const { Header, Content } = Layout;

const PublicLayout = ({ children }) => {
    return (
        <Layout className={styles.publicLayout}>
            <Header className={styles.appHeader}>
                <div className={styles.container}>
                    <div className={styles.appLogo} >
                        <img src={logoUrl} alt="App logo" />
                    </div>
                </div>
            </Header>
            <Content className={styles.appContent}>
                <div className={styles.container}>
                    {children}
                </div>
            </Content>
        </Layout>
    )
}

export default PublicLayout;
