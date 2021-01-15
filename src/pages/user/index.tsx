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
import { UserState } from './model';
import { IPaginationState } from '@/utils/PaginationModel';
import List from './components/List';
import { Page } from 'components';

interface UserProps extends UserState {
  pagination: IPaginationState;
}

interface IProps {
  loading: boolean;
  user: UserProps;
}

const User: ConnectRC<IProps> = ({
  user: { list, pagination, selectedRowKeys },
  loading,
}) => {
  const dispatch = useDispatch();
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

  const handleDeleteItems = () => {
    dispatch({
      type: 'user/multiDelete',
      payload: {
        ids: selectedRowKeys,
      },
    }).then(() => {
      onChange({
        page:
          list.length === selectedRowKeys.length && pagination.current > 1
            ? pagination.current - 1
            : pagination.current,
      });
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
  const listProps = {
    dataSource: list,
    loading,
    pagination,
    rowSelection,
    onChange,
  };

  return (
    <Page inner>
      {selectedRowKeys.length > 0 && (
        <Row style={{ marginBottom: 24, textAlign: 'right', fontSize: 13 }}>
          <Col>
            {`Selected ${selectedRowKeys.length} items `}
            <Popconfirm
              title="Are you sure delete these items?"
              placement="left"
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
    </Page>
  );
};

export default connect(
  ({ user, loading }: { user: UserProps; loading: Loading }) => ({
    loading: loading.effects['user/query'] as boolean,
    user,
  }),
)(User);
