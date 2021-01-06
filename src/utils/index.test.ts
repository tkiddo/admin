/*
 * @Author: tkiddo
 * @Date: 2020-12-30 13:09:01
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-05 14:03:48
 * @Description:
 */

import { getUserName, queryLayout } from './index';

test('getUserName', () => {
  expect(getUserName('hello world')).toEqual('hello world');
});

test('queryLayout', () => {
  expect(queryLayout('/login')).toEqual('public');
});
