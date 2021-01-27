/*
 * @Author: tkiddo
 * @Date: 2021-01-06 09:55:29
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-27 15:37:28
 * @Description:
 */
interface API {
  [key: string]: string;
}

const api: API = {
  loginUser: 'POST /user/login',
  logoutUser: 'GET /user/logout',
  queryUserInfo: '/user',

  queryRouteList: '/routes',

  queryUserList: '/users',
  queryUser: '/users/:id',
  updateUser: 'POST /users/:id',
  createUser: 'POST /users',
  removeUser: 'DELETE /users/:id',
  removeUserList: 'POST /users/delete',

  queryDashboard: '/dashboard',
};

export default api;
