<template>
    <div>
        <div class="z-10">
            <div class="bar">
                <div class="location">
                    <p>Festival</p>
                    <!-- remove the outline from the input-->
                    <input type="text" placeholder="Rechercher un festival" v-model="nomFestival">
                </div>
                <div class="check-in">
                    <p>Date</p>
                    <input type="date" class="inputDate"  v-model="dateDebut" placeholder="Quand ?"> 
                </div>
                <div class="check-out">
                    <p>Ville</p>
                    <input type="text" placeholder="Où ?" v-model="ville">
                </div>
                <div class="prix">
                    <p>Budget</p>
                    <input type="text" placeholder="Quel est votre budget max ?" v-model="prix">
                </div>
                <div class="domain">
                    <p>Domaine</p>
                    <select v-model="domaine">
                        <option value="" style="font-size:2px !important" disabled selected>Vous êtes fan de quoi ?</option>
                        <!-- Placeholder -->
                        <option v-for="(domaine, index) in domaines" :key="index" :value="domaine">{{ domaine.nomDomaine }}
                        </option>
                    </select>
                </div>
                <div class="icon" v-on:click="getFestivalsWithCriterias()">
                    <div class="backgIcon">
                        <SearchIcon color='white' />
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="card-carousel-wrapper" style="margin-top: 140px">
            <div class="card-carousel--nav__left" @click="moveCarousel(-1)" :disabled="atHeadOfList"></div>
            <div class="card-carousel">
                <div class="card-carousel--overflow-container">
                    <div class="card-carousel-cards" :style="{ transform: 'translateX(' + currentOffset + 'px)' }">
                        <div class="card-carousel--card" v-for="(type, index) in logoDomaines" :key="index">
                            <img :src="require(`../assets/${type}`)" class="festival-logo" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-carousel--nav__right" @click="moveCarousel(1)" :disabled="atEndOfList"></div>
        </div> -->

        <div class="overflow-x-auto whitespace-nowrap">
            <div class="w-full h-0.5 bg-gray-200 rounded" style="margin-top: 90px;margin-bottom:10px;z-index:999"></div>
            <div v-for="(type, index) in logoDomaines" :key="index" class="inline-block mx-2 relative">
                <div class="group">
                    <img :src="require(`../assets/${type.nomLogo}`)" class="domains-logo" />
                    <div class="absolute inset-0 flex items-center 
                        justify-center text-black opacity-0 group-hover:opacity-100 
                        transition-opacity duration-300 mt-20 nomDomaine">
                        {{ type.nomDomaine.charAt(0).toUpperCase() + type.nomDomaine.slice(1) }}
                    </div>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2"
            style="margin-left: 3%; margin-right: 3%;">
            <article
                v-for="(festival, index) in (festivalsFiltered.length > 0 ? festivalsFiltered : festivals).slice(0, limit)"
                :key="index"
                class="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto mt-7 w-full">
                <img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a" :alt="festival.nomFestival"
                    class="absolute inset-0 h-full w-full object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                <h3 class="z-10 mt-3 text-3xl font-bold text-white">{{ festival.nomFestival }}</h3>
                <div class="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">{{
                    getFormattedDate(festival.dateDebut) }} - {{ getFormattedDate(festival.dateFin) }}, {{
        !festival.commune ? 'Marrakech' : festival.commune.nomCommune }}</div>
            </article>
        </div>
        <div class="flex justify-center items-center">
            <button class="voirPlus w-10/12 md:w-2/4 lg:w-1/4" v-on:click="() => voirPlusFestival()"
                :class="{ 'disabledButton': limit >= festivalsFiltered.length && festivalsFiltered.length > 0 }">
                Voir plus
            </button>
        </div>
    </div>
</template>

<script>
//import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import api from '@/api'
import { myMixins } from '@/mixins/myMixins'; 

