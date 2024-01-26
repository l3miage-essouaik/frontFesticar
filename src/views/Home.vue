<template>
    <div>
        <div class="z-10">
            <div class="bar">
                <div class="location">
                    <p>Festival</p>
                    <!-- remove the outline from the input-->
                    <input type="text" placeholder="Rechercher un festival" v-model="nomFestival">
                </div>
                <div class="check-in" v-on:click="() => { selectingDate = true }">
                    <p>Date</p>
                    <input type="text" placeholder="Quand ?">
                    <vue-date-picker v-model="selectedDate" placeholder="Quand ?" format="dd/MM/yyyy"
                        :style="{ opacity: selectingDate ? '1' : '0', zIndex: selectingDate ? '1' : '-1' }" type="date"
                        label="start (required)" class="overlay-picker"></vue-date-picker>
                </div>
                <div class="check-out">
                    <p>Ville</p>
                    <input type="text" placeholder="Où ?">
                </div>
                <div class="prix">
                    <p>Budget</p>
                    <input type="text" placeholder="Quel est votre budget max ?">
                </div>
                <div class="domain">
                    <p>Domaine</p>
                    <input type="text" placeholder="Vous êtes fan de quoi ?">
                </div>
                <div class="icon" @click="getFestivalsWithCriterias(this.nomFestival)">
                    <div class="backgIcon">
                        <SearchIcon color='white' />
                    </div>
                </div>

            </div>
        </div>
        <div class="card-carousel-wrapper" style="margin-top: 140px">
            <div class="card-carousel--nav__left" @click="moveCarousel(-1)" :disabled="atHeadOfList"></div>
            <div class="card-carousel">
                <div class="card-carousel--overflow-container">
                    <div class="card-carousel-cards" :style="{ transform: 'translateX(' + currentOffset + 'px)' }">
                        <!-- Logo images for festival types -->
                        <div class="card-carousel--card" v-for="(type, index) in festivalTypes" :key="index">
                            <img src="../assets/jazz.png" :alt="type.name" class="festival-logo" />
                        </div>
                    </div>
                    <!--
                    <div class="pt-22">
                        <div class="pt-32 mx-auto max-w-6xl">
                            <div class="grid grid-cols-7 gap-4">
                                <div class="col-span-1 p-2 text-xs smiya1" v-for="(domaine, index) in domaines" :key="index">{{ domaine.nomDomaine }}</div>
                            </div>
                        </div>
                    -->

                </div>
            </div>
            <div class="card-carousel--nav__right" @click="moveCarousel(1)" :disabled="atEndOfList"></div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2"
            style="margin-left: 3%; margin-right: 3%;">
            <article v-for="(festival, index) in festivals" :key="index"
                class="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto mt-24 w-full">
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
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import api from '@/api'

