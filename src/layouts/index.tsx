import React from 'react';
import { ConfigProvider } from 'antd';

import zh_CN from 'antd/lib/locale/zh_CN';
import { withRouter, IRouteComponentProps } from 'umi';

export default withRouter(({ location, children }: IRouteComponentProps) => {
  console.log(location);
  return <ConfigProvider locale={zh_CN}>{children}</ConfigProvider>;
});
