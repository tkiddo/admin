/*
 * @Author: tkiddo
 * @Date: 2021-02-23 08:41:40
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-03-05 12:54:30
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
  MonitorOutlined,
  RocketOutlined,
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
  monitor: <MonitorOutlined />,
  performance: <RocketOutlined />,
};
export default iconMap;
