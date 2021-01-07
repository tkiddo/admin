import React, { FC, Fragment, memo } from 'react';
import { Button, Row, Input, Form } from 'antd';
import { connect, Loading, Dispatch } from 'umi';

import styles from './index.less';

import config from '@/utils/config';

import { CommonPageProps } from 'common';

const FormItem = Form.Item;

export interface LoginFormValue {
  username: string;
  password: string;
}

const Login: FC<CommonPageProps> = ({ loading, dispatch }) => {
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
          <FormItem name="username" rules={[{ required: true }]} hasFeedback>
            <Input placeholder="Username" />
          </FormItem>
          <FormItem name="password" rules={[{ required: true }]} hasFeedback>
            <Input type="password" placeholder="Password" />
          </FormItem>
          <Row>
            <Button type="primary" htmlType="submit" loading={loading}>
              Sign in
            </Button>
            <p>
              <span style={{ marginRight: '10px' }}>Username ：guest</span>
              <span>Password ：guest</span>
            </p>
          </Row>
        </Form>
      </div>
    </Fragment>
  );
};

export default connect(
  ({ loading, dispatch }: { loading: Loading; dispatch: Dispatch }) => ({
    loading: loading.models.login,
    dispatch,
  }),
)(memo(Login));
