/*
 * @Author: tkiddo
 * @Date: 2021-01-23 13:29:49
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-23 13:32:40
 * @Description:
 */

import React, { FC } from 'react';
import styles from './quote.less';

export interface QuoteProps {
  name: string;
  content: string;
  title: string;
  avatar: string;
}

const Quote: FC<QuoteProps> = ({ name, content, title, avatar }) => {
  return (
    <div className={styles.quote}>
      <div className={styles.inner}>{content}</div>
      <div className={styles.footer}>
        <div className={styles.description}>
          <p>-{name}-</p>
          <p>{title}</p>
        </div>
        <div
          className={styles.avatar}
          style={{ backgroundImage: `url(${avatar})` }}
        />
      </div>
    </div>
  );
};

export default Quote;
