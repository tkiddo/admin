import React, { FC } from 'react';
import { connect } from 'umi';
import { Page } from 'components';
import { IUserDetail } from './model';
import styles from './index.less';

interface IProps {
  userDetail: IUserDetail;
}

const UserDetail: FC<IProps> = ({ userDetail }) => {
  const { data } = userDetail;
  const content = [];
  for (const key in data) {
    if ({}.hasOwnProperty.call(data, key)) {
      content.push(
        <div key={key} className={styles.item}>
          <div>{key}</div>
          <div>{String(data[key])}</div>
        </div>,
      );
    }
  }
  return (
    <Page inner>
      <div className={styles.content}>{content}</div>
    </Page>
  );
};

export default connect(({ userDetail }: { userDetail: IUserDetail }) => ({
  userDetail,
}))(UserDetail);
