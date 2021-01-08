import { Layout } from 'antd';
import React, { useState, FC, memo } from 'react';
import store from 'store';

import { MyLayout } from 'components';
import { IMenuItem } from '@/components/layout/Menu';

import styles from './BaseLayout.less';

const { Header, Sider } = MyLayout;

const { Content } = Layout;

const BaseLayout: FC = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  const routeList = store.get('routeList') || [];
  const menus = routeList.filter((_: IMenuItem) => _.menuParentId !== '-1');

  const headerProps = {
    fixed: true,
    collapsed,
    onCollapsedChange: () => {
      setCollapsed(!collapsed);
    },
  };

  const siderProps = {
    width: 256,
    collapsed,
    menus,
  };
  return (
    <Layout>
      <Sider {...siderProps}></Sider>
      <div className={styles.container}>
        <Header {...headerProps}></Header>
        <Content className={styles.content}>{props.children}</Content>
      </div>
    </Layout>
  );
};

export default memo(BaseLayout);
