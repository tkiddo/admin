/*
 * @Author: tkiddo
 * @Date: 2021-01-23 13:38:54
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-23 13:52:44
 * @Description:
 */

import React, { FC } from 'react';
import { Table, Tag } from 'antd';
import moment from 'moment';

import { Color } from '@/utils/theme';

import styles from './recentSales.less';

export interface RecentSaleItem {
  date: string;
  id: number;
  name: string;
  price: number;
  status: number;
}

interface RecentSalesProps {
  data: RecentSaleItem[];
}

const status: { [key: number]: { color: string; text: string } } = {
  1: {
    color: Color.green,
    text: 'SALE',
  },
  2: {
    color: Color.yellow,
    text: 'REJECT',
  },
  3: {
    color: Color.red,
    text: 'TAX',
  },
  4: {
    color: Color.blue,
    text: 'EXTENDED',
  },
};

const RecentSales: FC<RecentSalesProps> = ({ data }) => {
  const columns = [
    {
      title: 'NAME',
      dataIndex: 'name',
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      render: (text: number) => (
        <Tag color={status[text].color}>{status[text].text}</Tag>
      ),
    },
    {
      title: 'DATE',
      dataIndex: 'date',
      render: (text: string) => moment(text).format('YYYY-MM-DD'),
    },
    {
      title: 'PRICE',
      dataIndex: 'price',
      render: (text: string, it: RecentSaleItem) => (
        <span style={{ color: status[it.status].color }}>${text}</span>
      ),
    },
  ];

  return (
    <div className={styles.recentsales}>
      <Table
        pagination={false}
        columns={columns}
        rowKey="id"
        dataSource={data.filter((item, key) => key < 5)}
      />
    </div>
  );
};

export default RecentSales;
