import React, { FC, memo } from 'react';
import { Table, Avatar } from 'antd';
import { Link } from 'umi';

import styles from './List.less';
import { IUser } from '../model';
import { IPaginationState } from '@/utils/PaginationModel';

interface IProps {
  list: IUser[];
  pagination: IPaginationState;
  onChange(page: IPaginationState): void;
}

const List: FC<IProps> = ({ list, pagination, onChange }) => {
  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      width: 80,
      fixed: 'left',
      render: (text: string) => <Avatar style={{ marginLeft: 8 }} src={text} />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: { id: string }) => (
        <Link to={`user/${record.id}`}>{text}</Link>
      ),
    },
    {
      title: 'NickName',
      dataIndex: 'nickName',
      key: 'nickName',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Gender',
      dataIndex: 'isMale',
      key: 'isMale',
      render: (text: string) => <span>{text ? 'Male' : 'Female'}</span>,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'CreateTime',
      dataIndex: 'createTime',
      key: 'createTime',
    },
  ];

  return (
    <Table
      dataSource={list}
      className={styles.table}
      bordered
      scroll={{ x: 1200 }}
      columns={columns}
      rowKey={(record) => record.id}
      pagination={pagination}
      onChange={onChange}
    ></Table>
  );
};

export default memo(List);
