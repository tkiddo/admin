/*
 * @Author: tkiddo
 * @Date: 2021-01-13 14:37:18
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-13 16:11:01
 * @Description:
 */
import modelExtend from 'dva-model-extend';
import { PaginationModel, CommonModelType, IPaginationState } from 'common';
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
  modalVisiable: boolean;
  list: IUser[];
  pagination: IPaginationState;
}

interface PageQuery {
  page?: number;
  pageSize?: number;
}

const { queryUserList } = api;

const UserModel: CommonModelType<UserState> = modelExtend(PaginationModel, {
  namespace: 'user',
  state: {
    modalVisiable: false,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (pathToRegexp('/user').exec(location.pathname)) {
          const payload = location.query || { page: 1, pageSize: 10 };
          dispatch({
            type: 'query',
            payload,
          });
        }
      });
    },
  },
  effects: {
    *query({ payload = {} }: { payload: PageQuery }, { call, put }) {
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
  },
});

export default UserModel;
