import { fileURLToPath, URL } from 'node:url';
import type { ConfigEnv } from 'vite';
import { defineConfig, loadEnv } from 'vite';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Icons from 'unplugin-icons/vite'; // ele图标自动导入
import IconsResolver from 'unplugin-icons/resolver';
import AutoImport from 'unplugin-auto-import/vite'; // 自动导入配置的模块
import Components from 'unplugin-vue-components/vite'; // 自动导入组件的模块
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'; // 自动导入 Element Plus 的 Api
import ElementPlus from 'unplugin-element-plus/vite'; // 自动导入 Element Plus 的 style
import WindiCSS from 'vite-plugin-windicss';
import { viteMockServe } from 'vite-plugin-mock';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';

export default defineConfig(({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd());
  return {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '/#/': fileURLToPath(new URL('./src/styles', import.meta.url)),
      },
    },
    server: {
      proxy: {
        // 使用 proxy 实例
        '/api': {
          target: env.VITE_APP_API_BASE_URL,
          changeOrigin: true,
          secure: false,
          logLevel: 'info',
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/element/index.scss" as *;`,
        },
      },
    },
    plugins: [
      vue({
        // 默认开启响应性语法糖
        reactivityTransform: true,
        template: {
          compilerOptions: {
            isCustomElement: tag => tag.includes('px-'),
          },
        },
      }),
      vueJsx(),
      AutoImport({
        // 自动导入 Vue,VueRouter 相关函数，如：ref, reactive, toRef 等
        imports: ['vue', 'vue-router'],
        resolvers: [
          ElementPlusResolver(),
          // 自动导入图标组件
          IconsResolver({
            prefix: 'Icon',
          }),
        ],
        dts: 'types/auto-generate/auto-import.d.ts',
        // 解决自动引入eslint报错问题 需要在eslintrc的extend选项中引入
        eslintrc: {
          enabled: true,
          // 配置文件的位置
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true,
        },
      }),
      Components({
        directoryAsNamespace: true,
        resolvers: [
          ElementPlusResolver(),
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ['ep'],
          }),
        ],
        dts: 'types/auto-generate/components.d.ts',
      }),
      Icons({
        autoInstall: true,
      }),
      ElementPlus({}),
      WindiCSS(),
      // 配置mock
      viteMockServe({
        mockPath: '/mock',
        localEnabled: true,
      }),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
  };
});
