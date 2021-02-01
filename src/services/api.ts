/*
 * @Author: tkiddo
 * @Date: 2021-01-06 09:55:29
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-02-01 15:41:43
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
  queryUser: '/users/:_id',
  updateUser: 'POST /users/:_id',
  createUser: 'POST /users',
  removeUser: 'DELETE /users/:_id',
  removeUserList: 'POST /users/delete',

  queryDashboard: '/dashboard',

  queryRoles: '/roles',
};

export default api;
