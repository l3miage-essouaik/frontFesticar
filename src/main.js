import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import './index.css'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJMnEdbsomQQpysguTkLQg8vbxLmBNFYc",
  authDomain: "festicar-cf2b2.firebaseapp.com",
  projectId: "festicar-cf2b2",
  storageBucket: "festicar-cf2b2.appspot.com",
  messagingSenderId: "330643569363",
  appId: "1:330643569363:web:0fc0a0de596acdf22ff226"
};

initializeApp(firebaseConfig);

const app = createApp(App);
app.use(router).use(Vuetify);
app.component('VueDatePicker', VueDatePicker);



import SignUpModal from '@/components/modals/SignUpModal.vue';
app.component('SignUpModalVue', SignUpModal);

import LoginModal from '@/components/modals/LoginModal.vue';
app.component('LoginModal', LoginModal);

import NavbarComponent from '@/components/NavbarComponent.vue';
app.component('NavbarComponent', NavbarComponent);

//icons
import TrashIcon from '@/components/Icons/TrashIcon.vue';
app.component('TrashIcon', TrashIcon); 

import FacebookIcon from '@/components/Icons/FacebookIcon.vue';
app.component('FacebookIcon', FacebookIcon); 

import CartIcon from '@/components/Icons/CartIcon.vue';
app.component('CartIcon', CartIcon); 

import UserIcon from '@/components/Icons/UserIcon.vue';
app.component('UserIcon', UserIcon);

import SearchIcon from '@/components/Icons/SearchIcon.vue';
app.component('SearchIcon', SearchIcon);

app.mount('#app');
