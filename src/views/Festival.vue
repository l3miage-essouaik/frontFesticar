<template>
    <div>
        <!-- Image floue en arrière-plan -->
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
                <button class="attend-button">J'y vais</button>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: 'FestivalView',
}
</script>
<style>
.bg-image {
    /* Assurez-vous d'avoir une image de fond floue */
    background-size: cover;
    background-position: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    filter: blur(10px);
    /* Ajustez le flou selon vos préférences */
    z-index: -1;
}

.content {
    position: relative;
    z-index: 1;
    text-align: center;
    /* Centrer le contenu */
}

.main-image {
    /* Taille et position de l'image non floue */
    width: 50%;
    /* Ajustez la taille selon vos préférences */
    margin: 0 auto;
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
</style>