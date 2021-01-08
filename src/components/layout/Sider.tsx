import React, { FC, memo } from 'react';
import { Layout } from 'antd';
import styles from './Sider.less';

import config from 'config';

import SiderMenu, { IMenuItem } from './Menu';

interface IProps {
  width: number;
  collapsed: boolean;
  menus: IMenuItem[];
}

const Sider: FC<IProps> = (props) => {
  const { collapsed, width, menus } = props;
  const menuProps = {
    menus,
    collapsed,
  };
  return (
    <Layout.Sider
      trigger={null}
      collapsible
      width={width}
      collapsed={collapsed}
    >
      <div className={styles.brand}>
        <div className={styles.logo}>
          <img alt="logo" src={config.logoPath} />
          {!collapsed && <h1>{config.siteName}</h1>}
        </div>
      </div>
      <SiderMenu {...menuProps}></SiderMenu>
    </Layout.Sider>
  );
};

export default memo(Sider);
