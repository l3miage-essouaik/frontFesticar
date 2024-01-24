import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import './index.css'

const app = createApp(App);
app.use(router).use(Vuetify);

import SignUpModal from '@/components/modals/SignUpModal.vue';
app.component('SignUpModalVue', SignUpModal);

import LoginModal from '@/components/modals/LoginModal.vue';
app.component('LoginModal', LoginModal);

import NavbarComponent from '@/components/NavbarComponent.vue';
app.component('NavbarComponent', NavbarComponent);

//icons
import FacebookIcon from '@/components/Icons/FacebookIcon.vue';
app.component('FacebookIcon', FacebookIcon); 

import CartIcon from '@/components/Icons/CartIcon.vue';
app.component('CartIcon', CartIcon); 

import UserIcon from '@/components/Icons/UserIcon.vue';
app.component('UserIcon', UserIcon);

import SearchIcon from '@/components/Icons/SearchIcon.vue';
app.component('SearchIcon', SearchIcon);

app.mount('#app');
