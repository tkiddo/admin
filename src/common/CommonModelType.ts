/*
 * @Author: tkiddo
 * @Date: 2021-01-05 10:11:40
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-07 10:06:51
 * @Description:
 */
import { Effect, Reducer, Subscription } from 'umi';

export default interface CommonModelType<ModelState> {
  namespace: string;
  state: ModelState;
  effects?: {
    [key: string]: Effect;
  };
  reducers?: {
    [key: string]: Reducer<ModelState>;
  };
  subscriptions?: {
    [key: string]: Subscription;
  };
}
