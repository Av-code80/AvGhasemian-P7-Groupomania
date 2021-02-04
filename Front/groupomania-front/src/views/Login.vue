<template>
  <div id="Login">
    <h2>{{ title }}</h2>

    <v-form class="form form--login" v-model="valid">
      <v-container>
        <v-text-field
          v-model="user.username"
          label="Nom d'utilisateur"
          required
          :rules="usernameRules"
        ></v-text-field>
        <v-text-field
          type="password"
          v-model="user.password"
          label="Mot de passe"
          required
          :rules="passwordRules"
        ></v-text-field>
        <div class="messageService" v-if="feedbacks.length">
          <ul>
            <v-alert
            close-delay="2000"
              type="error"
              dismissible
              v-for="feedback in feedbacks"
              :key="feedback.message"
            >{{ feedback.message }}</v-alert>
          </ul>
        </div>
        <div class="formPanel">
          <v-btn :disabled="!valid" color="primary" @click="loginMe">Valider</v-btn>
          <router-link :to="{ name: 'Home' }">
            <v-btn color="secondary">Retour</v-btn>
          </router-link>
        </div>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import User from "../models/user";

export default {
  name: "Login",
  data() {
    return {
      title: "Se connecter à mon compte",
      user: new User("", ""),
      feedbacks: [], // Nous permets d'afficher les informations suite à la soumission du formulaire, contient des objets au format {message : 'contenu du message'},il n'apparait que si non vide
      show: true,
      valid: false,
      usernameRules: [v => !!v || "Indiquez votre nom d'utilisateur"],
      passwordRules: [v => !!v || "Indiquez votre mot de passe"]
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedin;
    }
  },
  created() {
    if (this.loggedin) {
      this.$router.push("/wall");
    }
  },
  methods: {
    loginMe() {
      this.$store.dispatch("auth/login", this.user).then(
        () => {
          this.$router.push("/wall");
        },
        error => {
          this.feedbacks.push(error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    }
  }
};
</script>