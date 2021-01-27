/*
 * @Author: tkiddo
 * @Date: 2021-01-05 13:53:40
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-27 15:58:34
 * @Description:
 */
const isDevelopment = process.env.NODE_ENV === 'development';
export default {
  siteName: 'admin',
  copyright: 'Ant Design Admin  ©2021 tkiddo',
  logoPath: isDevelopment ? '/logo.svg' : '/admin/logo.svg',
  apiPrefix: '/admin/api',
  layouts: [
    {
      name: 'base',
      include: [/.*/],
      exclude: [/\/login/],
    },
  ],
};
