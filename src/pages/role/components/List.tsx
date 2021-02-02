/*
 * @Author: tkiddo
 * @Date: 2021-02-02 14:44:26
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-02-02 15:53:59
 * @Description:
 */
import React, { FC } from 'react';
import { List, Card } from 'antd';

import { IRole } from '../model';
import { IRoute } from 'common';

interface IProps {
  data: IRole[];
  dist: IRoute[];
}

const genCard = (item: IRole, dist: IRoute[]) => (
  <Card title={item.name}>
    {item.permission.map((id: string) => {
      const target = dist.find((d: IRoute) => d.id === id);
      return <span> {target.zh} </span>;
    })}
  </Card>
);

const ListComp: FC<IProps> = ({ data, dist }) => {
  return (
    <List
      grid={{ gutter: 12, column: 3 }}
      dataSource={data}
      renderItem={(item: IRole) => <List.Item>{genCard(item, dist)}</List.Item>}
    ></List>
  );
};

export default ListComp;
