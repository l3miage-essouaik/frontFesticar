import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
const app = createApp(App);

import SignUpModal from '@/components/modals/SignUpModal.vue';
app.component('SignUpModalVue', SignUpModal);