export default {
    name: 'HomeView',
    mixins: [myMixins],
    data() {
        return {
            ville: '',
            prix: null,
            domaine: '',
            domaines: [],
            nomFestival: '',
            dateDebut: '',
            dateFin: '',
            tarif: '',
            sousDomaine: '',
            currentOffset: 0,
            windowSize: 4,
            paginationFactor: 120,
            festivals: [],
            festivalsFiltered: [],
            logoDomaines: [],
            limit: 8,
        }
    },
    methods: {
        getFestivalsWithCriterias() {
            api.getFestivalsWithcriterias(this.nomFestival, this.dateDebut, null, this.prix, this.domaine.nomDomaine).then((data) => {
                this.festivalsFiltered = data.data;
            })
        },
        onDateChange() {
        },
        voirPlusFestival() {
            this.limit += 8;
            api.getFestivals().then((festivals) => {
                festivals.data.map((festival) => {
                    this.festivals.push(festival);
                });
            });
        },
    
        moveCarousel(direction) {
            const maxOffset = (this.items.length - this.windowSize) * this.paginationFactor;
            if (direction === 1 && this.currentOffset > -maxOffset) {
                this.currentOffset -= this.paginationFactor;
            } else if (direction === -1 && this.currentOffset < 0) {
                this.currentOffset += this.paginationFactor;
            }
        },
    },
    mounted() {
        api.getFestivals().then((data) => {
            this.festivals = data.data;
        })
        api.getDomaines().then((data) => {
            this.domaines = data.data;
            this.domaines.forEach(obj => {
                let nomDomaine = obj.nomDomaine;
                let nomDomaineFormate = nomDomaine.toLowerCase().replace(/\s+/g, '').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                let nomFichierLogo = nomDomaineFormate + ".png";
                this.logoDomaines.push({ nomLogo: nomFichierLogo, nomDomaine: nomDomaine });

            });
        });
    },
    computed: {
        atEndOfList() {
            return this.currentOffset <= -((this.items.length - this.windowSize) * this.paginationFactor);
        },
        atHeadOfList() {
            return this.currentOffset === 0;
        },
    }
};
</script>

<style scoped>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

.disabledButton {
    color: rgb(141, 141, 141) !important;
    cursor: not-allowed ! important;
    border: 1px solid rgb(141, 141, 141) !important;
}

.domains-logo {
    cursor: pointer;
    width: 90px;
    /* Ajustez la largeur de l'image selon vos besoins */
}

html,
body {
    height: 100%;
}

.nomDomaine {
    z-index: 9999;
    font-size: 12px;
}

.bar {
    max-width: 100%;
    height: 69px !important;
    background: white;
    box-shadow: 0 0 5px hsl(0 0% 78%);
    border-radius: 100vw;
    display: flex;
    font-size: 0.6rem;
    justify-content: center;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    overflow-x: auto;
}

gap-2 {
    gap: 1.5rem !important;
}

@media (max-width: 768px) {
    .bar {
        width: 100%;
    }
}

.bar div {
    border-radius: inherit;
    padding: 0.8rem 1.5rem;
    transition: background 250ms ease;
}

.bar div:hover {
    background: hsl(0 0% 94%);
}

.location {
    width: 34%;
}

.icon {
    width: 5%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.overlay-picker {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: -1;
    border: 0px !important;
}

.backgIcon {
    width: 5%;
    height: 50px;
    border: 1px solid #4AD3B8;
    background-color: #4AD3B8;
    display: grid;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.backgIcon:hover {
    background-color: #35a28c !important;
    border: 1px solid #35a28c !important;
    width: 6%;



}

.check-in,
.check-out,
.guests {
    width: 22%;
}

input {
    padding-right: 30px;
}


input[type="text"] {
    background: none;
    border: none;
    padding: 0.2rem 0 0 0;
    outline: none;
    box-shadow: none;
}

input[type="text"]:focus {
    box-shadow: none;
}

::placeholder {
    font-size: 0.75rem;
}

.domain {
    align-items: center;
}

.domain span {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    background: #FF385C;
    color: white;
    font-size: 0.8rem;
    padding: 0.7rem;
    border-radius: 50%;
}

.bar>div {
    position: relative;
}

.domain:hover select{
    background-color: #f0f0f0 !important;
    transition: background-color 0.1s ease-in-out; 
}
.bar>div::before {
    position: absolute;
    content: "";
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 1px;
    height: 55%;
    background: hsl(0 0% 90%);
}

.bar>div:nth-of-type(1)::before {
    background: transparent;
}


.bar>div:hover::before {
    background: transparent;
}

h1 {
    font-size: 3.6em;
    font-weight: 100;
    text-align: center;
    margin-bottom: 0;
    color: #333;
}

select {
    color: #666666;
    font-size: 12px;
    margin-top: 4px;
}

.inputDate{
    color: #666666;
    font-size: 12px;
    margin-top: -5px;
    margin-left: -13px;
    background-color: transparent;
    outline: none !important;
    box-shadow: none !important;
}

select:hover {
    cursor: pointer;
}

select {
    outline: none !important;
    box-shadow: none !important;
}

select:focus {
    outline: 0;
    box-shadow: 0 0 0 2px rgba(111, 111, 111, 0.2);
}

@media (max-width: 1068px) {

    .check-out,
    .prix {
        width: 10%;
    }

}

.voirPlus {
    border: 1px solid #4AD3B8;
    color: #4AD3B8;
    padding: 10px;
    cursor: pointer;
    border-radius: 0px;
    margin: 5% 0%;
    width: 10%;
}
</style>
