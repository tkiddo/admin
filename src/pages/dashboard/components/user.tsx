/*
 * @Author: tkiddo
 * @Date: 2021-01-23 15:09:47
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-23 15:16:42
 * @Description:
 */

import React, { FC } from 'react';
import { Button, Avatar } from 'antd';
import CountUp from 'react-countup';
import { Color } from '@/utils/theme';
import styles from './user.less';

export interface UserProps {
  avatar: string;
  username: string;
  sales: number;
  sold: number;
}

const countUpProps = {
  start: 0,
  duration: 2.75,
  useEasing: true,
  useGrouping: true,
  separator: ',',
};

const User: FC<UserProps> = ({ avatar, username, sales = 0, sold = 0 }) => {
  return (
    <div className={styles.user}>
      <div className={styles.header}>
        <div className={styles.headerinner}>
          <Avatar size="large" src={avatar} />
          <h5 className={styles.name}>{username}</h5>
        </div>
      </div>
      <div className={styles.number}>
        <div className={styles.item}>
          <p>EARNING SALES</p>
          <p style={{ color: Color.green }}>
            <CountUp end={sales} prefix="$" {...countUpProps} />
          </p>
        </div>
        <div className={styles.item}>
          <p>ITEM SOLD</p>
          <p style={{ color: Color.blue }}>
            <CountUp end={sold} {...countUpProps} />
          </p>
        </div>
      </div>
      <div className={styles.footer}>
        <Button type="ghost" size="large">
          View Profile
        </Button>
      </div>
    </div>
  );
};

export default User;
