import React, { FC } from 'react';
import Loader from '../Loader';
import styles from './Page.less';
import classnames from 'classnames';

interface IProps {
  className: string;
  loading: boolean;
  inner: boolean;
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
