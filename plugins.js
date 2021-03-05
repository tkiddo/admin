/*
 * @Author: tkiddo
 * @Date: 2021-03-05 12:26:51
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-03-05 12:27:45
 * @Description:
 */
const plugin = (api) => {
  api.addHTMLScripts(() => {
    return [{ src: '/assets/js/performance.js' }];
  });
};

export default plugin;
