/*
 * @Author: tkiddo
 * @Date: 2021-02-02 14:38:14
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-02-03 11:07:17
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

export interface RoleState {
  list: IRole[];
  currentItem: IRole | Record<string, unknown>;
  modalVisible: boolean;
  modalType: string;
}

const { queryRoles, removeRole, updateRole, createRole } = api;

const RoleModel: CommonModelType<RoleState> = {
  namespace: 'role',
  state: {
    list: [],
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
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
      const res = yield call(removeRole, payload);
      if (res.success) {
        yield put({ type: 'user/queryRoles' });
      } else {
        throw res;
      }
    },
    *create({ payload }, { call, put }) {
      const res = yield call(createRole, payload);
      if (res.success) {
        yield put({ type: 'hideModal' });
      } else {
        throw res;
      }
    },
    *update({ payload }, { select, call, put }) {
      const _id = yield select(
        ({ role }: { role: RoleState }) => role.currentItem._id,
      );
      const newRole = { ...payload, _id };
      const res = yield call(updateRole, newRole);
      if (res.success) {
        yield put({ type: 'hideModal' });
      } else {
        throw res;
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
    showModal(state, { payload }) {
      return {
        ...state,
        ...payload,
        modalVisible: true,
      };
    },
    hideModal(state, { payload }) {
      return {
        ...state,
        ...payload,
        modalVisible: false,
      };
    },
  },
};

export default RoleModel;
