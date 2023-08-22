import './styles/theme/index.scss';
//windi
import 'virtual:windi-base.css';
import 'virtual:windi-components.css';
import 'virtual:windi-utilities.css';
// svg icon
import 'virtual:svg-icons-register'

import App from './App.vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

import { router, setupRouter } from './router';
import { setupStore } from './stores';
import { globalProvide } from './hooks/useGlobalConfig';
import { createApp } from 'vue';
import { setRouteGuards } from './router/guards';

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(globalProvide);
setupRouter(app);
// 包含异步操作，需要单独执行
setRouteGuards(router)
setupStore(app);
app.mount('#app');
