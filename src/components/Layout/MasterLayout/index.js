import React, { useState, useEffect } from "react";
import { Layout, Spin, Result } from "antd";
import { useDispatch } from "react-redux";

import NavSider from "./NavSider";
import AppHeader from "./AppHeader";

import { accountActions } from "@/redux/actions";
import { useAuth, useCurrentPath } from "@/hooks";

import styles from "./index.module.scss";

const { Content, Footer } = Layout;

const MasterLayout = ({ children }) => {
  const dispatch = useDispatch();
  const [navSiderCollapsed, setNavSiderCollapsed] = useState(false);
  const { isAuthenticated, user, loading, logout, hasRoles } = useAuth();
  const currentRoute = useCurrentPath();
  const onToggleNavSide = () => {
    setNavSiderCollapsed((prev) => !prev);
  };

  const canAccess = () => {
    if (currentRoute?.roles) {
      return hasRoles(currentRoute.roles);
    }
    return true;
  };

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(accountActions.getProfile());
    }
  }, [dispatch, isAuthenticated]);

  if (!user) return null;

  return (
    <Spin size="large" spinning={false}>
      <Layout className={styles.masterLayout}>
        <NavSider
          currentPathname={currentRoute.path}
          navSiderCollapsed={navSiderCollapsed}
          onToggleNavSide={onToggleNavSide}
          hasRoles={hasRoles}
        />
        <Layout style={{ marginLeft: navSiderCollapsed ? 80 : 210 }}>
          <AppHeader
            navSiderCollapsed={navSiderCollapsed}
            onLogout={logout}
            onToggleNavSide={onToggleNavSide}
            user={user}
          />
          <Content className={styles.appContent}>
            <div className={styles.contentWrapper}>
              {loading ? null : canAccess() ? (
                children
              ) : (
                <Result
                  status="403"
                  title="403"
                  subTitle="Sorry, you are not authorized to access this page."
                  // extra={<Button type="primary">Back Home</Button>}
                />
              )}
            </div>
          </Content>
        </Layout>
      </Layout>
    </Spin>
  );
};

export default MasterLayout;
