/*
 * @Author: tkiddo
 * @Date: 2021-01-05 10:32:23
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-05 16:14:24
 * @Description:
 */
import CommonModelType from '@/common/CommonModelType';
import { history } from 'umi';

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
    setupHistory({ dispatch, history }): void {
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
    *query() {
      yield history.push({
        pathname: '/login',
      });
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
