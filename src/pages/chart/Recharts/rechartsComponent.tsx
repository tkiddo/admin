/*
 * @Author: tkiddo
 * @Date: 2021-01-25 09:56:47
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-25 10:29:21
 * @Description:
 */
import React, { FC } from 'react';

import LineChartComponent from './lineChartComponent';

interface IProps {
  type: string;
}

const RechartsComponent: FC<IProps> = ({ type }) => {
  return <LineChartComponent />;
};

export default RechartsComponent;
