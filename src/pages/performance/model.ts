/*
 * @Author: tkiddo
 * @Date: 2021-03-05 14:15:18
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-03-05 14:30:06
 * @Description:
 */
import { CommonModelType } from 'common';
import { pathToRegexp } from 'path-to-regexp';
import api from 'api';

export interface ITime {
  _id: string;
  analysisTime: number;
  appcacheTime: number;
  blankTime: number;
  dnsTime: number;
  domReadyTime: number;
  firstInteract: number;
  origin: number;
  redirectTime: number;
  reqTime: number;
  tcpTime: number;
  ttfbTime: number;
  unloadTime: number;
}

export interface IPerformanceState {
  list: ITime[];
}

const { queryPerformance } = api;

const PerformanceModel: CommonModelType<IPerformanceState> = {
  namespace: 'performance',
  state: {
    list: [],
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (pathToRegexp('/performance').exec(location.pathname)) {
          dispatch({ type: 'query' });
        }
      });
    },
  },
  effects: {
    *query({ payload }, { call, put }) {
      const { data } = yield call(queryPerformance);
      if (data) {
        yield put({ type: 'updateState', payload: { list: data } });
      }
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

export default PerformanceModel;
