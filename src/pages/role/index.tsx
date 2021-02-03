/*
 * @Author: tkiddo
 * @Date: 2021-02-02 14:38:01
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-02-03 11:01:48
 * @Description:
 */
import React from 'react';

import { ConnectRC, connect, Loading } from 'umi';
import store from 'store';

import { Button } from 'antd';

import { RoleState, IRole } from './model';

import { Page } from 'components';
import List from './components/List';
import Modal from './components/Modal';

interface IProps {
  loading: Loading;
  role: RoleState;
}

const Role: ConnectRC<IProps> = ({
  role: { list, currentItem, modalType, modalVisible },
  loading,
  dispatch,
}) => {
  const handleAdd = () => {
    dispatch({ type: 'role/showModal', payload: { modalType: 'create' } });
  };
  const listProps = {
    loading: loading.effects['role/query'] as boolean,
    data: list,
    dist: store.get('routeList'),
    onDeleteItem: (_id: string): void => {
      dispatch({
        type: 'role/delete',
        payload: { _id },
      }).then(() => dispatch({ type: 'role/query' }));
    },
    onEditItem: (item: IRole) => {
      dispatch({
        type: 'role/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      });
    },
  };
  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    title: modalType === 'create' ? '创建角色' : '编辑角色',
    visible: modalVisible,
    width: 600,
    centered: true,
    onCancel: () => {
      dispatch({ type: 'role/hideModal' });
    },
    onOk: (value: IRole) => {
      dispatch({ type: `role/${modalType}`, payload: value }).then(() =>
        dispatch({ type: 'role/query' }),
      );
    },
  };
  return (
    <Page inner>
      <Button type="primary" size="middle" onClick={handleAdd}>
        创建
      </Button>
      <List {...listProps} />
      <Modal {...modalProps} />
    </Page>
  );
};

export default connect(
  ({ role, loading }: { role: RoleState; loading: Loading }) => ({
    loading,
    role,
  }),
)(Role);
