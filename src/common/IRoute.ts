/*
 * @Author: tkiddo
 * @Date: 2021-01-15 14:50:02
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-02-09 08:27:12
 * @Description:
 */
export default interface IRoute {
  _id: string;
  id: string;
  breadcrumbParentId: string;
  menuParentId: string;
  name: string;
  zh: string;
  icon: string;
  route: string;
  children?: IRoute[];
  [key: string]: any;
}
