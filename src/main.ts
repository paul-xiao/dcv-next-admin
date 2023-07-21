import './styles/theme/index.scss';
//windi
import 'virtual:windi-base.css';
import 'virtual:windi-components.css';
import 'virtual:windi-utilities.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import { globalProvide } from './hooks/useGlobalConfig';

const app = createApp(App);

app.use(globalProvide);
app.use(createPinia());
app.use(router);

app.mount('#app');
