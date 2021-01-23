/*
 * @Author: tkiddo
 * @Date: 2021-01-15 14:50:02
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-23 14:08:25
 * @Description:
 */
import React, { memo } from 'react';
import styles from './index.less';

import { DashboardState } from './model';

import { ConnectRC, connect, Loading } from 'umi';
import { Col, Row, Card } from 'antd';

import NumberCard from './components/numberCard';
import Sales from './components/sales';
import Weather from './components/weather';
import Quote from './components/quote';
import RecentSales from './components/recentSales';
import Comments from './components/comments';

import { Page } from 'components';

import { Color } from '@/utils/theme';

interface IProps {
  loading: Loading;
  dashboard: DashboardState;
}

const bodyStyle = {
  bodyStyle: {
    height: 432,
    background: '#fff',
  },
};

const Dashboard: ConnectRC<IProps> = ({ dashboard }) => {
  const { numbers, sales, weather, quote, recentSales, comments } = dashboard;

  const numberCards = numbers.map((item, key) => (
    <Col key={key} lg={6} md={12}>
      <NumberCard {...item} />
    </Col>
  ));
  return (
    <Page className={styles.dashboard}>
      <Row gutter={24}>
        {numberCards}
        <Col lg={18} md={24}>
          <Card
            bordered={false}
            bodyStyle={{
              padding: '24px 36px 24px 0',
            }}
          >
            <Sales data={sales} />
          </Card>
        </Col>
        <Col lg={6} md={24}>
          <Row gutter={24}>
            <Col lg={24} md={12}>
              <Card
                bordered={false}
                className={styles.weather}
                bodyStyle={{
                  padding: 0,
                  height: 204,
                  background: Color.blue,
                }}
              >
                <Weather {...weather} />
              </Card>
            </Col>
            <Col lg={24} md={12}>
              <Card
                bordered={false}
                className={styles.quote}
                bodyStyle={{
                  padding: 0,
                  height: 204,
                  background: Color.peach,
                }}
              >
                <Quote {...quote} />
              </Card>
            </Col>
          </Row>
        </Col>
        <Col lg={12} md={24}>
          <Card bordered={false} {...bodyStyle}>
            <RecentSales data={recentSales} />
          </Card>
        </Col>
        <Col lg={12} md={24}>
          <Card bordered={false} {...bodyStyle}>
            <Comments data={comments} />
          </Card>
        </Col>
      </Row>
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
