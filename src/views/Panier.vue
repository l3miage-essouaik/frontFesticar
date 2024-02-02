<template>
    <div>
        <div class="flex flex-col items-center">
            <h2 class="text-4xl font-extrabold dark:text-white title">
                <CartIcon class="icon inline-block" :size="50" color="#054652" />
                Mon Panier <span v-if="packs?.length > 0"> {{ this.total }} € </span>
            </h2>
        </div>
        <div class="fixed top-0 left-0 w-full bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md z-50"
            v-if="showAlert" role="alert">
            <div class="flex items-center justify-center">
                <div class="mr-4">
                    <svg class="fill-current h-6 w-6 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path
                            d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                    </svg>
                </div>
                <div>
                    <p class="font-bold">Votre pack a été supprimé</p>
                </div>
            </div>
        </div>
        <div v-if="packs?.length == 0" class="flex justify-center items-center h-screen">
            <h1 style="font-size: 30px;font-weight: 600;" class="text-center">Votre panier est vide</h1>
        </div>
        <div class="ml-56 mb-8">
        <router-link style="color:#35a28c;text-decoration: underline;" :to="`/`">Accueil</router-link> <span style="color:#35a28c">/ </span>
        <router-link :to="`/Panier`" style="color:#666666;">Panier</router-link>
    </div>
        <div class="relative">
            <div v-for="(pack, index) in packs" :key="index" class="grid grid-cols-12 gap-8 panier"
                style='position: relative;'>
                <div class="col-span-6 flex items-center">
                    <div class="ml-2">
                        <img src="../assets/ragragui.png" alt="Your Image" class="w-10 h-10 object-cover rounded-full" />
                    </div>
                    <div>
                        <p class="text-sm font-medium ml-2">{{
                            pack.idPack.arretCovoiturage.arretCovoiturageId.idCovoiturage.utilisateur.nom }}
                            {{ pack.idPack.arretCovoiturage.arretCovoiturageId.idCovoiturage.utilisateur.prenom }} </p>
                        <p class="text-xs text-gray-500 ml-2">Conducteur</p>
                    </div>
                </div>

                <div class="col-span-6 text-right">
                    <p class="prix">{{ pack.nbPlacesReserves * pack.idPack.arretCovoiturage.tarif }} €</p>
                </div>
                <div class="col-span-2 relative h-4  flex items-center">
                    <div class="ml-5 flex flex-col justify-center">
                        <div class="hour">
                            <p class="text-sm font-medium">{{ pack.idPack.arretCovoiturage.arretCovoiturageId.horaire }}</p>
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

                <div class="col-span-10 h-4" style="margin-top:-10px">
                    <p class="text-sm font-medium">{{ pack.idPack.arretCovoiturage.lieuCovoiturage.nomLieu }}, {{
                        convertirTypeLieu(pack.idPack.arretCovoiturage.lieuCovoiturage.typeLieu) }}</p>
                    <p class="text-sm font-small">{{ pack.idPack.arretCovoiturage.lieuCovoiturage.codeInsee?.nomCommune ?
                        pack.idPack.arretCovoiturage.lieuCovoiturage.codeInsee?.nomCommune : 'Neverland' }}
                    </p>
                </div>
                <div class="col-span-2 relative h-4  items-center">
                    <div class="ml-5 mt-8 hourDown">
                        <p class="text-sm font-medium">20:00</p>
                    </div>
                </div>
                <div class="col-span-10 h-4  mt-8">
                    <p class="text-sm font-medium">
                        {{ pack.idPack.arretCovoiturage.arretCovoiturageId.idCovoiturage.festival.nomFestival }}</p>
                    <p class="text-sm font-small">{{
                        pack.idPack.arretCovoiturage.arretCovoiturageId.idCovoiturage.festival.commune?.nomCommune ?
                        pack.idPack.arretCovoiturage.arretCovoiturageId.idCovoiturage.festival.commune?.nomCommune :
                        'Neverland' }} , {{
        pack.idPack.arretCovoiturage.arretCovoiturageId.idCovoiturage.festival.commune?.departement?.nomDepartement
        ?
        pack.idPack.arretCovoiturage.arretCovoiturageId.idCovoiturage.festival.commune?.departement?.nomDepartement
        : 'Neverland' }}</p>
                </div>
                <div class="col-span-9 h-4  mt-8 flex justify-between items-center">
                    <p class="text-sm font-medium">Nombre de place disponible : {{
                        pack.idPack.arretCovoiturage.arretCovoiturageId.idCovoiturage.nbPlaces
                        - pack.idPack.arretCovoiturage.arretCovoiturageId.idCovoiturage.nbPlacesReservées
                        - pack.nbPlacesReserves }}</p>

                    <div class="max-w-xs relative flex items-center">
                        <form class="max-w-xs ml-4">
                            <div class="relative flex items-center">
                                <button v-on:click="decrementCounter(pack)" type="button">
                                    <MinusIcon />
                                </button>
                                <input type="text" id="counter-input" data-input-counter
                                    class="flex-shrink-0 text-gray-900 dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"
                                    placeholder="" value="12" v-model="pack.nbPlacesReserves" required>
                                <button v-on:click="incrementCounter(pack)" type="button">
                                    <PlusIcon />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="col-span-3 h-4  mt-8 flex justify-end">
                    <p class="text-sm font-medium" style="margin-top: -7px;">
                        <TrashIcon style="cursor: pointer;" :size="30" color="#054652"
                            v-on:click="deletePack(pack.idPack.arretCovoiturage.arretCovoiturageId.horaire, pack.idPack.arretCovoiturage.arretCovoiturageId.idCovoiturage.idCovoiturage, pack.idPack.panier.idPanier)" />
                    </p>
                </div>
            </div>
            <button v-if="packs?.length > 0" class="voirPlus w-10/12 md:w-2/4 lg:w-1/4 mx-auto block"
                v-on:click="etesVousSur(packs[0].idPack.panier?.idPanier)">
                Valider l'achat
            </button>
        </div>
    </div>
