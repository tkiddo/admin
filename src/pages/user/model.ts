/*
 * @Author: tkiddo
 * @Date: 2021-01-13 14:37:18
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-18 15:01:11
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

const { queryUserList, removeUserList, updateUser, removeUser } = api;

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
    *multiDelete({ payload = {} }, { call, put }) {
      const data = yield call(removeUserList, payload);
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } });
        payload.callback();
      } else {
        throw data;
      }
    },
    *delete({ id, callback }, { call, put, select }) {
      const data = yield call(removeUser, { id: id });
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
    *update({ payload }, { select, call, put }) {
      const id = yield select(
        ({ user }: { user: UserState }) => user.currentItem.id,
      );
      const newUser = { ...payload, id };
      const data = yield call(updateUser, newUser);
      if (data.success) {
        yield put({ type: 'hideModal' });
      } else {
        throw data;
      }
    },
  },
  reducers: {
    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true };
    },

    hideModal(state) {
      return { ...state, modalVisible: false };
    },
  },
};
const UserModel = modelExtend(PaginationModel, ExtendModel);

export default UserModel;
