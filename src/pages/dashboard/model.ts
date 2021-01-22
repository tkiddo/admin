/*
 * @Author: tkiddo
 * @Date: 2021-01-22 16:02:08
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-22 16:46:15
 * @Description:
 */
import { pathToRegexp } from 'path-to-regexp';
import { parse } from 'qs';

import api from 'api';
import { CommonModelType } from 'common';

import { NumberCardProps } from './components/NumberCard';

export interface DashboardState {
  numbers: NumberCardProps[];
}

const { queryDashboard } = api;

const DashboardModel: CommonModelType<DashboardState> = {
  namespace: 'dashboard',
  state: {
    numbers: [],
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (
          pathToRegexp('/dashboard').exec(pathname) ||
          pathToRegexp('/').exec(pathname)
        ) {
          dispatch({ type: 'query' });
          dispatch({ type: 'queryWeather' });
        }
      });
    },
  },
  effects: {
    *query({ payload }, { call, put }) {
      const { data } = yield call(queryDashboard, parse(payload));
      yield put({
        type: 'updateState',
        payload: data,
      });
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default DashboardModel;
