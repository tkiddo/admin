/*
 * @Author: tkiddo
 * @Date: 2021-01-15 14:50:02
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-28 10:54:40
 * @Description:
 */
import React, { FC } from 'react';
import { connect } from 'umi';
import { Page } from 'components';
import { IUserDetail } from './model';
import styles from './index.less';

interface IProps {
  userDetail: IUserDetail;
}

const localeKey = (key) => {
  switch (key) {
    case 'name':
      return '姓名';
    case 'nickName':
      return '昵称';
    case 'age':
      return '年龄';
    case 'phone':
      return '电话';
    case 'email':
      return '邮箱';
    case 'createTime':
      return '创建时间';
    default:
      return key;
  }
};

const UserDetail: FC<IProps> = ({ userDetail }) => {
  const { data } = userDetail;
  const content = [];
  for (const key in data) {
    if ({}.hasOwnProperty.call(data, key)) {
      content.push(
        key === 'isMale' ? (
          <div key={key} className={styles.item}>
            <div>性别</div>
            <div>{data[key] ? '男' : '女'}</div>
          </div>
        ) : (
          <div key={key} className={styles.item}>
            <div>{localeKey(key)}</div>
            <div>{String(data[key])}</div>
          </div>
        ),
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
