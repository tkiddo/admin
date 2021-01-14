/*
 * @Author: tkiddo
 * @Date: 2021-01-04 09:00:32
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-14 09:27:18
 * @Description:
 */
declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}

declare module 'dva-model-extend';
