/*
 * @Author: tkiddo
 * @Date: 2021-02-09 09:08:54
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-02-09 14:59:32
 * @Description:
 */
import React, { FC } from 'react';

import { Tree } from 'antd';

import { IRoute } from 'common';

import iconMap from '@/utils/iconMap';
import { DataNode, EventDataNode } from 'antd/lib/tree';
import { PlusOutlined, DeleteFilled } from '@ant-design/icons';

import styles from './Tree.less';

interface ITreeNode {
  title: string;
  key: string;
  icon: React.ReactNode;
  children: ITreeNode[];
}

const genTreeData = (tree: IRoute[]): ITreeNode[] => {
  return tree.map((item) => {
    const { zh, id, icon, children } = item;
    return {
      title: zh,
      key: id,
      icon: iconMap[icon],
      children: children ? genTreeData(children) : [],
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
    onSelect(node);
  };
  const titleRender = (node: DataNode): React.ReactNode => {
    const { icon, title } = node;

    return (
      <div className={styles.node}>
        {icon}
        <span className={styles.title}>{title}</span>
        <PlusOutlined className={styles.icon} />
        <DeleteFilled className={styles.icon} />
      </div>
    );
  };
  return (
    <Tree
      treeData={genTreeData(data)}
      onSelect={handleSelect}
      titleRender={titleRender}
    />
  );
};

export default TreeComponent;
