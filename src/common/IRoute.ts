/*
 * @Author: tkiddo
 * @Date: 2021-01-15 14:50:02
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-02-02 15:36:30
 * @Description:
 */
export default interface IRoute {
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
