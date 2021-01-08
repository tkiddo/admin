/*
 * @Author: tkiddo
 * @Date: 2020-12-30 13:08:25
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-08 11:13:58
 * @Description:
 */
import { cloneDeep } from 'lodash';
import { IMenuItem } from '@/components/layout/Menu';

export const getUserName = (name: string): string => name;

export const queryLayout = (pathname: string): string => {
  let result = 'base';
  if (pathname.indexOf('login') !== -1) {
    result = 'public';
  }
  return result;
};

export const arrayToTree = (
  array: IMenuItem[],
  id = 'id',
  parentId = 'pid',
  children = 'children',
): IMenuItem[] => {
  const result: IMenuItem[] = [];
  const hash: { [key: string]: any } = {};
  const data: IMenuItem[] = cloneDeep(array);

  data.forEach((item, index) => {
    hash[data[index][id]] = data[index];
  });

  data.forEach((item) => {
    const hashParent = hash[item[parentId]];
    if (hashParent) {
      !hashParent[children] && (hashParent[children] = []);
      hashParent[children].push(item);
    } else {
      result.push(item);
    }
  });
  return result;
};
