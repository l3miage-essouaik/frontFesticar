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
                <div class="col-span-2 relative h-4 bg-teal-400 flex items-center">
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

                <div class="col-span-10 h-4 bg-teal-400" style="margin-top:-10px">
                    <p class="text-sm font-medium">UFR IM2AG</p>
                    <p class="text-sm font-small">Saint-Martin-d’hères</p>
                </div>
                <div class="col-span-2 relative h-4 bg-teal-400 items-center">
                    <div class="ml-5 mt-8 hourDown">
                        <p class="text-sm font-medium">20:00</p>
                        <p class="text-sm font-small">3h30</p>
                    </div>
                </div>
                <div class="col-span-10 h-4 bg-teal-400 mt-8">
                    <p class="text-sm font-medium">Hellfest</p>
                    <p class="text-sm font-small">Clisson Loire Atlantique</p>
                </div>
                    <div class="col-span-10 h-4 bg-teal-400 mt-8">
                        <p class="text-sm font-medium">Nombre de passager</p>
                    </div>
                    <div class="col-span-2 h-4 bg-teal-400 mt-8">
                        <p class="text-sm font-medium">zbell</p>
                    </div>
                
            </div>
        </div>
    </div>
</template>
  
<script>
import CartIcon from '../components/Icons/CartIcon.vue'

export default {
    name: 'PanierView',
};
</script>
  
<style>
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
    top: 50%;
    transform: translateY(-50%);
}

.hourDown {
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
  