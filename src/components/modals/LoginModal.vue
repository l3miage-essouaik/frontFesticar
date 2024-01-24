<template>
  <div class="signup-modal">
    <div class="signup-content">
      <div class="flex-container">
        <div class="formContainer">
          <button class="close-button-responsive" style="display: none;">×</button>

          <div class="signup-header">
            <h2>Bonjour !</h2>
            <p style="color: #858585;font-weight: 600;">Vous n'avez pas de compte ?<u
                style="color: #F1CE53; margin-left: 5px;">Inscrivez vous!</u> </p>
          </div>
          <form>
            <label for='password'>E-mail</label>
            <input class="custom-input" type='password' id='password' name='password' placeholder="Entrez votre email">
            <label for='password'>Mot de passe</label>
            <input class="custom-input" type='password' id='password' name='password'
              placeholder="Entrez votre mot de passe">
          </form>
          <div class="buttons">
            <button class="button">Connexion</button>
            <button class="facebook-button">Continuer avec
              <FacebookIcon style="margin-bottom: -7px;" />
            </button>
          </div>

        </div>
        <div class="image-container">
          <button class="close-button" @click="closeModal">×</button>
          <img src="../../assets/festival.jpg" alt="Your Image">
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import FacebookIcon from "../Icons/FacebookIcon.vue";
export default {
  props: {
    showLogin: {
      type: Boolean,
    },
  },
  name: "LoginModal",
  created() {
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
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
  width: 50%;
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

.signup-button {
  background-color: #4caf50;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
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
  width: 40%;
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
  /* Vos styles personnalisés pour les inputs ici */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 0px;
  margin-bottom: 10px;
}

input#password[data-v-15f00ccd] {
  width: 80.5%;
  margin-top: -20px;
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
  margin-top: 6%;
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
.close-button-responsive{
  display: block !important;
  margin-left: auto; /* Push the close button to the right */

}
  .image-container {
    display: none;
  }

  input#password[data-v-15f00ccd] {
    width: 100%;
    margin-top: -20px;
  }
}</style>