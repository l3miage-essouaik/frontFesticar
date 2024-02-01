<template lang="">
<div>
    <!-- Title "Destination <Name of the festival that we clicked on to get here>"-->
    <div class="flex flex-col items-center">
        <h2 class="text-4xl font-extrabold dark:text-white title">
            Destination {{destination}}
        </h2>
    </div>
    <!-- a horizontal 1pt line to separate the title from the content -->
    <hr class="mt-5 mb-5" style="border: -0.5px solid #054652; width: 100%;">
    <div class="z-10">
        <div class="bar">
            <div class="location">
                <p>Départ</p>
                <!-- remove the outline from the input-->
                <input type="text" placeholder="Ville de départ" v-model="ville">
            </div>
            <div class="domain">
                <p>Véhicule</p>
                <select v-model="modele">
                    <option value="" style="font-size:2px !important" disabled selected>Type de véhicule</option>
                    <!-- Placeholder -->
                    <option v-for="(typeV, index) in typesVehicule" :key="index" :value="typeV">{{ typeV }}
                    </option>
                </select>
            </div>
            <div class="domain">
                <p>Places disponibles</p>
                <input type="text" placeholder="Nombre de places disponibles" v-model="placeDispo">
            </div>
            <div class="domain">
                <p>Budget</p>
                <input type="text" placeholder="Quel est votre budget max ?" v-model="prix">
            </div>
            <div class="icon" v-on:click="getCovWithCriterias()">
                <div class="backgIcon">
                    <SearchIcon color='white' />
                </div>
            </div>
        </div>
        <!--  -->
    </div>
    <!-- white space to separate the bar from the content -->
    <div class="mt-32"></div>
    <!-- Covoiturage -->
    <div class="relative">
        <div v-for="(covoiturage, index) in covoiturages" v-show="covoiturage.nbPlaces - covoiturage.nbPlacesReservées > 0" :key="index" class="grid grid-cols-12 gap-8 panier">
            <div class="col-span-6 flex items-center">
                <div class="ml-2">
                    <img src="../assets/ragragui.png" alt="Your Image" class="w-10 h-10 object-cover rounded-full" />
                </div>
                <div>
                    <p class="text-sm font-medium ml-2">{{covoiturage.utilisateur.nom}} {{covoiturage.utilisateur.prenom}}</p>
                    <p class="text-xs text-gray-500 ml-2">Conducteur</p>
                </div>
                <div class="ml-5" @mouseover="covoiturage.showInfo = true" @mouseleave="covoiturage.showInfo = false">
                    <div class="information"> ℹ</div>
                    <div class="tooltip" v-if="covoiturage.showInfo">
                        <p>Type de voiture: {{covoiturage.modelVoiture}}</p>
                        <p>Modèle: {{covoiturage.marque}} </p>
                        <p>Couleur: {{covoiturage.couleur}} </p>
                        <p>Nombre de passagers: {{ covoiturage.nbPlacesReservées }}</p>
                    </div>
                </div>
            </div>

            <div class="col-span-6 text-right">
                <template v-for="(arretOption, index) in covoiturage.arretCovoiturageList" :key="index">
                    <p v-if="selectedArret === arretOption.lieuCovoiturage.nomLieu" class="text-sm font-small prix">{{ arretOption.tarif * covoiturage.counter}} €</p>
                </template>
            </div>
            <div class="col-span-2 relative h-4  flex items-center">
                <div class="ml-5 flex flex-col justify-center">
                    <div class="hour">
                        <p class="text-sm font-medium">16:30</p>
                        <p class="text-sm font-small">6h30</p>
                    </div>
                </div>
                <div class="containerCircle flex items-center ml-2">
                    <div class="circle"></div>
                    <div class="line"></div>
                    <div class="circleDown flex items-start">
                    </div>
                </div>
            </div>

            <template v-for="(arret, arretIndex) in covoiturage.arretCovoiturageList" :key="arretIndex">
                <template v-if="arret.estDepart">
                    <div class="col-span-10 h-4" style="margin-top:-10px">
                        <!-- v-on:click="showMapModal(covoiturage)" -->
                        <select class="text-sm font-medium" v-model="selectedArret" >
                            <option disabled value="">Choisissez un arrêt</option>
                            <option v-for="(arretOption, index) in covoiturage.arretCovoiturageList"  :key="index" :value="arretOption.lieuCovoiturage.nomLieu">
                            {{ arretOption.lieuCovoiturage.nomLieu }}
                            </option>
                        </select>
                        <template v-for="(arretOption, index) in covoiturage.arretCovoiturageList" :key="index">
                            <p v-if="selectedArret === arretOption.lieuCovoiturage.nomLieu" class="text-sm font-small">{{ arretOption.lieuCovoiturage.codeInsee?.nomCommune }}, {{ convertirTypeLieu(arretOption.lieuCovoiturage.typeLieu) }}</p>
                        </template>
                    </div>
                    <div v-if="covoiturage.showMap && arret" class="backdrop" style="position:absolute"> 
                        <MapModal class="centerModal" 
                            :lng="arret.lieuCovoiturage.codeInsee?.longitude" 
                            :lat="arret.lieuCovoiturage.codeInsee?.latitude" :showMap="covoiturage.showMap" @close-map-modal="closeMapModal(covoiturage)" />
                    </div>
                </template>
            </template>
   
            <div class="col-span-2 relative h-4  items-center">
                <div class="ml-5 mt-8 hourDown">
                    <p class="text-sm font-medium">20:00</p>
                </div>
            </div>
            <div class="col-span-10 h-4  mt-8">
                <p class="text-sm font-medium">{{destination}}</p>
                <p class="text-sm font-small">{{ covoiturage.festival.commune && covoiturage.festival.commune.nomCommune ? covoiturage.festival.commune.nomCommune : 'Neverland' }}, 
                {{ covoiturage.festival.commune && covoiturage.festival.commune.departement && covoiturage.festival.commune.departement.nomDepartement 
                ? covoiturage.festival.commune.departement.nomDepartement : 'Neverland' }}</p>
            </div>
            <div class="col-span-6 h-4 mt-8 flex justify-between items-center">
                <p class="text-sm font-medium" >Nombre de places disponibles &nbsp;:&nbsp; {{covoiturage.nbPlaces - covoiturage.nbPlacesReservées }}</p>
                <form class="max-w-xs ml-4">
                    <div class="relative flex items-center">
                        <div v-on:click="decrementCounter(covoiturage)" type="button" id="decrement-button" data-input-counter-decrement="counter-input">
                            -
                        </div>
                        <input type="text" id="counter-input" data-input-counter 
                        class="flex-shrink-0 text-gray-900 dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center" value="12" v-model="covoiturage.counter" required>
                        <div v-on:click="incrementCounter(covoiturage,covoiturage.nbPlaces,covoiturage.nbPlacesReservées)" type="button" id="increment-button" data-input-counter-increment="counter-input">
                            +
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-span-6 h-4 mt-8 justify-end">
                <template v-for="(arretOption, index) in covoiturage.arretCovoiturageList" :key="index">
                    <div v-if="selectedArret === arretOption.lieuCovoiturage.nomLieu" class="addToCart" v-on:click="ajouterAuPanier(covoiturage, arretOption.lieuCovoiturage.idLieu)">
                        Ajouter au panier</div>
                </template>
            </div>
