/*
 * @Author: tkiddo
 * @Date: 2021-02-03 09:35:15
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-02-03 10:41:09
 * @Description:
 */
import React, { FC, useRef } from 'react';
import { Form, Modal, Input, TreeSelect } from 'antd';
import store from 'store';

import { IRole } from '../model';

import { arrayToTree } from 'utils';
import { IRoute } from '@/common';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

interface IProps {
  item: IRole | Record<string, unknown>;
  visible: boolean;
  title: string;
  centered?: boolean;
  onCancel(): void;
  onOk(item: IRole): void;
  width?: string | number;
}

const genTreeData = (tree: IRoute[]) => {
  return tree.map((node) => {
    return {
      title: node.zh,
      value: node.id,
      children: node.children ? genTreeData(node.children) : [],
    };
  });
};

const RoleModal: FC<IProps> = ({ item = {}, onOk, ...modalProps }) => {
  const formRef = useRef(null);
  const routeList = store.get('routeList');

  const handleOk = () => {
    (formRef as any).current
      .validateFields()
      .then((values: IRole) => {
        onOk(values);
      })
      .catch((errorInfo: Error) => {
        console.log(errorInfo);
      });
  };

  const onTreeSelectChange = (value: string[]) => {
    console.log(value);
  };

  const tree = arrayToTree(routeList);

  const treeSelectProps = {
    treeCheckable: true,
    showCheckedStrategy: TreeSelect.SHOW_ALL,
    treeData: genTreeData(tree),
    onChange: onTreeSelectChange,
  };
  return (
    <Modal {...modalProps} onOk={handleOk}>
      <Form initialValues={item} ref={formRef}>
        <FormItem
          name="name"
          label="角色名称"
          hasFeedback
          {...formItemLayout}
          rules={[{ required: true }]}
        >
          <Input />
        </FormItem>
        <FormItem
          name="permission"
          label="角色权限"
          hasFeedback
          {...formItemLayout}
          rules={[{ required: true }]}
        >
          <TreeSelect {...treeSelectProps} />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default RoleModal;
