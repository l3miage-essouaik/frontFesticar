<template>
    <div class="signup-modal">
        <div class="signup-content">
            <div class="flex-container">
                <div class="image-container">
                    <img src="../../assets/chat7a.png" alt="Your Image">
                </div>
                <div class="formContainer">
                    <button class="close-button-responsive" style="display: none;" @click="closeSignUpModal">×</button>
                    <button class="close-button" @click="closeSignUpModal">×</button>
                    <div class="signup-header">
                        <h2>Inscrivez vous à <span style="color: #F1CE53">Festicar</span></h2>
                        <p style="color: #858585; font-weight: 600;">Vous avez déjà un compte ?<u
                                style="color: #007F5F; margin-left: 5px; cursor: pointer;" v-on:click="openLoginModal()">Se
                                connecter</u> </p>
                    </div>
                    <form>
                        <div class="name-inputs">
                            <div class="input-group">
                                <label for="nom">Nom</label>
                                <input class="custom-input" type="text" id="nom" name="nom" placeholder="Entrez votre nom"
                                    v-model="user.nom">
                            </div>
                            <div class="input-group">
                                <label for="prenom">Prénom</label>
                                <input class="custom-input" type="text" id="prenom" name="prenom"
                                    placeholder="Entrez votre prénom" v-model="user.prenom">
                            </div>
                        </div>

                        <div class="name-inputs">
                            <div class="input-group">
                                <label for="telephone">Téléphone</label>
                                <input class="custom-input" type='tel' id='telephone' name='telephone' pattern="[0-9]{10}"
                                    placeholder='06' v-model="user.telephone">
                            </div>
                            <div class="input-group">
                                <label for="email">E-mail</label>
                                <input class="custom-input" type="email" id="email" name="email"
                                    placeholder="Entrez votre email" v-model="user.email">
                            </div>
                        </div>
                        <div class="input-group">
                            <label>Mot de passe</label>
                            <input class="custom-input" type='password' id='password' name='password'
                                placeholder="Entrez votre mot de passe" v-model="user.password">
                        </div>
                    </form>
                    <div class="buttons">
                        <button class="button" v-on:click="createUser()">S'inscrire</button>
                        <button class="facebook-button" v-on:click="googleSignIn()">
                            <span style="display: flex; align-items: center;">Continuer avec
                                <FacebookIcon style=" margin-left: 3px;" />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  

<script>
import api from '@/api';
import { authService } from '../../services/authService';


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
        closeSignUpModal() {
            this.$emit('close-SignUpModal');
        },
        openLoginModal() {
            this.$emit('show-LoginModal');
        },
        createUser() {
            api.createUser(this.user).then((data) => {
                console.log(data);
                alert('User created successfully!');

            })
        },
        /* eslint-disable no-undef */
        googleSignIn() {
            authService.signInWithGoogle()
                .then(result => {
                    this.$emit('close-SignUpModal');
                })
                .catch(error => {
                    // Handle sign-in error
                });
        }
        /* eslint-enable no-undef */
    },
};
</script>

<style scoped>
.signup-modal {
    width: 950px;
    height: auto;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.signup-header {
    margin: 3% 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
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

input {
    width: 100%;
}

.signup-content form {
    display: flex;
    flex-direction: column;
}

.name-inputs {
    display: flex;
    gap: 25px;
    width: 100%;
}

.name-inputs> :last-child {
    flex: 1;
    /* Utiliser toute la largeur disponible */
}

.input-group input.custom-input {
    width: 100%;
    padding: 12px;
}

.input-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    margin-top: -9px;
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
}

.button {
    border: 1px solid #4AD3B8 !important;
    background-color: #4AD3B8;
    color: #fff;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
    border-radius: 0px;
    width: 10rem;
    margin-right: 10px;
}

.facebook-button {
    border: 1px solid #4AD3B8 !important;
    color: #4AD3B8;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
    border-radius: 0px;
    width: 10rem;
    margin-right: 10px;
}

.flex-container {
    display: flex;
    justify-content: space-between;
}

.formContainer {
    width: 60%;
}

.image-container {
    margin-top: 60px;
    width: 40%;
    margin-left: 50px;
}

.image-container img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
}

.close-button {
    margin-left: 90%;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
}

.signup-header {
    display: block;
}

.custom-input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 0px;
    margin-bottom: 10px;
    width: 100%;

}

label {
    color: #858585;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.buttons,
form {
    margin-left: 10%;
    margin-top: 0%;
}

@media only screen and (max-width: 800px) {
    .signup-modal {
        width: 100%;
    }

    .signup-header,
    .buttons,
    form {
        margin-left: 0% !important;
        margin-top: 0% !important;
    }

    .input-group,
    .formContainer,
    .buttons {
        margin-left: 5%;
        margin-top: 5%;
    }

    .input-group {
        width: 100%;
    }

    .formContainer {
        width: 100%;
    }

    .buttons {
        flex-direction: column;
    }

    .button,
    .facebook-button {
        width: 100%;
        margin-top: 10px;
        margin-right: 0;
    }

    .close-button-responsive {
        display: block !important;
        margin-left: auto;
        /* Push the close button to the right */

    }

    .image-container {
        display: none;
    }

    input[data-v-15f00ccd] {
        width: 100%;
        margin-top: -20px;
    }
}
</style>