</template>
  
<script>
import CartIcon from '../components/Icons/CartIcon.vue'
import api from '@/api';
import { myMixins } from '@/mixins/myMixins';
import Vue from 'vue';

export default {
    name: 'PanierView',
    mixins: [myMixins],
    data() {
        return {
            counter: 0,
            panier: {},
            lieuPacks: [],
            packs: [],
            covoiturage: {},
            total: 0,
            showAlert: false,
        }
    },
    methods: {
        deletePack(horaire, idCov, panierId) {
            if (window.confirm("Êtes-vous sûr de vouloir supprimer ce pack ?")) {
                api.deletePack(horaire, idCov, panierId).then(() => {
                    this.showAlert = true;
                    console.log(this.showAlert);

                    setTimeout(() => {
                        window.location.reload();
                    }, 580);
                }).catch(error => {
                    // Gérer les erreurs éventuelles lors de la suppression
                });
            }
        },
        etesVousSur(idPanier) {
            if (confirm("Êtes-vous sûr ?")) {
                // 
                this.packs.map(pack => {
                    console.log(pack.idPack);
                    let updatedPack = { panier: pack.idPack.panier.idPanier, horaire: pack.idPack.arretCovoiturage.arretCovoiturageId.horaire, idCovoiturage: pack.idPack.arretCovoiturage.arretCovoiturageId.idCovoiturage.idCovoiturage, nbPlacesReserves: pack.nbPlacesReserves }
                    api.updateNbPlaces(updatedPack).then(data => {
                        console.log(data);
                    })
                })
                api.updateEtatPanier(idPanier, 1).then(() => {
                    confirm("Votre paiement a été effectué avec succès")
                    this.packs = [];
                })

            }
        },
        incrementCounter(pack) {
            if (pack.idPack.arretCovoiturage.arretCovoiturageId.idCovoiturage.nbPlaces - pack.idPack.arretCovoiturage.arretCovoiturageId.idCovoiturage.nbPlacesReservées - pack.nbPlacesReserves !== 0) {
                pack.nbPlacesReserves += 1;
                this.recalculerTotal();
            }
        },
        decrementCounter(pack) {
            if (pack.nbPlacesReserves > 1) {
                pack.nbPlacesReserves -= 1;
                this.recalculerTotal();
            }
        },
        recalculerTotal() {
            if (this.packs && this.packs.length > 0) {
                this.total = this.packs.reduce((acc, pack) => {
                    let packTotal = pack.idPack.arretCovoiturage.tarif * pack.nbPlacesReserves;
                    return acc + packTotal;
                }, 0);
            }
        },
    },
    mounted() {
        if (localStorage.getItem('userId')) {
            api.getPanierByUser(localStorage.getItem('userId')).then((response) => {
                const paniersEnAttente = response.data.filter(panier => panier.etat === "EN_ATTENTE");
                // Ajouter les paniers filtrés à votre liste (this.paniers)
                this.panier = paniersEnAttente;
            });
            setTimeout(async () => {
                if ((Object.keys(this.panier)?.length) !== 0) {
                    this.packs = (await api.getPackByIdPanier(this.panier[0]?.idPanier)).data;
                    if (this.packs && this.packs?.length > 0) {
                        this.total = this.packs.reduce((acc, pack) => {
                            let packTotal = pack.idPack.arretCovoiturage.tarif * pack.nbPlacesReserves;
                            return acc + packTotal;
                        }, 0);
                    }
                }
            },500);

        }


        // api.updateNbPlaces({
        //     "panier": 30,
        //     "horaire": "13:56",
        //     "idCovoiturage": 156,
        //     "nbPlacesReserves": 3
        // }).then((resp)=>{
        //     console.log(resp);
        // })

    }
};
</script>
  
<style scoped>
#increment-button,
#decrement-button {
    border-radius: 100%;
    background-color: transparent;
    color: #054652 !important;
    border: 2px solid #054652 !important;
    outline: none;

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
    position: relative !important;
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

.voirPlus {
    border: 1px solid #F1CE53;
    color: #F1CE53;
    padding: 10px;
    cursor: pointer;
    border-radius: 0px;
    margin: 5% 0%;
    width: 10%;
}

.voirPlus:hover {
    color: #fff;
    background-color: #F1CE53;
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
  