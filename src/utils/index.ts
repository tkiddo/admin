/*
 * @Author: tkiddo
 * @Date: 2020-12-30 13:08:25
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-05 14:02:34
 * @Description:
 */

export const getUserName = (name: string): string => name;

export const queryLayout = (pathname: string): string => {
  let result = 'base';
  if (pathname.indexOf('login') !== -1) {
    result = 'public';
  }
  return result;
};
