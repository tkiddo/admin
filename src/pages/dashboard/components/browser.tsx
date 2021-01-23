/*
 * @Author: tkiddo
 * @Date: 2021-01-23 15:02:39
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-23 15:06:44
 * @Description:
 */

import React, { FC } from 'react';
import { Table, Tag } from 'antd';

import { Color } from '@/utils/theme';

import styles from './browser.less';

const status: { [key: number]: { color: string } } = {
  1: {
    color: Color.green,
  },
  2: {
    color: Color.red,
  },
  3: {
    color: Color.blue,
  },
  4: {
    color: Color.yellow,
  },
};

export interface BrowserItem {
  name: string;
  percent: number;
  status: number;
}

interface BrowserProps {
  data: BrowserItem[];
}

const Browser: FC<BrowserProps> = ({ data }) => {
  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      className: styles.name,
    },
    {
      title: 'percent',
      dataIndex: 'percent',
      className: styles.percent,
      render: (text: number, it: BrowserItem) => (
        <Tag color={status[it.status].color}>{text}%</Tag>
      ),
    },
  ];

  return (
    <Table
      pagination={false}
      showHeader={false}
      columns={columns}
      rowKey="name"
      dataSource={data}
    />
  );
};

export default Browser;
