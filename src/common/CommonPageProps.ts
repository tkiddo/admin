/*
 * @Author: tkiddo
 * @Date: 2021-01-06 11:29:04
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-06 11:30:24
 * @Description:
 */

import { ConnectProps, Dispatch } from 'umi';

export default interface PageProps extends ConnectProps {
  loading: boolean;
  dispatch: Dispatch;
}
