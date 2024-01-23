import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';


import SignUpModal from '@/components/modals/SignUpModal.vue';
app.component('SignUpModalVue', SignUpModal);
const app = createApp(App);
app.use(router).use(Vuetify);

import LoginModal from '@/components/modals/LoginModal.vue';
app.component('LoginModal', LoginModal);
import FacebookIcon from '@/components/Icons/FacebookIcon.vue';
app.component('FacebookIcon', FacebookIcon); 

app.mount('#app');
