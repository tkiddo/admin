/*
 * @Author: tkiddo
 * @Date: 2021-01-06 09:55:29
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-06 13:56:01
 * @Description:
 */
interface API {
  [key: string]: string;
}

const api: API = { loginUser: 'POST /user/login' };

export default api;
