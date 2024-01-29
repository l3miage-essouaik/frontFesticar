<template>
    <div>
        <div class="flex flex-col items-center">
            <h2 class="text-4xl font-extrabold dark:text-white title">
                <CartIcon class="icon inline-block" :size="50" color="#054652" />
                Mon Panier
            </h2>
        </div>
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
                <div class="col-span-9 h-4  mt-8 flex justify-between items-center">
                    <p class="text-sm font-medium" v-if="counter>1">Nombre de passagers</p>
                    <p class="text-sm font-medium" v-else>Nombre de passager</p>

                    <div class="max-w-xs relative flex items-center">
                        <form class="max-w-xs ml-4">
                            <div class="relative flex items-center">
                                <button v-on:click="decrementCounter()" type="button" id="decrement-button" data-input-counter-decrement="counter-input"
                                    class="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                    <svg class="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                        <path stroke="#054652" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" d="M1 1h16" />
                                    </svg>
                                </button>
                                <input type="text" id="counter-input" data-input-counter
                                    class="flex-shrink-0 text-gray-900 dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"
                                    placeholder="" value="12" v-model="counter" required>
                                <button v-on:click="incrementCounter()" type="button" id="increment-button" data-input-counter-increment="counter-input"
                                    class="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                    <svg class="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                        <path stroke="#054652" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" d="M9 1v16M1 9h16" />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="col-span-3 h-4  mt-8 flex justify-end">
                    <p class="text-sm font-medium" style="margin-top: -7px;">
                        <TrashIcon :size="30" color="#054652" />
                    </p>
                </div>

            </div>
        </div>
    </div>
</template>
  
<script>
import CartIcon from '../components/Icons/CartIcon.vue'

export default {
    name: 'PanierView',
    data() {
        return {
            counter : 0
        }
    },
    methods: {
        incrementCounter(){
            this.counter += 1;
        },
        decrementCounter(){
            if(this.counter!=0)
            this.counter -=1;
        }
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
}</style>
  