import React from 'react';
import { ConfigProvider } from 'antd';

import zh_CN from 'antd/lib/locale/zh_CN';
import { withRouter, IRouteComponentProps } from 'umi';

import BaseLayout from './BaseLayout';

export default withRouter(({ location, children }: IRouteComponentProps) => {
  console.log(location);
  return (
    <ConfigProvider locale={zh_CN}>
      <BaseLayout>{children}</BaseLayout>
    </ConfigProvider>
  );
});
