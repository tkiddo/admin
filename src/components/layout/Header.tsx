import { Layout } from 'antd';
import React, { ReactElement } from 'react';
import classnames from 'classnames';
import styles from './Header.less';

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

interface IProps {
  fixed: boolean;
  collapsed: boolean;
  onCollapsedChange(): void;
}

export default function Header(props: IProps): ReactElement {
  const { fixed, collapsed, onCollapsedChange } = props;
  return (
    <Layout.Header
      className={classnames(styles.header, {
        [styles.fixed]: fixed,
        [styles.collapsed]: collapsed,
      })}
    >
      <div className={styles.button} onClick={onCollapsedChange}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>
      <div className={styles.rightContainer}></div>
    </Layout.Header>
  );
}