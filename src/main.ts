import './styles/theme/index.scss';
//windi
import 'virtual:windi-base.css';
import 'virtual:windi-components.css';
import 'virtual:windi-utilities.css';

import { createApp } from 'vue';
import { setupStore } from './stores';

import App from './App.vue';
import router from './router';
import { globalProvide } from './hooks/useGlobalConfig';

const app = createApp(App);

app.use(globalProvide);
app.use(router);

setupStore(app)


app.mount('#app');
