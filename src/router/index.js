import Vue from 'vue'
import VueRouter from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/Home.vue';
import PanierView from '@/views/Panier.vue';
import FestivalView from '@/views/Festival.vue';
import CovoiturageView from '@/views/Covoiturage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/panier',
    name : 'Panier',
    component: PanierView,
  },
  {
    path: '/festival',
    name : 'Festival',
    component: FestivalView,
  },
  {
    path: '/covoiturage',
    name : 'Covoiturage',
    component: () => CovoiturageView,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router