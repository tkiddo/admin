/*
 * @Author: tkiddo
 * @Date: 2021-01-22 16:02:08
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-23 14:08:11
 * @Description:
 */
import { pathToRegexp } from 'path-to-regexp';
import { parse } from 'qs';

import api from 'api';
import { CommonModelType } from 'common';

import { NumberCardProps } from './components/numberCard';
import { SaleItem } from './components/sales';
import { WeatherProps } from './components/weather';
import { QuoteProps } from './components/quote';
import { RecentSaleItem } from './components/recentSales';
import { CommentItem } from './components/comments';

export interface DashboardState {
  numbers: NumberCardProps[];
  sales: SaleItem[];
  weather: WeatherProps;
  quote: QuoteProps;
  recentSales: RecentSaleItem[];
  comments: CommentItem[];
}

const { queryDashboard } = api;

const DashboardModel: CommonModelType<DashboardState> = {
  namespace: 'dashboard',
  state: {
    numbers: [],
    sales: [],
    weather: {
      city: 'HangZhou',
      temperature: '30',
      name: '晴',
      icon: '/assets/icon/sunny.png',
    },
    quote: {
      name: '',
      content: '',
      title: '',
      avatar: '',
    },
    recentSales: [],
    comments: [],
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
