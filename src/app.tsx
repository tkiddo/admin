/*
 * @Author: tkiddo
 * @Date: 2021-01-06 09:43:16
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-02-04 15:17:44
 * @Description:
 */
import { createLogger } from 'redux-logger';
import { message } from 'antd';

const isDevelopment = process.env.NODE_ENV === 'development';

export const dva = {
  config: {
    onAction: isDevelopment ? createLogger() : null,
    onError(e: Error) {
      message.error(e.message, 3);
    },
  },
};
