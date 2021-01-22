import React, { FC, memo } from 'react';
import { Table, Avatar, Modal } from 'antd';
import { Link } from 'umi';

import styles from './List.less';
import { IUser } from '../model';
import { IPaginationState } from '@/common/PaginationModel';
import { DropOption } from 'components';

const { confirm } = Modal;

interface IProps {
  dataSource: IUser[];
  pagination: IPaginationState;
  onChange(page: IPaginationState): void;
  loading: boolean;
  rowSelection: {
    selectedRowKeys: string[];
    onChange(keys: string[]): void;
  };
  onEditItem(item: IUser): void;
  onDeleteItem(id: string): void;
}

const List: FC<IProps> = ({ onEditItem, onDeleteItem, ...tableProps }) => {
  const handleMenuClick = (record: IUser, e) => {
    // const { onDeleteItem, onEditItem, i18n } = this.props
    if (e.key === '1') {
      onEditItem(record);
    } else if (e.key === '2') {
      confirm({
        title: `Are you sure delete this record?`,
        onOk() {
          onDeleteItem(record.id);
        },
      });
    }
  };
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
    {
      title: 'Operation',
      key: 'operation',
      fixed: 'right',
      render: (text: string, record) => {
        return (
          <DropOption
            onMenuClick={(e) => handleMenuClick(record, e)}
            menuOptions={[
              { key: '1', name: `Update` },
              { key: '2', name: `Delete` },
            ]}
          />
        );
      },
    },
  ];

  return (
    <Table
      {...tableProps}
      className={styles.table}
      bordered
      scroll={{ x: 1200 }}
      columns={columns}
      rowKey={(record) => record.id}
    ></Table>
  );
};

export default memo(List);
