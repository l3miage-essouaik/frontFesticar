<template>
    <div>
        <nav class="bg-white dark:bg-gray-900 ">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="../assets/logo.png" class="h-20" alt="Flowbite Logo" />
                </a>
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Festicar</span>
                <div class="flex items-center space-x-3">
                    <a href="#" class="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500">
                        <CartIcon />
                    </a>
                    <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar"
                        class="flex items-center justify-between py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">
                        <UserIcon />
                        <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 4 4 4-4" />
                        </svg>
                    </button>

                    <!-- Dropdown menu -->
                    <div id="dropdownNavbar"
                        class="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                        <ul class="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                            <li>
                                <a href="#"
                                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    v-on:click="() => showLogin = true">Connexion</a>
                            </li>
                            <li>
                                <a href="#"
                                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Insciption</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
        <div v-if="showLogin">
            <LoginModal :showLogin="showLogin" @close-modal="closeLoginModal()"/>
        </div>
    </div>
</template>
<script>
import { onMounted } from 'vue';
import { initFlowbite } from 'flowbite';
import CartIcon from './Icons/CartIcon.vue'
import UserIcon from './Icons/UserIcon.vue'
import LoginModal from '@/components/modals/LoginModal.vue';


// Exportez le composant
export default {
    onMounted() {
        initFlowbite();
    },
    data() {
        return {
            showLogin: false
        }
    },
    components: {
        LoginModal,
    },
    methods: {
        closeLoginModal() {
            this.showLogin = false;
        },
    }

};

</script>
<style lang="">
    
</style>