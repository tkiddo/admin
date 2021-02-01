/*
 * @Author: tkiddo
 * @Date: 2021-01-15 14:50:02
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-02-01 16:10:06
 * @Description:
 */
import React, { Fragment, memo } from 'react';
import { Button, Row, Input, Form } from 'antd';
import { connect, Loading, useDispatch, ConnectRC } from 'umi';

import styles from './index.less';

import config from '@/utils/config';

const FormItem = Form.Item;

export interface LoginFormValue {
  username: string;
  password: string;
}

interface IProps {
  loading: boolean;
}

const Login: ConnectRC<IProps> = ({ loading }) => {
  const dispatch = useDispatch();
  const handleOk = (values: LoginFormValue) => {
    dispatch({ type: 'login/login', payload: values });
  };
  return (
    <Fragment>
      <div className={styles.form}>
        <div className={styles.logo}>
          <img alt="logo" src={config.logoPath} />
          <span>{config.siteName}</span>
        </div>
        <Form onFinish={handleOk}>
          <FormItem
            name="username"
            rules={[{ required: true }]}
            hasFeedback
            initialValue="guest"
          >
            <Input placeholder="Username" />
          </FormItem>
          <FormItem
            name="password"
            rules={[{ required: true }]}
            hasFeedback
            initialValue="guest"
          >
            <Input type="password" placeholder="Password" />
          </FormItem>
          <Row>
            <Button type="primary" htmlType="submit" loading={loading}>
              登录
            </Button>
            <p>
              <span style={{ marginRight: '10px' }}>用户名 ：guest</span>
              <span>密码 ：guest</span>
            </p>
          </Row>
        </Form>
      </div>
    </Fragment>
  );
};

export default connect(({ loading }: { loading: Loading }) => ({
  loading: loading.models.login,
}))(memo(Login));
