/*
 * @Author: tkiddo
 * @Date: 2021-01-15 14:50:02
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-22 16:53:18
 * @Description:
 */
import React, { FC } from 'react';
import Loader from '../Loader';
import styles from './Page.less';
import classnames from 'classnames';

interface IProps {
  className?: string;
  loading?: boolean;
  inner?: boolean;
}

const Page: FC<IProps> = ({
  className,
  loading = false,
  inner = false,
  children,
}) => {
  const loadingStyle = {
    height: 'calc(100vh - 184px)',
    overflow: 'hidden',
  };
  return (
    <div
      className={classnames(className, {
        [styles.contentInner]: inner,
      })}
      style={loading ? loadingStyle : undefined}
    >
      {loading ? <Loader spinning /> : ''}
      {children}
    </div>
  );
};

export default Page;
