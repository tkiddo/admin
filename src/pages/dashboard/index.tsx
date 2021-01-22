/*
 * @Author: tkiddo
 * @Date: 2021-01-15 14:50:02
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-22 16:53:42
 * @Description:
 */
import React, { memo } from 'react';
import styles from './index.less';

import { DashboardState } from './model';

import { ConnectRC, connect, Loading } from 'umi';
import { Col, Row } from 'antd';

import NumberCard from './components/NumberCard';
import { Page } from 'components';

interface IProps {
  loading: Loading;
  dashboard: DashboardState;
}

const Dashboard: ConnectRC<IProps> = ({ dashboard }) => {
  const { numbers } = dashboard;

  const numberCards = numbers.map((item, key) => (
    <Col key={key} lg={6} md={12}>
      <NumberCard {...item} />
    </Col>
  ));
  return (
    <Page className={styles.dashboard}>
      <Row gutter={24}>{numberCards}</Row>
    </Page>
  );
};

export default connect(
  ({
    dashboard,
    loading,
  }: {
    dashboard: DashboardState;
    loading: Loading;
  }) => ({
    dashboard,
    loading,
  }),
)(memo(Dashboard));
