/*
 * @Author: tkiddo
 * @Date: 2021-02-02 14:38:01
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-02-02 15:34:30
 * @Description:
 */
import React from 'react';

import { ConnectRC, connect, Loading, useDispatch } from 'umi';
import store from 'store';

import { IRole, RolesState } from './model';

import { Page } from 'components';
import List from './components/List';

interface IProps {
  loading: Loading;
  role: RolesState;
}

const Role: ConnectRC<IProps> = ({ role: { list }, loading }) => {
  const listProps = {
    data: list,
    dist: store.get('routeList'),
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
