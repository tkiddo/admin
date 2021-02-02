/*
 * @Author: tkiddo
 * @Date: 2021-02-02 14:44:26
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-02-02 16:42:05
 * @Description:
 */
import React, { FC } from 'react';
import { List } from 'antd';

import { IRole } from '../model';
import { IRoute } from 'common';

interface IProps {
  data: IRole[];
  dist: IRoute[];
}

const genItem = (item: IRole, dist: IRoute[]) => {
  const filteredPermission = dist.filter((d) => item.permission.includes(d.id));
  const nameArray = filteredPermission.map((d) => d.zh);
  return (
    <List.Item>
      <List.Item.Meta
        title={item.name}
        description={`权限：${nameArray.join('，')}`}
      ></List.Item.Meta>
      <div style={{ color: '#8fc9fb', cursor: 'pointer' }}>更新</div>
    </List.Item>
  );
};

const ListComp: FC<IProps> = ({ data, dist }) => {
  return (
    <List
      dataSource={data}
      renderItem={(item: IRole) => genItem(item, dist)}
    ></List>
  );
};

export default ListComp;
