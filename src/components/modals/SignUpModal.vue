<template>
<div class="signup-modal">
    <div class="signup-content">
        <div class="flex-container">
            <div class="formContainer">
                <div class="signup-header">
                    <h2 class="title">Inscrivez-vous à <span style="color: #F1CE53">Festicar</span></h2>
                    <button class="close-button">×</button>
                </div>
                <h3 class="text-connect">Vous avez déjà un compte ? <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" style="color: #007F5F">Se connecter</a></h3>
                <form>
                    <div class="name-inputs">
                        <div class="input-group">
                            <label for="nom">Nom</label>
                            <input type="text" id="nom" name="nom" placeholder="Entrez votre nom">
                        </div>
                        <div class="input-group">
                            <label for="prenom">Prénom</label>
                            <input type="text" id="prenom" name="prenom" placeholder="Entrez votre prénom">
                        </div>
                    </div>

                    <div class="name-inputs">
                        <div class="input-group">
                            <label for="email">E-mail</label>
                            <input type="email" id="email" name="email" placeholder="Entrez votre email">
                        </div>
                        <div class="input-group">
                            <label for="telephone">Téléphone</label>
                            <input type='tel' id='telephone' name='telephone' pattern="[0-9]{10}" placeholder='06'>
                        </div>
                    </div>
                    <div class="input-group">
                        <label for='password'>Mot de passe</label>
                        <input type='password' id='password' name='password' placeholder="Entrez votre mot de passe">
                    </div>
                </form>
                <div class="buttons-group">
                    <button class="signup-button" @click="submitForm">S'inscrire</button>
                    <button class="facebook-button">Continuer avec Facebook</button>
                </div>
            </div>
            <div class="signup-picture">
                <!-- Add your picture here -->
                <img src="../../assets/chat7a.png" alt="Signup Picture">
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                nom: '',
                prenom: '',
                email: '',
                telephone: '',
                password: '',
            },
        };
    },
    methods: {
        submitForm() {
            // Logic to handle form submission
            console.log(this.user);
        },
    },
};
</script>

<style scoped>
.signup-modal {
    width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.signup-header {
    margin: 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

img {
    width: 370px;
}

.flex-container {
    display: flex;
    justify-content: space-between;
}

.formContainer {
    width: 60%;
}

.title {
    font-family: 'Open Sans semibold';
    font-weight: 600;
    font-size: 1.5rem;
}

.text-connect {
    font-family: 'Arial';
    font-size: 1rem;
    margin-top: -11px;
    margin-bottom: 23px;
}

.signup-header h2 {
    font-size: 1.5rem;
    margin: 0;
}

.close-button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
}

input#password {
    width: 46%;
}

.signup-content form {
    display: flex;
    flex-direction: column;
}

.name-inputs {
    display: flex;
    gap: 20px;
}

.input-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
}

.input-group-item {
    margin-bottom: 10px;
}

.buttons-group {
    display: flex;
    gap: 40px;
}

form {
    display: grid;
    grid-template-columns: auto auto;
    gap: 10px;
}

label,
input {
    margin-bottom: 15px;
}

input[type=text],
input[type=email],
input[type=tel],
input[type=password] {
    padding: 10px;
    margin-top: -10px;
}

.signup-button {
    background-color: #4caf50;
    color: #fff;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 5px;
    height: 55px;
    width: 22%;
}

.facebook-button {
    background-color: #3b5998;
    color: #fff;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 5px;
    height: 55px;
    width: 22%;
}
</style>
