<template>
    <div>
        <!-- Image floue en arrière-plan -->
        <div style="margin-bottom: 10%;">
            <div class="bg-image">
                <img src="../assets/hellfest.png" alt="Image" class="bg-image">
            </div>

            <!-- Contenu de la page -->
            <div class="content">
                <!-- Image non floue -->
                <img src="../assets/hellfest.png" alt="Image" class="main-image">

                <!-- Texte sous l'image -->
                <div class="text-container">
                    <!-- Titre du festival -->
                    <h2 class="festival-name">Hellfest</h2>

                    <!-- Grid of festival details -->
                    <div class="festival-details">
                        <div>Date: 2024-06-21</div>
                        <div>Lieu: Clisson, France</div>
                        <div>Artiste principal: Artist Name</div>
                    </div>

                    <!-- Button "J'y vais" -->
                    <div class="text-center">
                        <button class="attend-button mx-auto block">J'y vais</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Contenu supplémentaire -->
        <div class="text-center">
            <h2 class="text-xl ">Ça pourra aussi vous intéresser</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2"
            style="margin-left: 3%; margin-right: 3%;">
            <article
                v-for="(festival, index) in (festivals).slice(0, limit)"
                :key="index"
                class="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto mt-7 mb-7 w-full">
                <img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a" :alt="festival.nomFestival"
                    class="absolute inset-0 h-full w-full object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                <h3 class="z-10 mt-3 text-3xl font-bold text-white">{{ festival.nomFestival }}</h3>
                <div class="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">{{
                    getFormattedDate(festival.dateDebut) }} - {{ getFormattedDate(festival.dateFin) }}, {{
        !festival.commune ? 'Marrakech' : festival.commune.nomCommune }}</div>
            </article>
        </div>
    </div>
</template>



<script>
import api from '@/api'
import { myMixins } from '@/mixins/myMixins';

export default {
    name: 'FestivalView',
    mixins: [myMixins],
    data(){
        return {
            festivals: [],
            limit:4,
        }
    },
    mounted() {
        api.getFestivals().then((data) => {
            this.festivals = data.data;
        })
    },
}
</script>
<style>
.bg-image {
    position: absolute;
    top: 0;
    right: 0px;
    width: 100vh;
    height: 100%;
    /* Hauteur spécifique définie ici */
    filter: blur(10px);
    /* Ajustez le flou selon vos préférences */
    z-index: -1;
    display: flex;
    justify-content: center;
    align-items: center;
}
.bg-image {
    width: 100%;
    max-height: 100vh;
    min-height: 70vh; /* Hauteur maximale de l'écran */
    overflow: hidden; /* Pour cacher le débordement de l'image */
}

.bg-image img {
    width: 100%;
    height: auto; /* Pour conserver les proportions de l'image */
}
.content {
    position: relative;
    z-index: 1;
    text-align: center;
    /* Centrer le contenu */
}

.main-image {
    /* Taille et position de l'image non floue */
    width: 30%;
    /* Ajustez la taille selon vos préférences */
    margin: 50px auto;
    /* Centrer l'image */
    display: block;
}

.text-container {
    margin-top: 20px;
    /* Espace entre l'image et le texte */
}

/* Styles pour le texte */
.festival-name {
    font-size: 24px;
    /* Ajustez la taille du titre */
    /* white color*/
    color: #fff;
}

.festival-details {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    text-align: center;
    margin-top: 10px;
    /* Espace entre les détails */
    color: #fff;
}

.attend-button {
    display: block;
    margin-top: 20px;
    /* Espace entre les détails et le bouton */
    padding: 10px 20px;
    font-size: 16px;
    /* Ajustez la taille du bouton */
}

.attend-button {
    border: 1px solid #F1CE53;
    background-color: #F1CE53;
    color: #fff;
    font-weight: 500;
    padding: 10px;
    cursor: pointer;
    border-radius: 0px;
    margin: 5% 0%;
    width: 10%;
}

@media screen and (max-width: 798px) {
    .attend-button {
        width: 13%;
        font-size: 14px !important;
    }
}

@media screen and (max-width: 570px) {
    .attend-button {
        width: 20%;
        font-size: 14px !important;
    }
}

@media screen and (max-width: 762px) {
    .bg-image {
        min-height: 67vh; /* Hauteur maximale de l'écran */
        overflow: hidden; /* Pour cacher le débordement de l'image */
    }
}
@media screen and (max-width: 675px) {
    .bg-image {
        min-height: 64vh; /* Hauteur maximale de l'écran */
        overflow: hidden; /* Pour cacher le débordement de l'image */
    }
}
</style>