/*
 * @Author: tkiddo
 * @Date: 2021-01-06 09:43:16
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-02-05 20:20:28
 * @Description:
 */
import { createLogger } from 'redux-logger';
import { message } from 'antd';

export const dva = {
  config: {
    onAction: createLogger(),
    onError(e: Error) {
      message.error(e.message, 3);
    },
  },
};