export default {
    name: 'HomeView',
    data() {
        return {
            selectedDate: null,
            selectingDate: false,
            festivals: [],
            domaines: [],
            nomFestival: '',
            dateDebut: '',
            dateFin: '',
            tarif: '',
            sousDomaine: '',
            festivalsCriterias: [],
            currentOffset: 0,
            windowSize: 7,
            paginationFactor: 220,
            festivalTypes: [
                { name: 'Jazz Festival', logo: '../assets/hellfest.png' },
                { name: 'Techno Festival', logo: '../assets/hellfest.png' },
                { name: 'Techno Festival', logo: '../assets/hellfest.png' },
                { name: 'Techno Festival', logo: '../assets/hellfest.png' },
                { name: 'Techno Festival', logo: '../assets/hellfest.png' },
                { name: 'Techno Festival', logo: '../assets/hellfest.png' },
                { name: 'Techno Festival', logo: '../assets/hellfest.png' },
                { name: 'Techno Festival', logo: '../assets/hellfest.png' },
                { name: 'Techno Festival', logo: '../assets/hellfest.png' },
                { name: 'Techno Festival', logo: '../assets/hellfest.png' },
                // Add more festival types here
            ],
            items: [
                {
                    name: 'Kin Khao',
                    image: '../assets/jazz.png',
                    tag: ["Thai"]
                },
                {
                    name: 'Jū-Ni',
                    image: '../assets/jazz.png',
                    tag: ["Sushi", "Japanese", "$$$$"]
                },
                {
                    name: 'Delfina',
                    image: '../assets/jazz.png',
                    tag: ["Pizza", "Casual"]
                },
                {
                    name: 'San Tung',
                    image: '../assets/jazz.png',
                    tag: ["Chinese", "$$"]
                },
                {
                    name: 'Anchor Oyster Bar',
                    image: '../assets/jazz.png',
                    tag: ["Seafood", "Cioppino"]
                },
                {
                    name: 'Locanda',
                    image: '../assets/jazz.png',
                    tag: ["Italian"]
                },
                {
                    name: 'Garden Creamery',
                    image: '../assets/jazz.png',
                    tag: ["Ice cream"]
                }
            ]
        }
    },

    components: { VueDatePicker },
    methods: {
        onDateChange() {
            console.log(this.selectedDate);
        },
        moveCarousel(direction) {
            const maxOffset = (this.items.length - this.windowSize) * this.paginationFactor;
            if (direction === 1 && this.currentOffset > -maxOffset) {
                this.currentOffset -= this.paginationFactor;
            } else if (direction === -1 && this.currentOffset < 0) {
                this.currentOffset += this.paginationFactor;
            }
        },
        getFormattedDate(dateString) {
            const date = new Date(dateString);
            const day = date.getDate();
            const month = this.getMonthName(date.getMonth());
            return `${day} ${month}`;
        },
        getMonthName(monthIndex) {
            const months = [
                'Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jun',
                'Jul', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'
            ];
            return months[monthIndex];
        }
    },
    mounted() {
        console.log("heyyyy");
        api.getFestivals().then((data) => {
            this.festivals = data.data;
            console.log(this.festivals)
        })
        api.getDomaines().then((data) => {
            this.domaines = data.data;
            console.log(this.domaines)
        })
        api.getFestivalsWithcriterias(this.nomFestival, this.dateDebut, this.dateFin, this.tarif, this.sousDomaine).then((data) => {
            this.festivalsCriterias = data.data;
            console.log(this.festivalsCriterias)
        })
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

html,
body {
    height: 100%;
}

body {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: sans-serif;
    background: url("https://images.unsplash.com/photo-1580196969807-cc6de06c05be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1579&q=80");
    background-size: cover;
    background-repeat: no-repeat;

}

.smiya1 {
    border-radius: 25px;
    background-color: #4AD3B8;
}

.smiya2 {
    border-radius: 25px;
    background-color: #F1CE53;
}

.smiya3 {
    border-radius: 25px;
    background-color: #74D29F;
}

.bar {
    max-width: 1800px;
    height: 69px !important;
    background: white;
    box-shadow: 0 0 5px hsl(0 0% 78%);
    border-radius: 100vw;
    display: flex;
    justify-content: center;
    font-size: 0.6rem;
    position: absolute;
    left: 50%;
    top: 20%;
    transform: translate(-50%, -50%);
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
    width: 10%;
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
}

.check-in,
.check-out,
.guests {
    width: 22%;
}

input {
    padding-right: 30px;
    /* Adjust the padding based on the size of your SearchIcon */
}


input[type="text"] {
    background: none;
    border: none;
    padding: 0.2rem 0 0 0;
    outline: none;
    /* Ajoutez cette ligne pour désactiver l'outline par défaut */
    box-shadow: none;
    /* Ajoutez cette ligne pour désactiver le box-shadow par défaut */
}

input[type="text"]:focus {
    box-shadow: none;
    /* Assurez-vous que le box-shadow est désactivé lorsqu'en focus */
}

.input-wrapper {
    display: flex;
    align-items: center;
    position: relative;
    margin-top: -15px;
    margin-left: -24px;
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

.search-icon {
    position: absolute;
    right: 5px;
    /* Adjust the right position based on your layout */
    cursor: pointer;
    /* Add any other styles you need for your SearchIcon */
}

.card-carousel-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0 40px;
    color: #666a73;
}

.card-carousel {
    display: flex;
    justify-content: center;
    width: 640px;
}

.card-carousel--overflow-container {
    overflow: hidden;
}

.card-carousel--nav__left,
.card-carousel--nav__right {
    display: inline-block;
    width: 15px;
    height: 15px;
    padding: 10px;
    box-sizing: border-box;
    border-top: 2px solid #42b883;
    border-right: 2px solid #42b883;
    cursor: pointer;
    margin: 0 20px;
    transition: transform 150ms linear;
}

.card-carousel--nav__left[disabled],
.card-carousel--nav__right[disabled] {
    opacity: 0.2;
    border-color: black;
}

.card-carousel--nav__left {
    transform: rotate(-135deg);
}

.card-carousel--nav__left:active {
    transform: rotate(-135deg) scale(0.9);
}

.card-carousel--nav__right {
    transform: rotate(45deg);
}

.card-carousel--nav__right:active {
    transform: rotate(45deg) scale(0.9);
}

.card-carousel-cards {
    display: flex;
    transition: transform 150ms ease-out;
    transform: translatex(0px);
}

.card-carousel-cards .card-carousel--card {
    margin: 0 10px;
    cursor: pointer;
    box-shadow: 0 4px 15px 0 rgba(40, 44, 53, 0.06), 0 2px 2px 0 rgba(40, 44, 53, 0.08);
    background-color: #fff;
    border-radius: 4px;
    z-index: 3;
    margin-bottom: 2px;
}

.card-carousel-cards .card-carousel--card:first-child {
    margin-left: 0;
}

.card-carousel-cards .card-carousel--card:last-child {
    margin-right: 0;
}

.card-carousel-cards .card-carousel--card img {
    vertical-align: bottom;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    transition: opacity 150ms linear;
    user-select: none;
}

.card-carousel-cards .card-carousel--card img:hover {
    opacity: 0.5;
}

.card-carousel-cards .card-carousel--card--footer {
    border-top: 0;
    padding: 7px 15px;
}

.card-carousel-cards .card-carousel--card--footer p {
    padding: 3px 0;
    margin: 0;
    margin-bottom: 2px;
    font-size: 19px;
    font-weight: 500;
    color: #2c3e50;
    user-select: none;
}

.card-carousel-cards .card-carousel--card--footer p.tag {
    font-size: 11px;
    font-weight: 300;
    padding: 4px;
    background: rgba(40, 44, 53, 0.06);
    display: inline-block;
    position: relative;
    margin-left: 4px;
    color: #666a73;
}

.card-carousel-cards .card-carousel--card--footer p.tag:before {
    content: "";
    float: left;
    position: absolute;
    top: 0;
    left: -12px;
    width: 0;
    height: 0;
    border-color: transparent rgba(40, 44, 53, 0.06) transparent transparent;
    border-style: solid;
    border-width: 8px 12px 12px 0;
}

.card-carousel-cards .card-carousel--card--footer p.tag.secondary {
    margin-left: 0;
    border-left: 1.45px dashed white;
}

.card-carousel-cards .card-carousel--card--footer p.tag.secondary:before {
    display: none !important;
}

.card-carousel-cards .card-carousel--card--footer p.tag:after {
    content: "";
    position: absolute;
    top: 8px;
    left: -3px;
    float: left;
    width: 4px;
    height: 4px;
    border-radius: 2px;
    background: white;
    box-shadow: 0px 0px 0px #004977;
}

h1 {
    font-size: 3.6em;
    font-weight: 100;
    text-align: center;
    margin-bottom: 0;
    color: #333;
}
</style>
