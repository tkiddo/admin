/*
 * @Author: tkiddo
 * @Date: 2021-01-19 10:01:09
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-02-01 15:19:52
 * @Description:
 */
import React, { FC, useRef } from 'react';
import { Button, Row, Col, DatePicker, Form, Input } from 'antd';
import moment from 'moment';

const { Search } = Input;
const { RangePicker } = DatePicker;

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
};

const TwoColProps = {
  ...ColProps,
  xl: 96,
};

interface Fileds {
  [key: string]: string;
}

interface IProps {
  filter: Fileds;
  onAdd(): void;
  onFilterChange(value: Fileds): void;
}

const Filter: FC<IProps> = ({ onFilterChange, onAdd, filter, children }) => {
  const formRef = useRef(null);
  const { name } = filter;
  const handleFields = (fields: Fileds) => {
    const { createTime } = fields;
    if (createTime && createTime.length) {
      fields.createTime = [
        moment(createTime[0]).format('YYYY-MM-DD'),
        moment(createTime[1]).format('YYYY-MM-DD'),
      ];
    }
    return fields;
  };

  const handleSubmit = () => {
    const values = formRef.current.getFieldsValue();
    const fields = handleFields(values);
    onFilterChange(fields);
  };

  const handleReset = () => {
    const fields = formRef.current.getFieldsValue();
    for (const item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = [];
        } else {
          fields[item] = undefined;
        }
      }
    }
    formRef.current.setFieldsValue(fields);
    handleSubmit();
  };

  const initialCreateTime = [];
  if (filter.createTime && filter.createTime[0]) {
    initialCreateTime[0] = moment(filter.createTime[0]);
  }
  if (filter.createTime && filter.createTime[1]) {
    initialCreateTime[1] = moment(filter.createTime[1]);
  }
  return (
    <Form ref={formRef} initialValues={{ name, createTime: initialCreateTime }}>
      <Row gutter={24}>
        <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
          <Form.Item name="username">
            <Search placeholder={`用户名 搜索`} onSearch={handleSubmit} />
          </Form.Item>
        </Col>
        <Col
          {...ColProps}
          xl={{ span: 10 }}
          md={{ span: 12 }}
          sm={{ span: 16 }}
          id="createTimeRangePicker"
        >
          <Form.Item name="createTime">
            <RangePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col
          {...TwoColProps}
          xl={{ span: 10 }}
          md={{ span: 24 }}
          sm={{ span: 24 }}
        >
          <Row type="flex" align="middle" justify="space-between">
            <div>
              <Button
                type="primary"
                htmlType="submit"
                className="margin-right"
                onClick={handleSubmit}
              >
                查找
              </Button>
              <Button onClick={handleReset}>重置</Button>
            </div>
            <Button type="ghost" onClick={onAdd}>
              创建
            </Button>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default Filter;
