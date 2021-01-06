/*
 * @Author: tkiddo
 * @Date: 2021-01-05 13:53:40
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-05 14:17:36
 * @Description:
 */

export default {
  siteName: 'admin',
  copyright: 'Ant Design Admin  ©2021 tkiddo',
  logoPath: '/logo.svg',
  layouts: [
    {
      name: 'base',
      include: [/.*/],
      exclude: [/\/login/],
    },
  ],
};
