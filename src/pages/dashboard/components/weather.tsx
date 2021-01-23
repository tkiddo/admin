/*
 * @Author: tkiddo
 * @Date: 2021-01-23 13:01:12
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-23 13:21:52
 * @Description:
 */

import React, { FC } from 'react';

import { Spin } from 'antd';

import styles from './weather.less';

export interface WeatherProps {
  city: string;
  icon: string;
  dateTime?: string;
  temperature: string;
  name: string;
}

const Weather: FC<WeatherProps> = ({
  city,
  icon,
  dateTime,
  temperature,
  name,
}) => {
  return (
    <Spin spinning={false}>
      <div className={styles.weather}>
        <div className={styles.left}>
          <div
            className={styles.icon}
            style={{
              backgroundImage: `url(${icon})`,
            }}
          />
          <p>{name}</p>
        </div>
        <div className={styles.right}>
          <h1 className={styles.temperature}>{`${temperature}°`}</h1>
          <p className={styles.description}>
            {city},{dateTime}
          </p>
        </div>
      </div>
    </Spin>
  );
};

export default Weather;
