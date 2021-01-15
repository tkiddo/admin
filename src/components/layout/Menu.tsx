import React, { FC, memo, Fragment, useState } from 'react';

import { NavLink, useLocation } from 'umi';

import { pathToRegexp } from 'path-to-regexp';

import store from 'store';

import iconMap from '@/utils/iconMap';

import { Menu } from 'antd';

import { arrayToTree, queryAncestors } from 'utils';

import { IRoute } from 'common';

interface IProps {
  menus: IRoute[];
  collapsed: boolean;
}

const { SubMenu } = Menu;

const generateMenus = (data: IRoute[]) => {
  return data.map((item) => {
    if (item.children) {
      return (
        <SubMenu
          key={item.id}
          title={
            <Fragment>
              {item.icon && iconMap[item.icon]}
              <span>{item.name}</span>
            </Fragment>
          }
        >
          {generateMenus(item.children)}
        </SubMenu>
      );
    }
    return (
      <Menu.Item key={item.id}>
        <NavLink to={item.route || '#'}>
          {item.icon && iconMap[item.icon]}
          <span>{item.name}</span>
        </NavLink>
      </Menu.Item>
    );
  });
};

const SiderMenu: FC<IProps> = (props) => {
  const [openKeys, setOpenKeys] = useState(store.get('openKeys') || []);
  const location = useLocation();

  const { menus, collapsed } = props;
  const menuTree = arrayToTree(menus, 'id', 'menuParentId');

  const onOpenChange = (openKeys: React.ReactText[]) => {
    const rootSubmenuKeys = menus
      .filter((_) => !_.menuParentId)
      .map((_) => _.id);

    const latestOpenKey = openKeys.find(
      (key) => openKeys.indexOf(key) === -1,
    ) as string;

    let newOpenKeys = openKeys;
    if (rootSubmenuKeys.indexOf(latestOpenKey) !== -1) {
      newOpenKeys = latestOpenKey ? [latestOpenKey] : [];
    }

    setOpenKeys(newOpenKeys);
    store.set('openKeys', newOpenKeys);
  };

  // Find a menu that matches the pathname.
  const currentMenu = menus.find(
    (_) => _.route && pathToRegexp(_.route).exec(location.pathname),
  );

  // Find the key that should be selected according to the current menu.
  const selectedKeys = currentMenu
    ? queryAncestors(menus, currentMenu, 'menuParentId').map((_) => _.id)
    : [];

  const menuProps = collapsed
    ? {}
    : {
        openKeys: openKeys,
      };
  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={['1']}
      {...menuProps}
      selectedKeys={selectedKeys}
      onOpenChange={onOpenChange}
    >
      {generateMenus(menuTree)}
    </Menu>
  );
};

export default memo(SiderMenu);
