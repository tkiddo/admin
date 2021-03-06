/*
 * @Author: tkiddo
 * @Date: 2021-01-15 14:50:02
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-02-01 15:16:49
 * @Description:
 */
import React, { FC } from 'react';
import { connect } from 'umi';
import { Avatar } from 'antd';
import { Page } from 'components';
import { IUserDetail } from './model';
import styles from './index.less';

interface IProps {
  userDetail: IUserDetail;
}

const localeKey = (key: string) => {
  switch (key) {
    case 'username':
      return '用户名';
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
    case 'role':
      return '角色';
    case 'password':
      return '密码';
    default:
      return key;
  }
};

const UserDetail: FC<IProps> = ({ userDetail }) => {
  const { data } = userDetail;
  const content = [];
  for (const key in data) {
    if (
      {}.hasOwnProperty.call(data, key) &&
      key !== '_id' &&
      key !== 'avatar' &&
      key !== 'timerstamp'
    ) {
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
  content.unshift(<Avatar src={data.avatar} key="avatar"></Avatar>);
  return (
    <Page inner>
      <div className={styles.content}>{content}</div>
    </Page>
  );
};

export default connect(({ userDetail }: { userDetail: IUserDetail }) => ({
  userDetail,
}))(UserDetail);
