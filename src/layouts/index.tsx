import React, { FC } from 'react';
import { ConfigProvider } from 'antd';

import zh_CN from 'antd/lib/locale/zh_CN';
import { withRouter, IRouteComponentProps } from 'umi';

import BaseLayout from './BaseLayout';
import PublicLayout from './PublicLayout';

import { queryLayout } from 'utils';

const layoutMap: { [key: string]: FC } = {
  base: BaseLayout,
  public: PublicLayout,
};

export default withRouter(({ location, children }: IRouteComponentProps) => {
  const Container = layoutMap[queryLayout(location.pathname)];
  return (
    <ConfigProvider locale={zh_CN}>
      <Container>{children}</Container>
    </ConfigProvider>
  );
});
