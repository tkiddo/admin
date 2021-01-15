/*
 * @Author: tkiddo
 * @Date: 2021-01-13 14:37:18
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-15 10:41:42
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
}

const { queryUserList, removeUserList } = api;

const ExtendModel: CommonModelType<UserState> = {
  namespace: 'user',
  state: {
    list: [],
    selectedRowKeys: [],
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
      } else {
        throw data;
      }
    },
  },
};
const UserModel = modelExtend(PaginationModel, ExtendModel);

export default UserModel;
