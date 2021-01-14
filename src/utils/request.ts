/*
 * @Author: tkiddo
 * @Date: 2021-01-06 10:02:04
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-14 10:28:17
 * @Description:
 */

import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { cloneDeep } from 'lodash';
import { parse, compile } from 'path-to-regexp';
import { message } from 'antd';

interface Result {
  success: boolean;
  message: string;
  statusCode: number;
  data: { [key: string]: unknown };
}

const request = (options: AxiosRequestConfig): Promise<Result> => {
  // eslint-disable-next-line prefer-const
  let { data, url = '' } = options;
  const cloneData = cloneDeep(data);

  try {
    let domain = '';
    const urlMatch = url.match(/[a-zA-z]+:\/\/[^/]*/);
    if (urlMatch) {
      [domain] = urlMatch;
      url = url.slice(domain.length);
    }

    const match = parse(url);
    url = compile(url)(data);

    for (const item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name];
      }
    }
    url = domain + url;
  } catch (e) {
    message.error(e.message);
  }

  options.url = url;
  options.params = cloneData;
  return axios(options)
    .then((res: AxiosResponse) => {
      const { statusText, status, data } = res;
      return Promise.resolve({
        success: true,
        message: statusText,
        statusCode: status,
        data,
      });
    })
    .catch((error: AxiosError) => {
      const { response } = error;

      let msg;
      let statusCode;

      if (response && response instanceof Object) {
        const { data, statusText } = response;
        statusCode = response.status;
        msg = data.message || statusText;
      } else {
        statusCode = 600;
        msg = error.message || 'Network Error';
      }

      /* eslint-disable */
      return Promise.reject({
        success: false,
        statusCode,
        message: msg,
      });
    });
};

export default request;
