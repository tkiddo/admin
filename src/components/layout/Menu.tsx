import React, { FC, memo, Fragment } from 'react';

import { NavLink } from 'umi';

import iconMap from '@/utils/iconMap';

import { Menu } from 'antd';

import { arrayToTree } from 'utils';

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
  const { menus } = props;
  const menuTree = arrayToTree(menus, 'id', 'menuParentId');
  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
      {generateMenus(menuTree)}
    </Menu>
  );
};

export default memo(SiderMenu);
