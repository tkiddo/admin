/*
 * @Author: tkiddo
 * @Date: 2021-02-09 08:21:06
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-02-09 11:00:54
 * @Description:
 */
import React from 'react';

import { ConnectRC, connect, Loading } from 'umi';

import { Row, Col } from 'antd';

import { MenuState } from './model';

import { Page } from 'components';
import Tree from './components/tree';

import { arrayToTree } from 'utils';
import { IRoute } from '@/common';

interface IProps {
  menu: MenuState;
  loading: Loading;
}

const Menu: ConnectRC<IProps> = ({ menu: { data, currentItem }, dispatch }) => {
  const treeProps = {
    data: arrayToTree(data, 'id', 'breadcrumbParentId'),
    onSelect: (selectedItem: IRoute) => {
      dispatch({
        type: 'menu/updateState',
        payload: {
          currentItem: selectedItem,
        },
      });
    },
  };
  return (
    <Page inner>
      <Row gutter={24}>
        <Col lg={12}>
          <Tree {...treeProps} />
        </Col>
        <Col lg={12}>{currentItem.zh as React.ReactNode}</Col>
      </Row>
    </Page>
  );
};

export default connect(
  ({ menu, loading }: { menu: MenuState; loading: Loading }) => ({
    menu,
    loading,
  }),
)(Menu);
