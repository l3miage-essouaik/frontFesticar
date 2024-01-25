<template>
    <div>
        <div class="flex flex-col items-center">
            <h2 class="text-4xl font-extrabold dark:text-white title">
                <CartIcon class="icon inline-block" :size="50" color="#054652" />
                Mon Panier
            </h2>
        </div>
        <div class="relative">
            <div class="grid grid-cols-3 gap-4 panier">
                <div class="col-span-3 grid grid-cols-2 h-4 bg-400">
                    <div class="col-span-1 flex items-center">
                        <div class="ml-2">
                            <img src="../assets/ragragui.png" alt="Your Image"
                                class="w-10 h-10 object-cover rounded-full" />
                        </div>
                        <div>
                            <p class="text-sm font-medium ml-2">Rass Lavoka</p>
                            <p class="text-xs text-gray-500 ml-2">Conducteur</p>
                        </div>
                    </div>

                    <div class="col-span-1 text-right">
                        <p style="font-weight: 700;">66,6€</p>
                    </div>
                </div>
                <!-- ici -->
                <div class="col-span-1 relative h-4 bg-teal-400 flex items-center">
                    <div class="ml-2">
                        <p class="text-sm font-medium">16:30</p>
                        <p class="text-sm font-small">6h30</p>
                    </div>
                    <div class="circle"></div>
                </div>
                <div class="col-span-2 h-4 bg-teal-400"></div>
                <div class="col-span-3 h-4 bg-teal-400"></div>

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
    height: 265px;
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
.circle {
    width: 18px;
    height: 18px;
    background-color: white; /* Set the color you want for the circle */
    border-radius: 50%;
    border: 3px solid #054652 ;
    position: absolute;
    right: 8px; /* Adjust the distance from the right */
  }
.title {
    color: #054652;
    font-size: 30px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
}

@media (max-width: 525px) {
    .title {
        font-size: 23px !important;
    }
}
</style>
  