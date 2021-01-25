/*
 * @Author: tkiddo
 * @Date: 2021-01-25 10:20:11
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-25 14:26:08
 * @Description:
 */
import React, { FC } from 'react';

import { Row, Col, Card, Button } from 'antd';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from 'recharts';
import Container from './container';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const colProps = {
  lg: 12,
  md: 24,
};

const SimpleLineChart = () => (
  <Container>
    <LineChart
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="pv"
        stroke="#8884d8"
        activeDot={{
          r: 8,
        }}
      />
      <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
    </LineChart>
  </Container>
);

const VerticalLineChart = () => (
  <Container>
    <LineChart
      layout="vertical"
      width={600}
      height={300}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <XAxis type="number" />
      <YAxis dataKey="name" type="category" />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Line dataKey="pv" stroke="#8884d8" />
      <Line dataKey="uv" stroke="#82ca9d" />
    </LineChart>
  </Container>
);

const DashedLineChart = () => (
  <Container>
    <LineChart
      width={600}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="pv"
        stroke="#8884d8"
        strokeDasharray="5 5"
      />
      <Line
        type="monotone"
        dataKey="uv"
        stroke="#82ca9d"
        strokeDasharray="3 4 5 2"
      />
    </LineChart>
  </Container>
);

const LineChartWithReferenceLines = () => (
  <Container>
    <LineChart
      width={600}
      height={300}
      data={data}
      margin={{
        top: 20,
        right: 50,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <ReferenceLine x="Page C" stroke="red" label="Max PV PAGE" />
      <ReferenceLine y={9800} label="Max" stroke="red" />
      <Line type="monotone" dataKey="pv" stroke="#8884d8" />
      <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
    </LineChart>
  </Container>
);

const LineChartPage: FC = () => {
  return (
    <div className="content-inner">
      <Button
        type="primary"
        style={{
          position: 'absolute',
          right: 0,
          top: -48,
        }}
      >
        <a
          href="http://recharts.org/#/en-US/examples/TinyBarChart"
          target="blank"
        >
          Show More
        </a>
      </Button>
      <Row gutter={24}>
        <Col {...colProps}>
          <Card title="SimpleLineChart">
            <SimpleLineChart />
          </Card>
        </Col>
        <Col {...colProps}>
          <Card title="VerticalLineChart">
            <VerticalLineChart />
          </Card>
        </Col>
        <Col {...colProps}>
          <Card title="DashedLineChart">
            <DashedLineChart />
          </Card>
        </Col>
        <Col {...colProps}>
          <Card title="LineChartWithReferenceLines">
            <LineChartWithReferenceLines />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default LineChartPage;
