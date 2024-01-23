<template>
    <div>
        <h1>Hello</h1>
        <LoginModal></LoginModal>
    </div>
</template>

  
<script>
import LoginModal from '@/components/modals/LoginModal.vue';
export default {
    name: 'HomeView',
    components: {
        LoginModal,
    },
};
</script>
  
<style>
/* Vos styles ici */
</style>
