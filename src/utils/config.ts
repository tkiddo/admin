/*
 * @Author: tkiddo
 * @Date: 2021-01-05 13:53:40
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-27 10:30:34
 * @Description:
 */
const isDevelopment = process.env.NODE_ENV === 'development';
export default {
  siteName: 'admin',
  copyright: 'Ant Design Admin  ©2021 tkiddo',
  logoPath: isDevelopment ? '/logo.svg' : '/admin-api/logo.svg',
  apiPrefix: '/api',
  layouts: [
    {
      name: 'base',
      include: [/.*/],
      exclude: [/\/login/],
    },
  ],
};
