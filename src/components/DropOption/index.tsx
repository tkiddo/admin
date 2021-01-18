/*
 * @Author: tkiddo
 * @Date: 2021-01-18 14:20:32
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-18 14:26:05
 * @Description:
 */

import React, { FC } from 'react';
import { BarsOutlined, DownOutlined } from '@ant-design/icons';
import { Dropdown, Button, Menu } from 'antd';

interface Option {
  key: string;
  name: string;
}

interface IProps {
  onMenuClick(e: Event): void;
  menuOptions: Option[];
}

const DropOption: FC<IProps> = ({ onMenuClick, menuOptions = [] }) => {
  const menu = menuOptions.map((item) => (
    <Menu.Item key={item.key}>{item.name}</Menu.Item>
  ));
  return (
    <Dropdown overlay={<Menu onClick={onMenuClick}>{menu}</Menu>}>
      <Button style={{ border: 'none' }}>
        <BarsOutlined style={{ marginRight: 2 }} />
        <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default DropOption;
