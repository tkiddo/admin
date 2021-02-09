/*
 * @Author: tkiddo
 * @Date: 2021-02-09 08:27:38
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-02-09 08:39:05
 * @Description:
 */

import { CommonModelType, IRoute } from 'common';
import { pathToRegexp } from 'path-to-regexp';

import api from 'api';

export interface MenuState {
  data: IRoute[];
  currentItem: IRoute | Record<string, unknown>;
}

const { queryRouteList, updateRoute, createRoute, removeRoute } = api;

const MenuModel: CommonModelType<MenuState> = {
  namespace: 'menu',
  state: {
    data: [],
    currentItem: {},
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (pathToRegexp('/menu').exec(location.pathname)) {
          dispatch({ type: 'query' });
        }
      });
    },
  },
  effects: {
    *query({ payload }, { call, put }) {
      const { data } = yield call(queryRouteList, payload);
      if (data) {
        yield put({ type: 'updateState', payload: { data } });
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

export default MenuModel;
