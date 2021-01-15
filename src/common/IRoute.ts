export default interface IRoute {
  id: string;
  breadcrumbParentId: string;
  menuParentId: string;
  name: string;
  zh: string;
  icon: string;
  route: string;
  children: IRoute[];
  [key: string]: any;
}
