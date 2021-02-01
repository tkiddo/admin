import React, { FC, useRef } from 'react';

import { Form, Input, InputNumber, Radio, Modal, message, Select } from 'antd';

import { IUser } from '../model';

import { Uploader } from 'components';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const uploadUrl = `/admin/api/upload`;

function beforeUpload(file: File) {
  const isLt200K = (file.size / 1024 / 1024 / 1024) * 100 < 200;
  if (!isLt200K) {
    message.error('图片必须小于 200KB!');
  }
  return isLt200K;
}

interface IProps {
  item: IUser | Record<string, unknown>;
  visible: boolean;
  title: string;
  centered?: boolean;
  rolesOptions: string[];
  onCancel(): void;
  onOk(item: IUser): void;
}

const UserModal: FC<IProps> = ({
  item = {},
  onOk,
  rolesOptions,
  ...modalProps
}) => {
  const formRef = useRef(null);
  const handleUpload = (imageUrl: string) => {
    formRef.current.setFieldsValue({ avatar: imageUrl });
  };

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

  const uploadProps = {
    onOk: handleUpload,
    initialImage: item.avatar ? (item.avatar as string) : '',
    action: uploadUrl,
    beforeUpload,
    accept: 'image/jpg,image/jpeg,image/png',
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
          label={`头像`}
          hasFeedback
          {...formItemLayout}
          rules={[{ required: true }]}
        >
          <Uploader {...uploadProps}></Uploader>
        </FormItem>
        <FormItem hidden name="avatar">
          <Input />
        </FormItem>
        <FormItem
          name="username"
          rules={[{ required: true }]}
          label={`用户名`}
          hasFeedback
          {...formItemLayout}
        >
          <Input />
        </FormItem>
        <FormItem
          name="password"
          rules={[{ required: true }]}
          label={`密码`}
          hasFeedback
          {...formItemLayout}
        >
          <Input />
        </FormItem>
        <FormItem
          name="nickName"
          rules={[{ required: true }]}
          label={`昵称`}
          hasFeedback
          {...formItemLayout}
        >
          <Input />
        </FormItem>
        <FormItem
          name="isMale"
          rules={[{ required: true }]}
          label={`性别`}
          hasFeedback
          {...formItemLayout}
        >
          <Radio.Group>
            <Radio value>男</Radio>
            <Radio value={false}>女</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem name="age" label={`年龄`} hasFeedback {...formItemLayout}>
          <InputNumber min={18} max={100} />
        </FormItem>
        <FormItem
          name="phone"
          rules={[
            {
              required: true,
              pattern: /^1[34578]\d{9}$/,
              message: `请输入正确电话号码!`,
            },
          ]}
          label={`电话`}
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
              message: `请输入正确邮箱!`,
            },
          ]}
          label={`邮箱`}
          hasFeedback
          {...formItemLayout}
        >
          <Input />
        </FormItem>
        <FormItem name="role" label={`角色`} {...formItemLayout}>
          <Select
            options={rolesOptions.map((item) => ({ label: item, value: item }))}
          ></Select>
        </FormItem>
      </Form>
    </Modal>
  );
};

export default UserModal;
