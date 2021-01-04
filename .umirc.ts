/*
 * @Author: tkiddo
 * @Date: 2021-01-04 09:00:32
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-04 10:30:06
 * @Description:
 */
import { defineConfig } from 'umi';
import { resolve } from 'path';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  alias: {
    api: resolve(__dirname, './src/services/'),
    components: resolve(__dirname, './src/components'),
    config: resolve(__dirname, './src/utils/config'),
    themes: resolve(__dirname, './src/themes'),
    utils: resolve(__dirname, './src/utils'),
  },
});
