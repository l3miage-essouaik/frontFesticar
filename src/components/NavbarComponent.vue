<template>
    <div>
        <nav class="bg-white dark:bg-gray-900">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <router-link to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="../assets/logo.png" class="h-20" alt="Flowbite Logo" />
                </router-link>
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Festicar</span>
                <div class="flex items-center space-x-3">
                    <router-link to="/panier"
                        class="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500">
                        <CartIcon />
                    </router-link>
                    <div v-if="!isSignedIn">
                        <!-- Normal dropdown for non-authenticated users -->
                        <!-- Dropdown button for normal dropdown -->
                        <button id="dropdownNavbarLink"  v-on:click="showSignIn = !showSignIn"
                            class="flex items-center justify-between py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">
                            <UserIcon />
                            <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="m1 1 4 4 4-4" />
                            </svg>
                        </button>
                        <!-- Normal dropdown menu -->
                        <div id="dropdownNavbar" v-if="showSignIn"
                            class="z-10 absolute font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                            <ul class="py-2 text-sm text-gray-700 dark:text-gray-400">
                                <li>
                                    <a href="#"
                                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        v-on:click="openLoginModal()">Connexion</a>
                                </li>
                                <li>
                                    <a href="#"
                                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        v-on:click="openSignUpModal()">Inscription</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div v-else>
                        <!-- User dropdown for authenticated users -->
                        <!-- Dropdown button for user dropdown -->
                        <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" v-on:click="showSignOut = !showSignOut"
                            class="flex items-center justify-between py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">
                            <!-- Display user profile picture if available -->
                            <img v-if="currentUser.photoURL" :src="currentUser.photoURL" class="w-8 h-8 rounded-full"
                                alt="User Avatar" />
                            <!-- Display default user icon if no profile picture -->
                            <UserIcon v-else />
                            <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="m1 1 4 4 4-4" />
                            </svg>
                        </button>
                        <!-- User dropdown menu -->
                        <div id="dropdownNavbar" v-if="showSignOut"
                            class="z-10 absolute font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                            <ul class="py-2 text-sm text-gray-700 dark:text-gray-400">
                                <li>
                                    <a href="#"
                                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        v-on:click="signOut">
                                        Sign Out
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <div v-if="showLogin" class="backdrop">
            <LoginModal class="centerModal" :showLogin="showLogin" @close-LoginModal="closeLoginModal()"
                @show-SignUpModal="openSignUpModal()" />
        </div>
        <div v-if="showSignUp" class="backdrop">
            <SignUpModal class="centerModal" :showSignUp="showSignUp" @close-SignUpModal="closeSignupModal()"
                @show-LoginModal="openLoginModal()" />
        </div>
    </div>
</template>

<script>
import { onMounted } from 'vue';
import { initFlowbite } from 'flowbite';
import CartIcon from './Icons/CartIcon.vue'
import UserIcon from './Icons/UserIcon.vue'
import LoginModal from '@/components/modals/LoginModal.vue';
import SignUpModal from './modals/SignUpModal.vue';
import { authService } from '../services/authService';

// Exportez le composant
export default {
    data() {
        return {
            showLogin: false,
            showSignUp: false,
            isSignedIn: false,
            currentUser: null,
            showSignOut: false,
            showSignIn: false,
        }
    },
    components: {
        LoginModal,
        SignUpModal
    },
    methods: {
        closeLoginModal() {
            this.showLogin = false;
        },
        closeSignupModal() {
            this.showSignUp = false;
        },
        openLoginModal() {
            this.showLogin = true;
            this.showSignUp = false;
            this.showSignOut = false; // Close sign-out popup if open
        },
        openSignUpModal() {
            this.showSignUp = true;
            this.showLogin = false;
            this.showSignOut = false; // Close sign-out popup if open
        },
        signOut() {
            authService.signOut()
                .then(() => {
                    this.isSignedIn = false;
                    this.currentUser = null;
                    this.showSignOut = false; // Close sign-out popup after sign-out
                    this.showSignIn = false; // Close sign-in popup after sign-out
                    // Handle successful sign-out (e.g., redirect, update UI)
                })
                .catch(error => {
                    // Handle sign-out error
                });
        }
    },
    created() {
        authService.onAuthStateChanged(user => {
            if (user) {
                this.isSignedIn = true;
                this.currentUser = user;
            } else {
                this.isSignedIn = false;
                this.currentUser = null;
            }
        });
    },
    mounted() { // Change onMounted to mounted
        initFlowbite();
    }
};
</script>

<style scoped>
.centerModal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 80%;
    /* Set a maximum width for responsiveness */
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    /* Ensure it appears above other content */

    /* Additional styles for responsiveness */
    @media (max-width: 768px) {
        width: 90%;
        /* Adjust the width for smaller screens */
    }
}

.backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(68, 68, 68, 0.2);
    /* Semi-transparent black background */
    backdrop-filter: blur(8px);
    /* Adjust the blur amount as needed */
    z-index: 999;
    /* Ensure it appears above other content */
}
</style>