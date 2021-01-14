import React from 'react';

import { ConnectRC, connect, history, useLocation, Loading } from 'umi';
import { IUser } from './model';
import { IPaginationState } from '@/utils/PaginationModel';
import List from './components/List';
import { Page } from 'components';

interface IProps {
  loading: boolean;
  list: IUser[];
  pagination: IPaginationState;
}

const User: ConnectRC<IProps> = ({ list, pagination, loading }) => {
  const { pathname } = useLocation();
  const onChange = (pagination: IPaginationState) => {
    history.push({
      pathname,
      query: {
        page: pagination.current.toString(),
        pageSize: pagination.pageSize.toString(),
      },
    });
  };
  return (
    <Page inner>
      <List
        list={list}
        pagination={pagination}
        onChange={onChange}
        loading={loading}
      ></List>
    </Page>
  );
};

export default connect(
  ({
    user,
    loading,
  }: {
    user: { list: IUser[]; pagination: IPaginationState };
    loading: Loading;
  }) => ({
    list: user.list,
    pagination: user.pagination,
    loading: loading.effects['user/query'] as boolean,
  }),
)(User);
