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
        title: `你确定删除这条记录吗?`,
        onOk() {
          onDeleteItem(record._id);
        },
      });
    }
  };
  const columns = [
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      width: 80,
      fixed: 'left',
      render: (text: string) => <Avatar style={{ marginLeft: 8 }} src={text} />,
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      render: (text: string, record: IUser) => (
        <Link to={`user/${record._id}`}>{text}</Link>
      ),
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
      key: 'nickName',
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'operation',
      fixed: 'right',
      render: (text: string, record: IUser) => {
        return (
          <DropOption
            onMenuClick={(e) => handleMenuClick(record, e)}
            menuOptions={[
              { key: '1', name: `更新` },
              { key: '2', name: `删除` },
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
      rowKey={(record) => record._id}
    ></Table>
  );
};

export default memo(List);
