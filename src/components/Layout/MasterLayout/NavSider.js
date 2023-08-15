import { Layout, Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import navMenuConfig from '@/constants/menuConfig';
import routes from '@/routes/routes';
import { findNestedObj } from '@/utils';

import logoSmallUrl from '@/assets/images/logo.svg';
import compactLogoUrl from '@/assets/images/compact-logo.svg';

import styles from './NavSider.module.scss';

const { Sider } = Layout;

const getRouteByPath = (path) => {
    const routeActive = routes.find(route => route.path === path) || {};
    return routeActive || {};
}

const findNavMenuActive = (navMenu, pathname) => {
    const route = getRouteByPath(pathname);
    return Object.keys(navMenu).find(navMenuKey => {
        if (navMenu[navMenuKey].children) {
            return !!navMenu[navMenuKey].children.find(navChild => {
                if (navChild.children) {
                    return findNavMenuActive(navChild.children, pathname);
                } else {
                    return route.path === navChild.path;
                }
            });
        } else if (route.path === navMenu[navMenuKey].path)
            return true;
        return false;
    });
}

const NavSider = ({
    currentPathname,
    navSiderCollapsed,
    onToggleNavSide,
    hasRoles
}) => {
    const navigate = useNavigate();

    const getAvailableMenu = (menus, parentKey = '') => {
        return menus.filter((menu, index) => {
            const route = getRouteByPath(menu.path);
            if (menu.children?.length) {
                menu.children = getAvailableMenu(menu.children, index.toString())
            }
            if (route?.roles?.length) {
                return hasRoles(route.roles);
            }
            return menu.path || menu.children?.length;
        }).map((menu, index) => ({ ...menu, key: parentKey ? `${parentKey}-${index}` : index.toString() }))
    }

    const availableMenu = getAvailableMenu(navMenuConfig);

    const indexMenuActive = findNavMenuActive(availableMenu, currentPathname);
    const defaultOpenKeys = [indexMenuActive];
    const menuActive = availableMenu[indexMenuActive];
    let menuActiveKey = menuActive?.key;
    if (menuActive && menuActive.children) {
        const indexSubMenuActive = findNavMenuActive(menuActive.children, currentPathname);
        if (indexSubMenuActive) {
            defaultOpenKeys.push(`${indexMenuActive}-${indexSubMenuActive}`);
            menuActiveKey = menuActive.children[indexSubMenuActive]?.key;
        }
    }

    const onNavigate = ({ key }) => {
        const menu = findNestedObj(availableMenu, 'key', key);
        if (menu?.path) {
            navigate(menu.path);
        }
    }

    return (
        <Sider
            width={210}
            style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
                zIndex: 2,
            }}
            // collapsible // Flag to show button collapse on bottom layout
            collapsed={navSiderCollapsed}
            onCollapse={onToggleNavSide}
            className={styles.navSider}
        >
            <Link to={"/"}>
                <div className={styles.logo}>
                    <img style={{ width: navSiderCollapsed ? 40 : 115 }} src={navSiderCollapsed ? compactLogoUrl : logoSmallUrl} alt="i-Test logo" />
                </div>
            </Link>
            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[menuActiveKey]}
                className="custom-nav"
                defaultOpenKeys={defaultOpenKeys}
                items={availableMenu}
                onClick={onNavigate}
            >
            </Menu>
        </Sider>
    )
}

export default NavSider;
