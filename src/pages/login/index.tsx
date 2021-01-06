import React, { FC, Fragment } from 'react';
import { Button, Row, Input, Form } from 'antd';
import { connect, ConnectProps, Loading } from 'umi';

import styles from './index.less';

import config from '@/utils/config';

const FormItem = Form.Item;

interface PageProps extends ConnectProps {
  loading: boolean;
}

export interface LoginFormValue {
  username: string;
  password: string;
}

const Login: FC<PageProps> = ({ loading }) => {
  const handleOk = (values: LoginFormValue) => {
    console.log(values);
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

export default connect(({ loading }: { loading: Loading }) => ({
  loading: loading.models.login,
}))(Login);
