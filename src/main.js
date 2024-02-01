import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import './index.css'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import './fireBaseConfig';
import mitt from 'mitt';

const emitter = mitt();

const app = createApp(App).provide('emitter', emitter);
app.use(router).use(Vuetify);
app.component('VueDatePicker', VueDatePicker);



import SignUpModal from '@/components/modals/SignUpModal.vue';
app.component('SignUpModalVue', SignUpModal);

import LoginModal from '@/components/modals/LoginModal.vue';
app.component('LoginModal', LoginModal);

import MapModal from '@/components/modals/MapModal.vue';
app.component('MapModal', MapModal);

import NavbarComponent from '@/components/NavbarComponent.vue';
app.component('NavbarComponent', NavbarComponent);

//icons
import TrashIcon from '@/components/Icons/TrashIcon.vue';
app.component('TrashIcon', TrashIcon); 

import PlusIcon from '@/components/Icons/PlusIcon.vue';
app.component('PlusIcon', PlusIcon); 

import PinIcon from '@/components/Icons/PinIcon.vue';
app.component('PinIcon', PinIcon); 

import MinusIcon from '@/components/Icons/MinusIcon.vue';
app.component('MinusIcon', MinusIcon); 

import InfoIcon from '@/components/Icons/InfoIcon.vue';
app.component('InfoIcon', InfoIcon);

import GoogleIcon from '@/components/Icons/GoogleIcon.vue';
app.component('GoogleIcon', GoogleIcon); 

import CartIcon from '@/components/Icons/CartIcon.vue';
app.component('CartIcon', CartIcon); 

import UserIcon from '@/components/Icons/UserIcon.vue';
app.component('UserIcon', UserIcon);

import SearchIcon from '@/components/Icons/SearchIcon.vue';
app.component('SearchIcon', SearchIcon);

app.mount('#app');