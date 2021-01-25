/*
 * @Author: tkiddo
 * @Date: 2021-01-25 09:56:47
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-25 14:52:36
 * @Description:
 */
import React, { FC } from 'react';

import LineChartComponent from './lineChartComponent';
import BarChartComponent from './barChartComponent';
import AreaChartComponent from './areaChartComponent';

interface IProps {
  type: string;
}

const RechartsComponent: FC<IProps> = ({ type }) => {
  if (type === 'barChart') return <BarChartComponent />;
  if (type === 'areaChart') return <AreaChartComponent />;
  return <LineChartComponent />;
};

export default RechartsComponent;
