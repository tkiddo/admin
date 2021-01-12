import React, { FC } from 'react';
import classNames from 'classnames';
import styles from './index.less';

interface IProps {
  spinning: boolean;
  fullScreen: boolean;
}
const Loader: FC<IProps> = ({ spinning = false, fullScreen }) => {
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
