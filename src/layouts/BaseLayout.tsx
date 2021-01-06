import { Layout, Menu } from 'antd';
import React, { useState, FC } from 'react';

import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

import { MyLayout } from 'components';

import styles from './BaseLayout.less';

const { Sider } = Layout;

const { Header } = MyLayout;

const { Content } = Layout;

const BaseLayout: FC = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  const headerProps = {
    fixed: true,
    collapsed,
    onCollapsedChange: () => {
      setCollapsed(!collapsed);
    },
  };
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} width={256}>
        <div className={styles.logo}>Admin</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            nav 1
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            nav 2
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            nav 3
          </Menu.Item>
        </Menu>
      </Sider>
      <div className={styles.container}>
        <Header {...headerProps}></Header>
        <Content className={styles.content}>{props.children}</Content>
      </div>
    </Layout>
  );
};

export default BaseLayout;
