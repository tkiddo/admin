import { Layout } from 'antd';
import React, { useState, FC, memo } from 'react';
import store from 'store';
import { useLocation, useDispatch } from 'umi';

import { MyLayout } from 'components';
import { IRoute } from 'common';

import { getLocale } from 'utils';

import styles from './BaseLayout.less';

import { pathToRegexp } from 'path-to-regexp';

import Error from '../pages/404';

const { Header, Sider, Bread } = MyLayout;

const { Content } = Layout;

const BaseLayout: FC = (props) => {
  const permissions = store.get('permissions');
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();

  const routeList = store.get('routeList') || [];
  const user = store.get('user') || {};

  const lang = getLocale();
  const newRouteList =
    lang !== 'en'
      ? routeList.map((item: IRoute) => {
          const { name, ...other } = item;
          return {
            ...other,
            name: (item[lang] || {}).name || name,
          };
        })
      : routeList;
  const menus = newRouteList.filter((_: IRoute) => _.menuParentId !== '-1');

  const location = useLocation();
  const currentRoute = newRouteList.find((item: IRoute) => {
    return item.route && pathToRegexp(item.route).exec(location.pathname);
  });

  const hasPermission = currentRoute
    ? permissions.visit.includes(currentRoute.id)
    : false;

  const headerProps = {
    fixed: true,
    collapsed,
    avatar: user.avatar,
    username: user.username,
    onSignOut: () => {
      dispatch({ type: 'app/signOut' });
    },
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
        <Content className={styles.content}>
          <Bread routeList={newRouteList} />
          {hasPermission ? props.children : <Error />}
        </Content>
      </div>
    </Layout>
  );
};

export default memo(BaseLayout);
