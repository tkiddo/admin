/*
 * @Author: tkiddo
 * @Date: 2021-02-02 14:44:26
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-02-03 10:56:05
 * @Description:
 */
import React, { FC } from 'react';
import { List, Modal } from 'antd';

import { IRole } from '../model';
import { IRoute } from 'common';

import styles from './List.less';

const { confirm } = Modal;
interface IProps {
  loading: boolean;
  data: IRole[];
  dist: IRoute[];
  onDeleteItem(_id: string): void;
  onEditItem(item: IRole): void;
}

const genItem = ({
  item,
  dist,
  onDeleteItem,
  onEditItem,
}: {
  item: IRole;
  dist: IRoute[];
  onDeleteItem(_id: string): void;
  onEditItem(item: IRole): void;
}) => {
  const filteredPermission = dist.filter((d) => item.permission.includes(d.id));
  const nameArray = filteredPermission.map((d) => d.zh);

  const handleUpdate = () => {
    onEditItem(item);
  };

  const handleDelete = () => {
    confirm({
      title: `你确定删除这条记录吗?`,
      onOk() {
        onDeleteItem(item._id);
      },
    });
  };

  return (
    <List.Item>
      <List.Item.Meta
        title={item.name}
        description={`权限：${nameArray.join('，')}`}
      ></List.Item.Meta>
      <div className={styles.button} onClick={handleUpdate}>
        更新
      </div>
      <div className={styles.button} onClick={handleDelete}>
        删除
      </div>
    </List.Item>
  );
};

const ListComp: FC<IProps> = ({
  data,
  dist,
  loading,
  onDeleteItem,
  onEditItem,
}) => {
  return (
    <List
      itemLayout="horizontal"
      loading={loading}
      dataSource={data}
      renderItem={(item: IRole) =>
        genItem({ item, dist, onDeleteItem, onEditItem })
      }
    ></List>
  );
};

export default ListComp;
