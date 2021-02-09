/*
 * @Author: tkiddo
 * @Date: 2021-02-05 20:13:40
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-02-09 10:46:36
 * @Description:
 */
import {
  PayCircleOutlined,
  ShoppingCartOutlined,
  MessageOutlined,
  TeamOutlined,
  UserOutlined,
  DashboardOutlined,
  ApiOutlined,
  CameraOutlined,
  EditOutlined,
  CodeOutlined,
  LineOutlined,
  BarChartOutlined,
  AreaChartOutlined,
  SettingOutlined,
  MenuOutlined,
} from '@ant-design/icons';

import React, { ReactElement } from 'react';

interface IMap {
  [key: string]: ReactElement;
}

const iconMap: IMap = {
  'pay-circle-o': <PayCircleOutlined />,
  'shopping-cart': <ShoppingCartOutlined />,
  'camera-o': <CameraOutlined />,
  'line-chart': <LineOutlined />,
  'code-o': <CodeOutlined />,
  'area-chart': <AreaChartOutlined />,
  'bar-chart': <BarChartOutlined />,
  message: <MessageOutlined />,
  team: <TeamOutlined />,
  dashboard: <DashboardOutlined />,
  user: <UserOutlined />,
  api: <ApiOutlined />,
  edit: <EditOutlined />,
  role: <TeamOutlined />,
  system: <SettingOutlined />,
  menu: <MenuOutlined />,
};
export default iconMap;
