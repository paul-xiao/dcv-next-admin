import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Icons from 'unplugin-icons/vite' // ele图标自动导入
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'// 自动导入配置的模块
import Components from 'unplugin-vue-components/vite'// 自动导入组件的模块
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'// 自动导入 Element Plus 的 Api
import ElementPlus from 'unplugin-element-plus/vite' // 自动导入 Element Plus 的 style
import WindiCSS from 'vite-plugin-windicss'

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "~/styles/element/index.scss" as *;`,
      },
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['vue'],
      resolvers: [
        ElementPlusResolver(),
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon',
        }),
    ],
      dts: 'types/auto-generate/auto-import.d.ts',
    }),
    Components({
      resolvers: [
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep'],
        }),
        ElementPlusResolver()
      ],
      dts: 'types/auto-generate/components.d.ts',
    }),
    Icons({
      autoInstall: true,
    }),
    ElementPlus({}),
    WindiCSS(),
  ],
})
