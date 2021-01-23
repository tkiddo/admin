/*
 * @Author: tkiddo
 * @Date: 2021-01-05 13:53:40
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-22 20:40:10
 * @Description:
 */
const isDevelopment = process.env.NODE_ENV === 'development';
export default {
  siteName: 'admin',
  copyright: 'Ant Design Admin  ©2021 tkiddo',
  logoPath: isDevelopment ? '/logo.svg' : '/admin/logo.svg',
  apiPrefix:
    'https://service-bg1ac25o-1256164626.gz.apigw.tencentcs.com/release',
  layouts: [
    {
      name: 'base',
      include: [/.*/],
      exclude: [/\/login/],
    },
  ],
};
