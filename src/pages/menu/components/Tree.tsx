/*
 * @Author: tkiddo
 * @Date: 2021-02-09 09:08:54
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-02-09 11:03:18
 * @Description:
 */
import React, { FC } from 'react';

import { Tree } from 'antd';

import { IRoute } from 'common';

import iconMap from '@/utils/iconMap';
import { EventDataNode } from 'antd/lib/tree';

interface ITreeNode {
  title: string;
  key: string;
  icon: React.ReactNode;
  children: ITreeNode[];
  source: IRoute;
}

const genTreeData = (tree: IRoute[]): ITreeNode[] => {
  return tree.map((item) => {
    const { zh, id, icon, children } = item;
    return {
      title: zh,
      key: id,
      icon: iconMap[icon],
      children: children ? genTreeData(children) : [],
      source: item,
    };
  });
};

interface IProps {
  data: IRoute[];
  onSelect(selectedItem: IRoute): void;
}

const TreeComponent: FC<IProps> = ({ data, onSelect }) => {
  const handleSelect = (
    selectedKeys: string[],
    { node }: { node: EventDataNode },
  ) => {
    console.log(selectedKeys, node);
    onSelect(node.source);
  };
  return <Tree treeData={genTreeData(data)} showIcon onSelect={handleSelect} />;
};

export default TreeComponent;
