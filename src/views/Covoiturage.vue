<template lang="">
    <div>
        <!-- Title "Destination <Name of the festival that we clicked on to get here>"-->
            <div class="flex flex-col items-center">
                <h2 class="text-4xl font-extrabold dark:text-white title">
                    Destination Hellfest
                </h2>
            </div>
        <!-- a horizontal 1pt line to separate the title from the content -->
        <hr class="mt-5 mb-5" style="border: -0.5px solid #054652; width: 100%;">
        <div class="z-10">
            <div class="bar">
                <div class="location">
                    <p>Départ</p>
                    <!-- remove the outline from the input-->
                    <input type="text" placeholder="Ville de départ" v-model="nomFestival">
                </div>
                <div class="domain">
                    <p>Véhicule</p>
                    <select v-model="domaine">
                        <option value="" style="font-size:2px !important" disabled selected>Type de véhicule</option>
                        <!-- Placeholder -->
                        <option v-for="(typeV, index) in typesVehicule" :key="index" :value="typeV">{{ typeV.nomDomaine }}
                        </option>
                    </select>
                </div>
                <div class="domain">
                    <p>Places disponibles</p>
                    <input type="text" placeholder="Nombre de places disponibles" v-model="ville">
                </div>
                <div class="domain">
                    <p>Budget</p>
                    <input type="text" placeholder="Quel est votre budget max ?" v-model="prix">
                </div>
                <div class="icon" v-on:click="getFestivalsWithCriterias()">
                    <div class="backgIcon">
                        <SearchIcon color='white' />
                    </div>
                </div>
            </div>
        </div>
        <!-- white space to separate the bar from the content -->
        <div class="mt-32"></div>
        <!-- Covoiturage -->
        <div class="relative">
            <div class="grid grid-cols-12 gap-8 panier">
                <div class="col-span-6 flex items-center">
                    <div class="ml-2">
                        <img src="../assets/ragragui.png" alt="Your Image" class="w-10 h-10 object-cover rounded-full" />
                    </div>
                    <div>
                        <p class="text-sm font-medium ml-2">Rass Lavoka</p>
                        <p class="text-xs text-gray-500 ml-2">Conducteur</p>
                    </div>
                    <div class="ml-5" @mouseover="showInfo = true" @mouseleave="showInfo = false">
                    <div class="information"> ℹ</div> 
                        <div class="tooltip" v-if="showInfo">
                            <p>Type de voiture: SUV</p>
                            <p>Nombre de passagers: {{ counter }}</p>
                        </div>
                    </div>
                </div>

                <div class="col-span-6 text-right">
                    <p class="prix">66,6€</p>
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

                <div class="col-span-10 h-4" style="margin-top:-10px">
                    <p class="text-sm font-medium">UFR IM2AG</p>
                    <p class="text-sm font-small">Saint-Martin-d’hères</p>
                </div>
                <div class="col-span-2 relative h-4  items-center">
                    <div class="ml-5 mt-8 hourDown">
                        <p class="text-sm font-medium">20:00</p>
                    </div>
                </div>
                <div class="col-span-10 h-4  mt-8">
                    <p class="text-sm font-medium">Hellfest</p>
                    <p class="text-sm font-small">Clisson Loire Atlantique</p>
                </div>
                <div class="col-span-6 h-4 mt-8 flex justify-between items-center">
                    <p class="text-sm font-medium" v-if="counter>1">Nombre de places disponibles &nbsp;:&nbsp; {{counter}}</p>
                    <p class="text-sm font-medium" v-else>Nombre de place disponible &nbsp;:&nbsp; {{counter}}</p>
                    <form class="max-w-xs ml-4">
                            <div class="relative flex items-center">
                                <div v-on:click="decrementCounter()" type="button" id="decrement-button" data-input-counter-decrement="counter-input">
                                    -
                                </div>
                                <input type="text" id="counter-input" data-input-counter
                                    class="flex-shrink-0 text-gray-900 dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"
                                    placeholder="" value="12" v-model="counter" required>
                                <div v-on:click="incrementCounter()" type="button" id="increment-button" data-input-counter-increment="counter-input">
                                    +
                                </div>
                            </div>
                        </form>
                </div>
                <div class="col-span-6 h-4 mt-8 justify-end">
                    <div class="addToCart" >Ajouter au panier</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import api from '@/api';
export default {
    name: 'CovoiturageView',
    data() {
        return {
            counter: 0,
            typesVehicule: [],
            domaine: '',
            showInfo: true
        }
    },
    methods: {
        incrementCounter() {
            this.counter += 1;
        },
        decrementCounter() {
            if (this.counter != 0)
                this.counter -= 1;
        }
    },
    mounted() {
        api.getDomaines().then((data) => {
            this.typesVehicule = data.data;
        });
    },
}
</script>
<style scoped>
.addToCart{
    border: 1px solid #F1CE53;
    padding: 10px;
    font-size: 14px;
    position: absolute;
    right: 10px;
    bottom: 15px;
    cursor: pointer;
    color: #F1CE53;
}

.addToCart:hover{
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

#increment-button{
    border-radius: 100%;
    background-color: transparent;
    color: #054652 !important;
    border: 2px solid #054652 !important;
    outline: none;
    padding: 0px 5px;

}
#decrement-button{
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
    margin: 0 auto;
    box-sizing: border-box;
    position: absolute;
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