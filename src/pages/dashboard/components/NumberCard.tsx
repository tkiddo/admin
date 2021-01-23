/*
 * @Author: tkiddo
 * @Date: 2021-01-22 16:32:27
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-23 13:03:47
 * @Description:
 */

import React, { FC } from 'react';
import CountUp from 'react-countup';
import { Card } from 'antd';

import styles from './numberCard.less';
import iconMap from '@/utils/iconMap';

export interface NumberCardProps {
  icon: string;
  color: string;
  title: string;
  number: number;
}

const NumberCard: FC<NumberCardProps> = ({ icon, color, title, number }) => {
  return (
    <Card
      className={styles.numberCard}
      bordered={false}
      bodyStyle={{ padding: 10 }}
    >
      <span className={styles.iconWarp} style={{ color }}>
        {iconMap[icon]}
      </span>
      <div className={styles.content}>
        <p className={styles.title}>{title || 'No Title'}</p>
        <p className={styles.number}>
          <CountUp
            start={0}
            end={number}
            duration={2.75}
            useEasing
            separator=","
          />
        </p>
      </div>
    </Card>
  );
};

export default NumberCard;
