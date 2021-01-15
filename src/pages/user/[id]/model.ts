/*
 * @Author: tkiddo
 * @Date: 2021-01-14 15:56:05
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-14 16:25:21
 * @Description:
 */
import { pathToRegexp } from 'path-to-regexp';
import { CommonModelType } from 'common';
import api from 'api';

export interface IUserDetail {
  data: {
    id?: string;
    name?: string;
    nickName?: string;
    phone?: string;
    age?: number;
    address?: string;
    isMale?: boolean;
    email?: string;
    createTime?: string;
    avatar?: string;
  };
}

const { queryUser } = api;

const UserDetailModel: CommonModelType<IUserDetail> = {
  namespace: 'userDetail',

  state: {
    data: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/user/:id').exec(pathname);
        if (match) {
          dispatch({ type: 'query', payload: { id: match[1] } });
        }
      });
    },
  },

  effects: {
    *query({ payload }, { call, put }) {
      const data = yield call(queryUser, payload);
      const { success, message, status, ...other } = data;
      if (success) {
        yield put({
          type: 'querySuccess',
          payload: {
            data: other.data,
          },
        });
      } else {
        throw data;
      }
    },
  },

  reducers: {
    querySuccess(state, { payload }) {
      const { data } = payload;
      return {
        ...state,
        data,
      };
    },
  },
};

export default UserDetailModel;
