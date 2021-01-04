import { Layout, Menu } from 'antd';
import React, { ReactElement, useState } from 'react';

import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

import { MyLayout } from 'components';

import styles from './BaseLayout.less';

const { Sider } = Layout;

const { Header } = MyLayout;

type Props = {
  children?: React.ReactNode;
};

export default function BaseLayout(props: Props): ReactElement {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={styles.logo}></div>
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
        <Header
          fixed={true}
          collapsed={collapsed}
          onCollapsedChange={() => {
            setCollapsed(!collapsed);
          }}
        ></Header>
      </div>
    </Layout>
  );
}
