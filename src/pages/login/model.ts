/*
 * @Author: tkiddo
 * @Date: 2021-01-05 09:44:59
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-13 13:57:25
 * @Description:
 */

import { CommonModelType } from 'common';

import api from 'api';

const { loginUser } = api;

const LoginModel: CommonModelType<any> = {
  namespace: 'login',
  state: {},
  subscriptions: {
    // setup({ dispatch }): void {
    //   dispatch({ type: 'login' });
    // },
  },
  effects: {
    *login({ payload }, { call, put, select }) {
      const data = yield call(loginUser, payload);
      if (data.success) {
        yield put({ type: 'app/query' });
      }
    },
  },
};

export default LoginModel;
