/*
 * @Author: tkiddo
 * @Date: 2021-01-13 14:37:18
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-02-02 21:29:12
 * @Description:
 */
import modelExtend from 'dva-model-extend';
import { CommonModelType } from 'common';
import { PaginationModel } from '@/common/PaginationModel';
import { pathToRegexp } from 'path-to-regexp';
import api from 'api';

export interface IUser {
  _id: string;
  username: string;
  nickName: string;
  phone: string;
  age: number;
  isMale: boolean;
  email: string;
  createTime: string;
  avatar: string;
  password: string;
  role: string;
}

export interface UserState {
  list: IUser[];
  selectedRowKeys: string[];
  modalVisible: boolean;
  modalType: string;
  currentItem: IUser | Record<string, unknown>;
  roles: string[];
}

const {
  queryUserList,
  removeUserList,
  updateUser,
  removeUser,
  createUser,
  queryRoles,
} = api;

const ExtendModel: CommonModelType<UserState> = {
  namespace: 'user',
  state: {
    list: [],
    selectedRowKeys: [],
    modalVisible: false,
    modalType: 'create',
    currentItem: {},
    roles: [],
  },
  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({ type: 'queryRoles' });
      history.listen((location) => {
        if (pathToRegexp('/user').exec(location.pathname)) {
          const payload = (location as any).query || { page: 1, pageSize: 10 };
          dispatch({
            type: 'query',
            payload,
          });
        }
      });
    },
  },
  effects: {
    *query({ payload = {} }, { call, put }) {
      const { success, data } = yield call(queryUserList, payload);
      if (success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.list,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        });
      }
    },
    *queryRoles({ payload }, { call, put }) {
      const { data } = yield call(queryRoles);
      if (data.length && data.length > 0) {
        yield put({
          type: 'updateState',
          payload: {
            roles: data.map((item) => item.name),
          },
        });
      }
    },
    *multiDelete({ payload: { ids, callback } }, { call, put }) {
      const res = yield call(removeUserList, { ids });
      if (res.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } });
        if (typeof callback === 'function') {
          callback();
        }
      } else {
        throw res;
      }
    },
    *delete({ payload: { _id, callback } }, { call, put, select }) {
      const res = yield call(removeUser, { _id });
      const { selectedRowKeys } = yield select((_: any) => _.user);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {
            selectedRowKeys: selectedRowKeys.filter((_: any) => _ !== _id),
          },
        });
        if (typeof callback === 'function') {
          callback();
        }
      } else {
        throw res;
      }
    },
    *update({ payload: { data, callback } }, { select, call, put }) {
      const _id = yield select(
        ({ user }: { user: UserState }) => user.currentItem._id,
      );
      const newUser = { ...data, _id };
      const res = yield call(updateUser, newUser);
      if (res.success) {
        yield put({ type: 'hideModal' });
        if (typeof callback === 'function') {
          callback();
        }
      } else {
        throw res;
      }
    },
    *create({ payload: { data, callback } }, { call, put }) {
      const res = yield call(createUser, data);
      if (res.success) {
        yield put({ type: 'hideModal' });
        if (typeof callback === 'function') {
          callback();
        }
      } else {
        throw res;
      }
    },
  },
  reducers: {
    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true };
    },

    hideModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: false };
    },
  },
};
const UserModel = modelExtend(PaginationModel, ExtendModel);

export default UserModel;
