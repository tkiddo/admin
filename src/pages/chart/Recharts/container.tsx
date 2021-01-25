/*
 * @Author: tkiddo
 * @Date: 2021-01-25 10:08:13
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-25 10:16:02
 * @Description:
 */
import React, { FC, ReactElement } from 'react';

import { ResponsiveContainer } from 'recharts';

import styles from './container.less';

interface IProps {
  ratio?: number;
  maxHeight?: number;
  minHeight?: number;
}

const Container: FC<IProps> = ({
  children,
  ratio = 5 / 2,
  minHeight = 250,
  maxHeight = 350,
}) => (
  <div className={styles.container} style={{ minHeight, maxHeight }}>
    <div style={{ marginTop: `${100 / ratio}%` || '100%' }} />
    <div className={styles.content} style={{ minHeight, maxHeight }}>
      <ResponsiveContainer>{children as ReactElement}</ResponsiveContainer>
    </div>
  </div>
);

export default Container;
