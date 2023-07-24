import './styles/theme/index.scss';
//windi
import 'virtual:windi-base.css';
import 'virtual:windi-components.css';
import 'virtual:windi-utilities.css';

import * as ElementPlusIconsVue from '@element-plus/icons-vue';

import { createApp } from 'vue';
import { setupStore } from './stores';

import App from './App.vue';
import router from './router';
import { globalProvide } from './hooks/useGlobalConfig';

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(globalProvide);
app.use(router);

setupStore(app);

app.mount('#app');
