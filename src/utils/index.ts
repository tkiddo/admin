/*
 * @Author: tkiddo
 * @Date: 2020-12-30 13:08:25
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-11 10:57:45
 * @Description:
 */
import { cloneDeep } from 'lodash';
import store from 'store';
import { IRoute } from 'common';

export const getUserName = (name: string): string => name;

export const queryLayout = (pathname: string): string => {
  let result = 'base';
  if (pathname.indexOf('login') !== -1) {
    result = 'public';
  }
  return result;
};

export const arrayToTree = (
  array: IRoute[],
  id = 'id',
  parentId = 'pid',
  children = 'children',
): IRoute[] => {
  const result: IRoute[] = [];
  const hash: { [key: string]: any } = {};
  const data: IRoute[] = cloneDeep(array);

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

export const defaultLocale = 'zh';
export const getLocale = () => store.get('locale') || defaultLocale;
export const setLocale = (language: string) => {
  if (getLocale() !== language) {
    store.set('locale', language);
    window.location.reload();
  }
};

export const queryAncestors = (
  array: IRoute[],
  current: IRoute,
  parentId: string,
  id = 'id',
): IRoute[] => {
  const result = [current];
  const hashMap = new Map();
  array.forEach((item) => hashMap.set(item[id], item));

  const getPath = (current: IRoute) => {
    const currentParentId = hashMap.get(current[id])[parentId];
    if (currentParentId) {
      result.push(hashMap.get(currentParentId));
      getPath(hashMap.get(currentParentId));
    }
  };

  getPath(current);
  return result;
};
