/*
 * @Author: tkiddo
 * @Date: 2021-01-05 10:32:23
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-07 11:13:56
 * @Description:
 */
import CommonModelType from '@/common/CommonModelType';
import { history } from 'umi';
import store from 'store';
import api from 'api';

const { queryUserInfo, queryRouteList } = api;

interface AppModelState {
  locationPathname: string;
}

const AppModel: CommonModelType<AppModelState> = {
  namespace: 'app',
  state: {
    locationPathname: '',
  },
  subscriptions: {
    setup({ dispatch }): void {
      dispatch({ type: 'query' });
    },
    setupHistory({ dispatch }): void {
      history.listen((location) => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
          },
        });
      });
    },
  },
  effects: {
    *query({ payload }, { call, put, select }) {
      const isInit = store.get('isInit');
      if (isInit) {
        history.push({
          pathname: '/dashboard',
        });
        return;
      }
      // const { locationPathname } = select((s) => s.app);
      const { success, user } = yield call(queryUserInfo, payload);
      console.log(success, user);
      // if (success && user) {
      //   console.log(user);
      // }
      // yield history.push({
      //   pathname: '/login',
      // });
    },
  },
  reducers: {
    updateState(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default AppModel;
