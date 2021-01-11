import React, { FC, Fragment, memo } from 'react';
import { Breadcrumb } from 'antd';
import { pathToRegexp } from 'path-to-regexp';
import { Link, useLocation } from 'umi';
import iconMap from '@/utils/iconMap';
import { queryAncestors } from 'utils';
import { IRoute } from 'common';

import styles from './Bread.less';

interface IProps {
  routeList: IRoute[];
}
type pathItem = IRoute & { id: number; name: string };

const generateBreadcrumbs = (paths: pathItem[]) => {
  return paths.map((item, key) => {
    const content = item && (
      <Fragment>
        {item.icon && (
          <span style={{ marginRight: 4 }}>{iconMap[item.icon]}</span>
        )}
        {item.name}
      </Fragment>
    );

    return (
      item && (
        <Breadcrumb.Item key={key}>
          {paths.length - 1 !== key ? (
            <Link to={item.route || '#'}>{content}</Link>
          ) : (
            content
          )}
        </Breadcrumb.Item>
      )
    );
  });
};

const Bread: FC<IProps> = (props) => {
  const location = useLocation();
  const { routeList } = props;
  // Find a route that matches the pathname.
  const currentRoute = routeList.find(
    (_) => _.route && pathToRegexp(_.route).exec(location.pathname),
  );

  // Find the breadcrumb navigation of the current route match and all its ancestors.

  const paths: pathItem[] = currentRoute
    ? queryAncestors(routeList, currentRoute, 'breadcrumbParentId').reverse()
    : [
        routeList[0],
        {
          id: 404,
          name: 'Not Found',
        },
      ];

  console.log(paths);
  return (
    <Breadcrumb className={styles.bread}>
      {generateBreadcrumbs(paths)}
    </Breadcrumb>
  );
};

export default memo(Bread);
