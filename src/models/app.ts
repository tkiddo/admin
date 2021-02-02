/*
 * @Author: tkiddo
 * @Date: 2021-01-05 10:32:23
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-02-02 09:54:08
 * @Description:
 */
import CommonModelType from '@/common/CommonModelType';
import { history } from 'umi';
import store from 'store';
import api from 'api';
import { pathToRegexp } from 'path-to-regexp';
import { ROLE_TYPE } from '@/utils/constants';
import { queryLayout } from 'utils';

const { queryUserInfo, queryRouteList, logoutUser } = api;

interface AppModelState {
  locationPathname: string;
}

const goDashboard = () => {
  if (pathToRegexp(['/', '/login']).exec(history.location.pathname)) {
    history.push({
      pathname: '/dashboard',
    });
  }
};

const AppModel: CommonModelType<AppModelState> = {
  namespace: 'app',
  state: {
    locationPathname: '',
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'query' });
    },
    setupHistory({ dispatch, history }) {
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
        goDashboard();
        return;
      }
      const { locationPathname } = yield select((s: any) => s.app);
      const {
        data: { success, user },
      } = yield call(queryUserInfo, payload);
      if (success && user) {
        const { data } = yield call(queryRouteList);
        const { permission, role } = user;
        let routeList = data;
        if (role !== ROLE_TYPE.ADMIN && role !== ROLE_TYPE.DEVELOPER) {
          routeList = data.filter((item) => permission.includes(item.id));
        }
        store.set('routeList', routeList);
        store.set('permission', permission);
        store.set('user', user);
        store.set('isInit', true);
        goDashboard();
      } else if (queryLayout(locationPathname) !== 'public') {
        history.push({
          pathname: '/login',
        });
      }
    },
    *signOut({ payload }, { call, put }) {
      const data = yield call(logoutUser);
      if (data.success) {
        store.set('routeList', []);
        store.set('permission', []);
        store.set('user', {});
        store.set('isInit', false);
        store.set('token', '');
        store.set('openKeys', []);
        yield put({ type: 'query' });
      } else {
        throw data;
      }
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
