/*
 * @Author: tkiddo
 * @Date: 2021-01-04 09:00:32
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-29 18:40:07
 * @Description:
 */
import { defineConfig } from 'umi';
import { resolve } from 'path';
const isDevelopment = process.env.NODE_ENV === 'development';

export default defineConfig({
  // 配置标题
  title: 'antd admin',
  // 配置 favicon 地址（href 属性）
  favicon: '/favicon.ico',
  // 部署时静态资源查找的路径
  publicPath: isDevelopment
    ? '/'
    : 'https://express-9gf51cps1d7be8f0-1256164626.ap-guangzhou.app.tcloudbase.com/admin/',
  // html中管理publicPath
  runtimePublicPath: true,
  // 路由模式为hash路由
  history: {
    type: 'hash',
  },
  // 跳过node_modules下文件的编译，提升编译速度
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
  // 选择合适的浏览器版本，较少补丁尺寸
  targets: {
    chrome: 79,
  },
  // 配置生成的文件包含 hash 后缀，通常用于增量发布和避免浏览器加载缓存。
  hash: true,
  // 使用最低成本的 sourcemap 生成方式，默认是 cheap-module-source-map
  devtool: 'eval',
  // dva支持immer
  dva: { immer: true },
  // 配置别名，对引用路径进行映射。
  alias: {
    api: resolve(__dirname, './src/services/'),
    components: resolve(__dirname, './src/components'),
    common: resolve(__dirname, './src/common'),
    config: resolve(__dirname, './src/utils/config'),
    themes: resolve(__dirname, './src/themes'),
    utils: resolve(__dirname, './src/utils'),
  },
  // 启用按需加载，即把构建产物进行拆分，在需要的时候下载额外的 JS 再执行。
  dynamicImport: {
    loading: 'components/Loader/index',
  },
  // 忽略 moment 的 locale 文件，用于减少尺寸。
  ignoreMomentLocale: true,
  // 快速刷新（Fast Refresh），开发时可以保持组件状态，同时编辑提供即时反馈。
  fastRefresh: {},
  proxy: {
    '/admin/api': {
      target:
        'https://express-9gf51cps1d7be8f0-1256164626.ap-guangzhou.app.tcloudbase.com/admin/api',
      changeOrigin: true,
      pathRewrite: { '^/admin/api': '' },
    },
    '/upload': {
      target:
        'https://express-9gf51cps1d7be8f0-1256164626.ap-guangzhou.app.tcloudbase.com/admin/api/upload',
      changeOrigin: true,
      pathRewrite: { '^/upload': '' },
    },
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
            recharts: {
              name: 'recharts',
              priority: 20,
              test: /[\\/]node_modules[\\/]recharts[\\/]/,
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
