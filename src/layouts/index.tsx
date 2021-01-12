import React, { FC } from 'react';
import { ConfigProvider } from 'antd';

import zh_CN from 'antd/lib/locale/zh_CN';
import { withRouter, IRouteComponentProps, useSelector } from 'umi';

import BaseLayout from './BaseLayout';
import PublicLayout from './PublicLayout';
import { Loader } from 'components';

import { queryLayout } from 'utils';

const layoutMap: { [key: string]: FC } = {
  base: BaseLayout,
  public: PublicLayout,
};

export default withRouter(({ location, children }: IRouteComponentProps) => {
  const Container = layoutMap[queryLayout(location.pathname)];
  const loading = useSelector((state: any) => state.loading);
  return (
    <ConfigProvider locale={zh_CN}>
      <Loader fullScreen spinning={loading.effects['app/query']} />
      <Container>{children}</Container>
    </ConfigProvider>
  );
});
