/*
 * @Author: tkiddo
 * @Date: 2021-02-02 14:38:14
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-02-02 21:36:08
 * @Description:
 */

import { CommonModelType } from 'common';
import { pathToRegexp } from 'path-to-regexp';
import api from 'api';

export interface IRole {
  _id: string;
  name: string;
  permission: string[];
}

export interface RolesState {
  list: IRole[];
  currentItem: IRole | Record<string, unknown>;
}

const { queryRoles, removeRole, updateRole, cretaeRole } = api;

const RolesModel: CommonModelType<RolesState> = {
  namespace: 'role',
  state: {
    list: [],
    currentItem: {},
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (pathToRegexp('/role').exec(location.pathname)) {
          dispatch({ type: 'query' });
        }
      });
    },
  },
  effects: {
    *query({ payload }, { call, put }) {
      const { data } = yield call(queryRoles, payload);
      if (data) {
        yield put({ type: 'updateState', payload: { list: data } });
      }
    },
    *delete({ payload }, { call, put }) {
      const { _id, callback } = payload;
      const res = yield call(removeRole, { _id });
      if (res.success) {
        typeof callback === 'function' && callback();
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

export default RolesModel;
