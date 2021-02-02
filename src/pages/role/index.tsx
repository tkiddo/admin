/*
 * @Author: tkiddo
 * @Date: 2021-02-02 14:38:01
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-02-02 21:38:19
 * @Description:
 */
import React from 'react';

import { ConnectRC, connect, Loading, useDispatch } from 'umi';
import store from 'store';

import { RolesState } from './model';

import { Page } from 'components';
import List from './components/List';

interface IProps {
  loading: Loading;
  role: RolesState;
}

const Role: ConnectRC<IProps> = ({ role: { list }, loading }) => {
  const dispatch = useDispatch();
  const listProps = {
    loading: loading.effects['role/query'] as boolean,
    data: list,
    dist: store.get('routeList'),
    onDeleteItem: (_id: string): void => {
      dispatch({
        type: 'role/delete',
        payload: {
          _id,
          callback() {
            dispatch({ type: 'role/query' });
          },
        },
      });
    },
  };
  return (
    <Page inner>
      <List {...listProps} />
    </Page>
  );
};

export default connect(
  ({ role, loading }: { role: RolesState; loading: Loading }) => ({
    loading,
    role,
  }),
)(Role);
