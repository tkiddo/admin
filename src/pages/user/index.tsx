import React from 'react';

import { Row, Col, Button, Popconfirm } from 'antd';

import {
  ConnectRC,
  connect,
  history,
  useLocation,
  Loading,
  useDispatch,
} from 'umi';
import { stringify } from 'qs';

import { IUser, UserState } from './model';
import { IPaginationState } from '@/common/PaginationModel';

import { Page } from 'components';
import List from './components/List';
import Filter from './components/Filter';
import Modal from './components/Modal';

interface UserProps extends UserState {
  pagination: IPaginationState;
}

interface IProps {
  loading: Loading;
  user: UserProps;
}

const User: ConnectRC<IProps> = ({
  user: {
    list,
    pagination,
    selectedRowKeys,
    modalType,
    modalVisible,
    currentItem,
  },
  loading,
}) => {
  const dispatch = useDispatch();
  const { pathname, query } = useLocation();

  const handleRefresh = (newQuery: { [key: string]: string | number }) => {
    history.push({
      pathname,
      search: stringify(
        {
          ...query,
          ...newQuery,
        },
        { arrayFormat: 'repeat' },
      ),
    });
  };

  const handleDeleteItems = () => {
    dispatch({
      type: 'user/multiDelete',
      payload: {
        ids: selectedRowKeys,
        callback: () => {
          handleRefresh({
            page:
              list.length === selectedRowKeys.length && pagination.current > 1
                ? pagination.current - 1
                : pagination.current,
          });
        },
      },
    });
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: string[]) => {
      dispatch({
        type: 'user/updateState',
        payload: {
          selectedRowKeys: keys,
        },
      });
    },
  };

  const onChange = (pagination: IPaginationState) => {
    handleRefresh({
      page: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  const onDeleteItem = (id: string) => {
    dispatch({
      type: 'user/delete',
      payload: {
        id,
        callback: () => {
          handleRefresh({
            page:
              list.length === 1 && pagination.current > 1
                ? pagination.current - 1
                : pagination.current,
          });
        },
      },
    });
  };

  const onEditItem = (item: IUser) => {
    dispatch({
      type: 'user/showModal',
      payload: {
        modalType: 'update',
        currentItem: item,
      },
    });
  };

  const listProps = {
    dataSource: list,
    loading: loading.effects['user/query'] as boolean,
    pagination,
    rowSelection,
    onChange,
    onDeleteItem,
    onEditItem,
  };

  const modalProps = {
    visible: modalVisible,
    item: modalType === 'create' ? {} : currentItem,
    title: modalType === 'create' ? '创建用户' : '更新用户',
    centered: true,
    destroyOnClose: true,
    maskClosable: false,
    confirmLoading: loading.effects[`user/${modalType}`] as boolean,
    onCancel() {
      dispatch({
        type: 'user/hideModal',
      });
    },
    onOk: (data: IUser) => {
      dispatch({
        type: `user/${modalType}`,
        payload: {
          data,
          callback: () => {
            handleRefresh({});
          },
        },
      });
    },
  };

  const filterProps = {
    filter: {
      ...query,
    },
    onFilterChange: (value: { [key: string]: string }) => {
      handleRefresh({
        ...value,
      });
    },
    onAdd() {
      dispatch({
        type: 'user/showModal',
        payload: {
          modalType: 'create',
        },
      });
    },
  };

  return (
    <Page inner>
      <Filter {...filterProps}></Filter>
      {selectedRowKeys.length > 0 && (
        <Row style={{ marginBottom: 24, textAlign: 'right', fontSize: 13 }}>
          <Col>
            {`Selected ${selectedRowKeys.length} items `}
            <Popconfirm
              title="Are you sure delete these items?"
              placement="right"
              onConfirm={handleDeleteItems}
            >
              <Button type="primary" style={{ marginLeft: 8 }}>
                Remove
              </Button>
            </Popconfirm>
          </Col>
        </Row>
      )}
      <List {...listProps}></List>
      <Modal {...modalProps}></Modal>
    </Page>
  );
};

export default connect(
  ({ user, loading }: { user: UserProps; loading: Loading }) => ({
    loading,
    user,
  }),
)(User);
