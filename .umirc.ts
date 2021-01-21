/*
 * @Author: tkiddo
 * @Date: 2021-01-04 09:00:32
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-21 09:45:24
 * @Description:
 */
import { defineConfig } from 'umi';
import { resolve } from 'path';
const isDevelopment = process.env.NODE_ENV === 'development';

export default defineConfig({
  publicPath: isDevelopment ? '/' : 'https://tkiddo.github.io/admin',
  base: isDevelopment ? '/' : '/admin/',
  history: {
    type: 'hash',
  },
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
  targets: {
    chrome: 79,
  },
  hash: true,
  devtool: 'eval',
  dva: { immer: true },
  alias: {
    api: resolve(__dirname, './src/services/'),
    components: resolve(__dirname, './src/components'),
    common: resolve(__dirname, './src/common'),
    config: resolve(__dirname, './src/utils/config'),
    themes: resolve(__dirname, './src/themes'),
    utils: resolve(__dirname, './src/utils'),
  },
  dynamicImport: {
    loading: 'components/Loader/index',
  },
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'lodash',
        libraryDirectory: '',
        camel2DashComponentName: false,
      },
      'lodash',
    ],
    [
      'import',
      {
        libraryName: '@ant-design/icons',
        libraryDirectory: 'es/icons',
        camel2DashComponentName: false,
      },
      'ant-design-icons',
    ],
  ],
  chainWebpack: function (config, { webpack }) {
    config.merge({
      optimization: {
        minimize: true,
        splitChunks: {
          chunks: 'all',
          minSize: 30000,
          minChunks: 3,
          automaticNameDelimiter: '.',
          cacheGroups: {
            react: {
              name: 'react',
              priority: 20,
              test: /[\\/]node_modules[\\/](react|react-dom|react-dom-router)[\\/]/,
            },
            antd: {
              name: 'antd',
              priority: 20,
              test: /[\\/]node_modules[\\/](antd|@ant-design\/icons)[\\/]/,
            },
            async: {
              chunks: 'async',
              minChunks: 2,
              name: 'async',
              maxInitialRequests: 1,
              minSize: 0,
              priority: 5,
              reuseExistingChunk: true,
            },
          },
        },
      },
    });
  },
});
