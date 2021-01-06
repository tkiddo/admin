/*
 * @Author: tkiddo
 * @Date: 2021-01-06 09:56:05
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-06 14:26:10
 * @Description:
 */

import config from 'config';

import api from './api';

import request from '@/utils/request';

import { AxiosRequestConfig } from 'axios';

interface RequestFunction {
  (data: { [key: string]: unknown }): void;
}

const gen = (params: string): RequestFunction => {
  const { apiPrefix } = config;
  let url = `${apiPrefix}${params}`;

  let method: AxiosRequestConfig['method'] = 'GET';

  const paramsArray = params.split(' ');

  if (paramsArray.length === 2) {
    method = paramsArray[0] as AxiosRequestConfig['method'];
    url = apiPrefix + paramsArray[1];
  }

  return function (data) {
    request({
      url,
      data,
      method,
    });
  };
};

const APIFunction: { [key: string]: RequestFunction } = {};

for (const key in api) {
  APIFunction[key] = gen(api[key]);
}

export default APIFunction;
