/*
 * @Author: tkiddo
 * @Date: 2021-01-25 09:35:54
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-25 10:03:41
 * @Description:
 */

import React, { FC, useState } from 'react';
import { Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';

import { Page } from 'components';
import RechartsComponent from './rechartsComponent';

import styles from './index.less';

const RadioGroup = Radio.Group;

const chartList = [
  {
    label: 'lineChart',
    value: 'lineChart',
  },
  {
    label: 'barChart',
    value: 'barChart',
  },
  {
    label: 'areaChart',
    value: 'areaChart',
  },
];

const Chart: FC = () => {
  const [type, setType] = useState('lineChart');
  const handleRadioGroupChange = (e: RadioChangeEvent) => {
    setType(e.target.value);
  };
  return (
    <Page>
      <RadioGroup
        options={chartList}
        defaultValue="lineChart"
        onChange={handleRadioGroupChange}
      ></RadioGroup>
      <div className={styles.chart}>
        <RechartsComponent type={type}></RechartsComponent>
      </div>
    </Page>
  );
};

export default Chart;