<!--     
            <div style="position:absolute">{{covoiturage}}</div> -->
        </div>
        <div class="flex justify-center items-center">
            <button class="voirPlus w-10/12 md:w-2/4 lg:w-1/4" v-on:click="() => voirPlus()"
                v-if="!loading"
                :class="{ 'disabledButton': !tousCovoituragesChargees }">
                Voir plus
            </button>
        </div>
    </div>
</div>
</template>

<script>
import api from '@/api';
import { myMixins } from '@/mixins/myMixins';
import MapModal from '@/components/modals/MapModal.vue';
import Vue from 'vue';

export default {
    name: 'CovoiturageView',
    mixins: [myMixins],
    data() {
        return {
            counter: 0,
            selectedArret: '',
            typesVehicule: [],
            modele: '',
            covoiturages: [],
            destination: '',
            loading: true,
            limit: 10,
            page: 1,
            placeDispo: null,
            test: [],
            ville: '',
            prix: '',
            horaire: '',
            selectedArrets: {},
        }
    },
    components: {
        MapModal,
    },
    methods: {
        getCovWithCriterias() {
            api.getCovoiturageByCriteriaAndFestivalId(this.$route.params.festivalId, this.ville, this.modele,
                this.placeDispo, this.prix).then((data) => {
                    console.log(data);
                })
        },
        incrementCounter(covoiturage, nbPlaces, nbRes) {
            console.log(nbPlaces - nbRes);
            if ((nbPlaces - nbRes) == covoiturage.counter) {
                covoiturage.counter;
            } else {
                covoiturage.counter += 1;
            }
        },
        decrementCounter(covoiturage) {
            if (covoiturage.counter != 1)
                covoiturage.counter -= 1;
        },
        voirPlus() {
            if (this.tousCovoituragesChargees) {
                this.page += 1;
                this.fetchCovoiturages();
            }
        },
        fetchCovoiturages() {
            this.loading = true;
            api.getCovoiturageByFestivalId(this.$route.params.festivalId, this.page, this.limit)
                .then((data) => {
                    const nouveauxCovoiturages = data.data.map(covoiturage => ({ ...covoiturage, showInfo: false, counter: 1, showMap: false }));
                    this.covoiturages.push(...nouveauxCovoiturages);
                    this.destination = this.covoiturages[0].festival.nomFestival;
                    this.loading = false;
                });
        },
        createPanier(idAnonymousUser, userId) {
            return new Promise((resolve, reject) => {
                if (idAnonymousUser) {
                    api.createPanier(idAnonymousUser, { dateCreation: new Date() }).then(panier => {
                        localStorage.setItem('anonymousPanierId', panier.data.idPanier);
                        resolve(panier.data.idPanier);
                    }).catch(reject);
                }
                if (userId) {
                    api.createPanier(userId, { dateCreation: new Date() }).then(panier => {
                        resolve(panier.data.idPanier);

                    }).catch(reject);
                }
            });
        },
        async ajouterAuPanier(covoiturage, idLieu) {
            const userId = localStorage.getItem("userId");
            const horaire = await this.getArretHoraire(covoiturage.idCovoiturage, idLieu);
            if (userId) {
                let panierId;
                if (!localStorage.getItem('anonymousPanierId')) {
                    panierId = await this.createPanier(null, userId);
                } else {
                    panierId = localStorage.getItem('anonymousPanierId');
                }
                const pack = { "panier": panierId, "horaire": horaire, "idCovoiturage": covoiturage.idCovoiturage, "nbPlacesReserves": covoiturage.counter };
                api.createPack(pack).then((pack) => { })
            } else {
                let idAnonymousUser;
                if(localStorage.getItem('anonymousUserId')) {
                    idAnonymousUser = localStorage.getItem('anonymousUserId');
                } else {
                    idAnonymousUser = null;
                }
                api.createUser({
                    nom: 'Anonymous',
                    prenom: 'Anonymous',
                    email: this.generateRandomEmail(),
                    telephone: this.generateRandomPhoneNumber(),
                    mdp: 'Anonymous',
                    typeUtilisateur: 0,
                }).then(async (data) => {
                    let user = {}
                    user = data.data;
                    localStorage.setItem('anonymousUserId', user.id);
                    idAnonymousUser = user.id;
                    let panierId;
                    if (!localStorage.getItem('anonymousPanierId')) {
                        panierId = await this.createPanier(idAnonymousUser, null);
                    } else {
                        panierId = localStorage.getItem('anonymousPanierId');
                    }
                    const pack = { "panier": panierId, "horaire": horaire, "idCovoiturage": covoiturage.idCovoiturage, "nbPlacesReserves": covoiturage.counter };
                    api.createPack(pack).then((pack) => { })
                })
            }

        },
        closeMapModal(covoiturage) {
            covoiturage.showMap = false;
            console.log(covoiturage.showMap);
        },
        showMapModal(covoiturage) {
            covoiturage.showMap = true;
            console.log(covoiturage.showMap);

        },
        async getArretHoraire(idCov, idLieu) {
            try {
                const response = await api.getHoraireArret(idCov, idLieu);
                return response.data.horaire;
            } catch (error) {
                console.error("Erreur lors de la récupération de l'horaire de l'arrêt :", error);
                throw error;
            }
        },
    },
    computed: {
        tousCovoituragesChargees() {
            return this.covoiturages.length >= this.page * this.limit;
        }
    },
    mounted() {
        this.fetchCovoiturages();
        this.getArretHoraire(88183, "49069-C-003");
        api.getModelVoiture().then((data) => {
            this.typesVehicule = data.data;
        });
    },

}
</script>

