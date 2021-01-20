/*
 * @Author: tkiddo
 * @Date: 2021-01-05 13:53:40
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-20 15:39:50
 * @Description:
 */
const isDevelopment = process.env.NODE_ENV === 'development';
export default {
  siteName: 'admin',
  copyright: 'Ant Design Admin  ©2021 tkiddo',
  logoPath: '/logo.svg',
  apiPrefix: isDevelopment
    ? 'http://localhost:3000'
    : 'https://service-bg1ac25o-1256164626.gz.apigw.tencentcs.com/release/',
  layouts: [
    {
      name: 'base',
      include: [/.*/],
      exclude: [/\/login/],
    },
  ],
};
