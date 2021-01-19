import React, { FC, useRef } from 'react';

import { Form, Input, InputNumber, Radio, Modal } from 'antd';

import { IUser } from '../model';

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
  item: IUser | Record<string, unknown>;
  visible: boolean;
  title: string;
  centered?: boolean;
  onCancel(): void;
  onOk(item: IUser): void;
}

const UserModal: FC<IProps> = ({ item, onOk, ...modalProps }) => {
  const formRef = useRef(null);
  const handleOk = () => {
    (formRef as any).current
      .validateFields()
      .then((values: IUser) => {
        onOk(values);
      })
      .catch((errorInfo: Error) => {
        console.log(errorInfo);
      });
  };
  return (
    <Modal {...modalProps} onOk={handleOk}>
      <Form
        ref={formRef}
        name="control-ref"
        initialValues={{
          ...item,
        }}
        layout="horizontal"
      >
        <FormItem
          name="name"
          rules={[{ required: true }]}
          label={`Name`}
          hasFeedback
          {...formItemLayout}
        >
          <Input />
        </FormItem>
        <FormItem
          name="nickName"
          rules={[{ required: true }]}
          label={`NickName`}
          hasFeedback
          {...formItemLayout}
        >
          <Input />
        </FormItem>
        <FormItem
          name="isMale"
          rules={[{ required: true }]}
          label={`Gender`}
          hasFeedback
          {...formItemLayout}
        >
          <Radio.Group>
            <Radio value>Male</Radio>
            <Radio value={false}>Female</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem name="age" label={`Age`} hasFeedback {...formItemLayout}>
          <InputNumber min={18} max={100} />
        </FormItem>
        <FormItem
          name="phone"
          rules={[
            {
              required: true,
              pattern: /^1[34578]\d{9}$/,
              message: `The input is not valid phone!`,
            },
          ]}
          label={`Phone`}
          hasFeedback
          {...formItemLayout}
        >
          <Input />
        </FormItem>
        <FormItem
          name="email"
          rules={[
            {
              required: true,
              pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
              message: `The input is not valid E-mail!`,
            },
          ]}
          label={`Email`}
          hasFeedback
          {...formItemLayout}
        >
          <Input />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default UserModal;
