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
  apiPrefix:
    'https://tkiddo-8gkkh0chf3632274-1256164626.ap-shanghai.app.tcloudbase.com/admin/api',
  layouts: [
    {
      name: 'base',
      include: [/.*/],
      exclude: [/\/login/],
    },
  ],
};
