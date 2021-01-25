/*
 * @Author: tkiddo
 * @Date: 2021-01-25 14:47:24
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-25 15:03:14
 * @Description:
 */
import React, { FC } from 'react';

import { Row, Col, Card, Button } from 'antd';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
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

const percentData = [
  {
    month: '2015.01',
    a: 4000,
    b: 2400,
    c: 2400,
  },
  {
    month: '2015.02',
    a: 3000,
    b: 1398,
    c: 2210,
  },
  {
    month: '2015.03',
    a: 2000,
    b: 9800,
    c: 2290,
  },
  {
    month: '2015.04',
    a: 2780,
    b: 3908,
    c: 2000,
  },
  {
    month: '2015.05',
    a: 1890,
    b: 4800,
    c: 2181,
  },
  {
    month: '2015.06',
    a: 2390,
    b: 3800,
    c: 2500,
  },
  {
    month: '2015.07',
    a: 3490,
    b: 4300,
    c: 2100,
  },
];

const colProps = {
  lg: 12,
  md: 24,
};

// const getPercent = (value: number, total: number) => {
//   const ratio = total > 0 ? value / total : 0;

//   return toPercent(ratio, 2);
// };

const toPercent = (decimal: number, fixed = 0) =>
  `${(decimal * 100).toFixed(fixed)}%`;

// const renderTooltipContent = (o) => {
//   const { payload, label } = o;
//   const total = payload.reduce((result, entry) => result + entry.value, 0);

//   return (
//     <div className="customized-tooltip-content">
//       <p className="total">{`${label} (Total: ${total})`}</p>
//       <ul className="list">
//         {payload.map((entry, index) => (
//           <li key={`item-${index}`} style={{ color: entry.color }}>
//             {`${entry.name}: ${entry.value}(${getPercent(entry.value, total)})`}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

const SimpleAreaChart = () => (
  <Container>
    <AreaChart
      width={500}
      height={400}
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
    </AreaChart>
  </Container>
);

const StackAreaChart = () => (
  <Container>
    <AreaChart
      width={500}
      height={400}
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="uv"
        stackId="1"
        stroke="#8884d8"
        fill="#8884d8"
      />
      <Area
        type="monotone"
        dataKey="pv"
        stackId="1"
        stroke="#82ca9d"
        fill="#82ca9d"
      />
      <Area
        type="monotone"
        dataKey="amt"
        stackId="1"
        stroke="#ffc658"
        fill="#ffc658"
      />
    </AreaChart>
  </Container>
);

const PercentAreaChart = () => (
  <Container>
    <AreaChart
      width={500}
      height={400}
      data={percentData}
      stackOffset="expand"
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis tickFormatter={toPercent} />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="a"
        stackId="1"
        stroke="#8884d8"
        fill="#8884d8"
      />
      <Area
        type="monotone"
        dataKey="b"
        stackId="1"
        stroke="#82ca9d"
        fill="#82ca9d"
      />
      <Area
        type="monotone"
        dataKey="c"
        stackId="1"
        stroke="#ffc658"
        fill="#ffc658"
      />
    </AreaChart>
  </Container>
);

const TinyAreaChart = () => (
  <Container>
    <AreaChart
      width={200}
      height={60}
      data={data}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
    </AreaChart>
  </Container>
);

const AreaChartPage: FC = () => {
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
          href="http://recharts.org/#/en-US/examples/TinyAreaChart"
          target="blank"
        >
          Show More
        </a>
      </Button>
      <Row gutter={24}>
        <Col {...colProps}>
          <Card title="SimpleAreaChart">
            <SimpleAreaChart />
          </Card>
        </Col>
        <Col {...colProps}>
          <Card title="StackAreaChart">
            <StackAreaChart />
          </Card>
        </Col>
        <Col {...colProps}>
          <Card title="PercentAreaChart">
            <PercentAreaChart />
          </Card>
        </Col>
        <Col {...colProps}>
          <Card title="TinyAreaChart">
            <TinyAreaChart />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AreaChartPage;
