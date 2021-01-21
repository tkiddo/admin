/*
 * @Author: tkiddo
 * @Date: 2021-01-13 14:37:18
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-20 14:05:42
 * @Description:
 */
import modelExtend from 'dva-model-extend';
import { CommonModelType } from 'common';
import { PaginationModel } from '@/utils/paginationModel';
import { pathToRegexp } from 'path-to-regexp';
import api from 'api';

export interface IUser {
  id: string;
  name: string;
  nickName: string;
  phone: string;
  age: number;
  address: string;
  isMale: boolean;
  email: string;
  createTime: string;
  avatar: string;
}

export interface UserState {
  list: IUser[];
  selectedRowKeys: string[];
  modalVisible: boolean;
  modalType: string;
  currentItem: IUser | Record<string, unknown>;
}

const {
  queryUserList,
  removeUserList,
  updateUser,
  removeUser,
  createUser,
} = api;

const ExtendModel: CommonModelType<UserState> = {
  namespace: 'user',
  state: {
    list: [],
    selectedRowKeys: [],
    modalVisible: false,
    modalType: 'create',
    currentItem: {},
  },
  subscriptions: {
    setup({ dispatch, history }) {
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
      const { data } = yield call(queryUserList, payload);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        });
      }
    },
    *multiDelete({ payload: { ids, callback } }, { call, put }) {
      const data = yield call(removeUserList, { ids });
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } });
        if (typeof callback === 'function') {
          callback();
        }
      } else {
        throw data;
      }
    },
    *delete({ payload: { id, callback } }, { call, put, select }) {
      const data = yield call(removeUser, { id });
      const { selectedRowKeys } = yield select((_: any) => _.user);
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            selectedRowKeys: selectedRowKeys.filter((_: any) => _ !== id),
          },
        });
        if (typeof callback === 'function') {
          callback();
        }
      } else {
        throw data;
      }
    },
    *update({ payload: { data, callback } }, { select, call, put }) {
      const id = yield select(
        ({ user }: { user: UserState }) => user.currentItem.id,
      );
      const newUser = { ...data, id };
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
