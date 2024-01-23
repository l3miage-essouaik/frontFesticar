import Vue from 'vue'
import VueRouter from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/Home.vue';
import PanierView from '@/views/Panier.vue';

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
];

const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router