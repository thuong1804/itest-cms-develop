import React from 'react';
import { Link } from 'react-router-dom';
import { Tabs } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';
import { HomeOutlined } from '@ant-design/icons';
import { LoadingWrapper } from '@/components';
import useAlert from '@/hooks/useAlert';
import AlertMessage from '../Alert';

import styles from './index.module.scss';

const PageWrapper = ({
    title,
    breadcrumbs,
    tabs,
    children,
    loading,
    onChangeTab
}) => {
    const {alertMessageProps} = useAlert();

    const renderTabs = () => {
        if (tabs?.length) {
            return (
                <Tabs onChange={onChangeTab} items={tabs}>
                    {/* {
                        tabs.map(tabItem => {
                            return (
                                <TabPane
                                    tab={tabItem?.badge ? (
                                        <Badge color="#1890ff" offset={[10, 5]} count={tabItem?.badge}>
                                            {tabItem.tab}
                                        </Badge>
                                    ) : tabItem.tab}
                                    key={tabItem.key}
                                >
                                </TabPane>
                            );
                        })
                    } */}
                </Tabs>
            );
        }
        return null;
    }

    const getBreadcrumbRoutes = () => {
        let result = [{
            breadcrumbName: <HomeOutlined />,
            key: 'home'
        }];

        if(breadcrumbs?.length) {
            result = result.concat(breadcrumbs.map((breadcrumb, index) => ({...breadcrumb, key: `breabcrumb-item-${index}`})));
        }

        return result;
    }

    return (
        <div className={styles.pageWrapper}>
            <LoadingWrapper loading={loading} className="full-screen-loading">
                <PageHeader
                    className={styles.header}
                    title={title}
                    breadcrumb={{
                        routes: getBreadcrumbRoutes(),
                        itemRender: (breadcrumb) => {
                            const last = breadcrumbs?.length && breadcrumbs.indexOf(breadcrumb) === breadcrumbs.length - 1;
                            return last || !breadcrumb.path ? (
                                <span key={breadcrumb.key}>{breadcrumb.breadcrumbName}</span>
                            ) : (
                                    <Link key={breadcrumb.key} to={breadcrumb.path}>{breadcrumb.breadcrumbName}</Link>
                            );
                        }
                    }}
                    footer={renderTabs()}
                >
                </PageHeader>
                <AlertMessage {...alertMessageProps} className={styles.alertWrapper}/>
                <div className={styles.content}>
                    {children}
                </div>
            </LoadingWrapper>
        </div>
    );
}

export default PageWrapper;
