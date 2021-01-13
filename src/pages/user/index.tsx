import React from 'react';
import List from './components/List';
import { ConnectRC, connect } from 'umi';
import { IUser, UserState } from './model';
import { IPaginationState } from 'common';

interface IProps {
  loading: boolean;
  list: IUser[];
  pagination: IPaginationState;
}

const User: ConnectRC<IProps> = ({ list, pagination }) => {
  return (
    <div>
      <List list={list} pagination={pagination}></List>
    </div>
  );
};

export default connect(({ user }: { user: UserState }) => ({
  list: user.list,
  pagination: user.pagination,
}))(User);
