/*
 * @Author: tkiddo
 * @Date: 2021-01-23 14:01:22
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-23 14:08:51
 * @Description:
 */

import React, { FC } from 'react';
import { Table, Tag } from 'antd';
import { Color } from '@/utils/theme';
import styles from './comments.less';

const status: { [key: number]: { color: string; text: string } } = {
  1: {
    color: Color.green,
    text: 'APPROVED',
  },
  2: {
    color: Color.yellow,
    text: 'PENDING',
  },
  3: {
    color: Color.red,
    text: 'REJECTED',
  },
};

export interface CommentItem {
  avatar: string;
  content: string;
  date: string;
  name: string;
  status: number;
}

interface CommentsProps {
  data: CommentItem[];
}

const Comments: FC<CommentsProps> = ({ data }) => {
  const columns = [
    {
      title: 'avatar',
      dataIndex: 'avatar',
      width: 48,
      className: styles.avatarcolumn,
      render: (text: string) => (
        <span
          style={{ backgroundImage: `url(${text})` }}
          className={styles.avatar}
        />
      ),
    },
    {
      title: 'content',
      dataIndex: 'content',
      render: (text: string, it: CommentItem) => (
        <div>
          <h5 className={styles.name}>{it.name}</h5>
          <p className={styles.content}>{it.content}</p>
          <div className={styles.daterow}>
            <Tag color={status[it.status].color}>{status[it.status].text}</Tag>
            <span className={styles.date}>{it.date}</span>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className={styles.comments}>
      <Table
        pagination={false}
        showHeader={false}
        columns={columns}
        rowKey="avatar"
        dataSource={data.filter((item, key) => key < 3)}
      />
    </div>
  );
};

export default Comments;
