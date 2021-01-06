/*
 * @Author: tkiddo
 * @Date: 2021-01-06 10:02:04
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-06 14:24:02
 * @Description:
 */

import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

interface Result {
  success: boolean;
  message: string;
  statusCode: number;
  data: { [key: string]: unknown };
}

const request = (options: AxiosRequestConfig): Promise<Result> => {
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
