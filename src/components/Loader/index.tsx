/*
 * @Author: tkiddo
 * @Date: 2021-01-19 20:23:17
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-03-05 14:57:55
 * @Description:
 */
import React, { FC } from 'react';
import classNames from 'classnames';
import styles from './index.less';

interface IProps {
  spinning?: boolean;
  fullScreen?: boolean;
}
const Loader: FC<IProps> = ({ spinning = false, fullScreen = false }) => {
  return (
    <div
      className={classNames(styles.loader, {
        [styles.hidden]: !spinning,
        [styles.fullScreen]: fullScreen,
      })}
    >
      <div className={styles.warpper}>
        <div className={styles.inner} />
        <div className={styles.text}>LOADING</div>
      </div>
    </div>
  );
};

export default Loader;
