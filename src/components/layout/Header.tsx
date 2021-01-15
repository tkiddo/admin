import { Layout, Menu, Avatar } from 'antd';
import React, { FC, memo, Fragment } from 'react';
import classnames from 'classnames';
import styles from './Header.less';

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

interface IProps {
  fixed: boolean;
  collapsed: boolean;
  username: string;
  avatar: string;
  onCollapsedChange(): void;
  onSignOut(): void;
}

const { SubMenu } = Menu;

const Header: FC<IProps> = (props) => {
  const { fixed, collapsed, onCollapsedChange, username, avatar } = props;
  const handleClickMenu = (e: any) => {
    e.key === 'SignOut' && props.onSignOut();
  };
  const rightContent = [
    <Menu key="user" mode="horizontal" onClick={handleClickMenu}>
      <SubMenu
        title={
          <Fragment>
            <span style={{ color: '#999', marginRight: 4 }}>Hi</span>
            <span>{username}</span>
            <Avatar style={{ marginLeft: 8 }} src={avatar} />
          </Fragment>
        }
      >
        <Menu.Item key="SignOut">Sign out</Menu.Item>
      </SubMenu>
    </Menu>,
  ];
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
      <div className={styles.rightContainer}>{rightContent}</div>
    </Layout.Header>
  );
};

export default memo(Header);
