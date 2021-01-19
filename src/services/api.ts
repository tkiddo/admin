/*
 * @Author: tkiddo
 * @Date: 2021-01-06 09:55:29
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-19 13:35:29
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

  queryUserList: '/user/users',
  queryUser: '/user/:id',
  updateUser: 'Patch /user/:id',
  createUser: 'POST /user',
  removeUser: 'DELETE /user/:id',
  removeUserList: 'POST /user/delete',
};

export default api;
