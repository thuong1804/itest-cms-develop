import { Layout, Menu, Avatar } from 'antd';
import {
    UserOutlined,
    LoginOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined
} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

import styles from './AppHeader.module.scss';
import paths from '@/constants/paths';
import { combineName } from "@/utils";

const { Header } = Layout;

const AppHeader = ({ onLogout, user, onToggleNavSide, navSiderCollapsed }) => {
    const navigate = useNavigate();

    const menus = [
        {
            label: combineName(user) || user.role?.name,
            icon: <Avatar className={styles.avatar} icon={<UserOutlined />}/>,
            key: 'rightMenu',
            children: [
                {
                    label: "Thông tin tài khoản",
                    onClick: ()=> {navigate(paths.profile)}
                },
                {
                    label: 'Đăng xuất',
                    icon: <LoginOutlined/>,
                    onClick: onLogout
                },
            ]
        },
    ]

    return (
        <Header className={styles.appHeader}
            style={{
                position: 'fixed',
                zIndex: 1,
                width: `calc(100% - ${navSiderCollapsed ? 80 : 210}px)`
            }}
        >
            <span className={styles.iconCollapsed} onClick={onToggleNavSide}>
                {
                    navSiderCollapsed
                        ?
                        <MenuUnfoldOutlined />
                        :
                        <MenuFoldOutlined />
                }
            </span>
            <Menu
                mode="horizontal"
                className={styles.menuTopRight}
                items={menus}
            >
                {/* <SubMenu
                    title={
                        user
                        ?
                        <span className={styles.userWrapper}>
                            <Avatar className={styles.avatar} icon={<UserOutlined />} />
                            <span className={styles.username}>{user?.fullName}</span>
                            <DownOutlined />
                        </span>
                        :
                        null
                    }
                >
                    <Menu.Item key="/profile">
                        <Link to="/profile">
                            <UserOutlined />
                            <span>Profile</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item onClick={onLogout}>
                        <LoginOutlined />
                        <span>Logout</span>
                    </Menu.Item>
                </SubMenu> */}
            </Menu>
        </Header>
    )
}

export default AppHeader;
