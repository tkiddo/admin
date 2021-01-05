/*
 * @Author: tkiddo
 * @Date: 2021-01-05 09:44:59
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-05 15:29:35
 * @Description:
 */

import CommonModelType from '@/common/CommonModelType';

export interface LoginModelState {
  name: string;
}

const LoginModel: CommonModelType<LoginModelState> = {
  namespace: 'login',
  state: {
    name: '123',
  },
  subscriptions: {
    // setup({ dispatch }): void {
    //   dispatch({ type: 'login' });
    // },
  },
  effects: {
    *login({ payload }, { call, put, select }) {
      yield console.log('login');
    },
  },
};

export default LoginModel;
