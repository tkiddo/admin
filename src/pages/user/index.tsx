import React from 'react';
import List from './components/List';
import { ConnectRC, connect, history, useLocation } from 'umi';
import { IUser } from './model';
import { IPaginationState } from '@/utils/PaginationModel';

interface IProps {
  loading: boolean;
  list: IUser[];
  pagination: IPaginationState;
}

const User: ConnectRC<IProps> = ({ list, pagination }) => {
  const { pathname } = useLocation();
  const onChange = (pagination: IPaginationState) => {
    history.push({
      pathname,
      query: {
        page: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
  };
  return (
    <div>
      <List list={list} pagination={pagination} onChange={onChange}></List>
    </div>
  );
};

export default connect(
  ({ user }: { user: { list: IUser[]; pagination: IPaginationState } }) => ({
    list: user.list,
    pagination: user.pagination,
  }),
)(User);