<style scoped>
.voirPlus {
    border: 1px solid #4AD3B8;
    color: #4AD3B8;
    padding: 10px;
    cursor: pointer;
    border-radius: 0px;
    margin: 5% 0%;
    width: 10%;
}

.addToCart {
    border: 1px solid #F1CE53;
    padding: 10px;
    font-size: 14px;
    position: absolute;
    right: 10px;
    bottom: 15px;
    cursor: pointer;
    color: #F1CE53;
}

.addToCart:hover {
    background-color: #F1CE53;
    color: #fff;
    transition: ease-in 0.2s;
}

.tooltip {
    position: absolute;
    top: 20px;
    /* Ajustez la position selon vos besoins */
    left: 200px;
    /* Ajustez la position selon vos besoins */
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 999;
    font-size: 10px;
}

.information {
    border: 2px solid #054652;
    color: #054652;
    border-radius: 100%;
    padding: 1px 6px;
    cursor: pointer;
    font-size: 11px;
}

.disabledButton {
    color: rgb(141, 141, 141) !important;
    cursor: not-allowed ! important;
    border: 1px solid rgb(141, 141, 141) !important;
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

select {
    color: #666666;
    font-size: 12px;
    margin-top: -5px;
    margin-left: -12px;
    background-color: transparent;
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

.bar div {
    border-radius: inherit;
    padding: 0.8rem 1.5rem;
    transition: background 250ms ease;
}

.bar div:hover {
    background: hsl(0 0% 94%);
}

.location {
    width: 23%;
}

.icon {
    width: 8%;
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

.domain:hover select {
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

.inputDate {
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

#increment-button {
    border-radius: 100%;
    background-color: transparent;
    color: #054652 !important;
    border: 2px solid #054652 !important;
    outline: none;
    padding: 0px 5px;

}

#decrement-button {
    border-radius: 100%;
    background-color: transparent;
    color: #054652 !important;
    border: 2px solid #054652 !important;
    outline: none;
    padding: 0px 5px;
}

.border {
    display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: gray;
    text-align: center;
    cursor: pointer;
}

p {
    color: #054652;
}

.panier {
    padding: 20px;
    width: 70%;
    height: 300px;
    flex-shrink: 0;
    margin: 0;
    box-sizing: border-box;
    position: relative;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.10);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.hour {
    position: absolute;
    top: 100%;
    transform: translateY(-50%);
}

.hourDown {
    top: 60%;
    position: absolute;
}

.containerCircle {
    position: relative;
    left: 55px;
    z-index: 1;
}

.container {
    position: relative;
}

.circle {
    width: 18px;
    height: 18px;
    background-color: white;
    border-radius: 50%;
    border: 3px solid #054652;
    position: absolute;
    top: 10;
    left: 50%;
    transform: translateX(-50%);
}

.circleDown {
    width: 18px;
    height: 18px;
    background-color: white;
    border-radius: 50%;
    border: 3px solid #054652;
    position: absolute;
    top: 85px;
    left: 50%;
    transform: translateX(-50%);
}

.line {
    position: absolute;
    width: 2px;
    height: 90px;
    background-color: #054652;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
}

.title {
    color: #054652;
    font-size: 30px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
}

.prix {
    font-weight: 700;
    position: absolute;
    right: 20px;
    top: 30px;
}

@media (max-width: 806px) {
    .containerCircle {
        position: relative;
        left: 40px;
        z-index: 1;
    }
}

@media (max-width: 525px) {
    .title {
        font-size: 23px !important;
    }
}
</style>
