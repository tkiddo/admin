/*
 * @Author: tkiddo
 * @Date: 2020-12-30 13:09:01
 * @LastEditors: tkiddo
 * @LastEditTime: 2020-12-30 13:10:20
 * @Description:
 */

import { getUserName } from './index';

test('getUserName', () => {
  expect(getUserName('hello world')).toEqual('hello world');
});
