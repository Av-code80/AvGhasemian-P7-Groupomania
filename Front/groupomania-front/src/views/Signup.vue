<template>
  <div id="Signup">
    <h2>{{ title }}</h2>

    <v-form v-model="valid" v-if="showForm" ref="form" class="form form--signup">
      <v-container>
        <v-text-field type="email" v-model="user.email" label="E-mail" required :rules="emailRules"></v-text-field>
        <aside>
          <p>L'adresse mail doit être celle de votre mail interne</p>
        </aside>
        <v-text-field
          v-model="user.username"
          label="Nom d'utilisateur"
          required
          :rules="usernameRules"
        ></v-text-field>
        <aside>
          <p>
            Le choix du nom d'utilisateur est libre, il doit néanmoins répondre aux exigences de
            <router-link :to="{ name: 'About' }">la charte d'utilisation du service</router-link> et ne pas dépasser 20 caractères
          </p>
        </aside>
        <v-text-field
          type="password"
          v-model="user.password"
          label="Mot de passe"
          required
          :rules="passwordRules"
        ></v-text-field>
        <aside class="passwordConditions" v-if="showForm">
          Pour des raisons de sécurité votre mot de passe doit contenir au moins:
          <br />
          <ul>
            <li>entre 8 à 15 caractères</li>
            <li>une lettre minuscule</li>
            <li>une lettre majuscule</li>
            <li>un chiffre</li>
            <li>un de ces caractères spéciaux: $ @ % * + - _ !</li>
          </ul>
        </aside>

        <div class="formPanel">
          <v-btn :disabled="!valid" color="primary" @click="registerMe">Valider</v-btn>
          <router-link :to="{ name: 'Home' }">
            <v-btn color="secondary">Retour</v-btn>
          </router-link>
        </div>

      </v-container>
    </v-form>

    <div class="messageService" v-if="feedbacks.length">
      <ul>
        <p v-for="(feedback, index) in feedbacks" :key="index">
          {{ feedback.message }}
          <router-link v-if="successful" :to="{ name: 'Login' }">Se connecter</router-link>
          <v-btn v-if="!successful" @click="retryRegister">Recommencer</v-btn>
        </p>
      </ul>
    </div>
  </div>
</template>

<script>
import User from "../models/user";

export default {
  name: "Signup",
  data() {
    return {
      title: "Créer un compte",
      user: new User("", "", ""),
      feedbacks: [], // Nous permets d'afficher les informations suite à la soumission du formulaire, contient des objets au format {message : 'contenu du message'},il n'apparait que si non vide
      showForm: true, // Le formulaire doit il être affiché
      successful: false,
      valid: false,
      emailRules: [
        v => !!v || "Un e-mail est obligatoire",
        v => /.+@+groupomania.com/.test(v) || "Indiquez un e-mail valide"
      ],
      usernameRules: [
        v => !!v || "Indiquez votre nom d'utilisateur",
        v =>
          v.length <= 20 ||
          "Le nom d'utilisateur ne doit pas dépasser 20 caractères"
      ],
      passwordRules: [
        v => !!v || "Un mot de passe est obligatoire",
        v =>
          (v && v.length >= 8 && v.length <= 15) ||
          "Le mot de passe doit posséder entre 8 et 15 caractères",
        v =>
          /(?=.*[A-Z])/.test(v) ||
          "Le mot de passe doit posséder au moins une lettre majuscule",
        v =>
          /(?=.*\d)/.test(v) ||
          "Le mot de passe doit posséder au moins un chiffre",
        v => /([-+!*$@%_])/.test(v) || "Must have one special character [!@#$%]"
      ]
    };
  },
  methods: {
    registerMe() {
      this.$store.dispatch("auth/register", this.user).then(
        data => {
          console.log(data.message);
          this.showForm = false;
          this.successful = true;
          this.feedbacks.push(data.message);
          window.alert(data.message);
        },
        error => {
          console.log(error.response);
          this.showForm = false;
          if (error.response.data.indexOf("users.email_UNIQUE") !== -1) {
            this.feedbacks.push({
              message: "Cet email est déjà utilisé !"
            });
            this.feedbacks.route = "signup";
          }
          if (error.response.data.indexOf("users.username_UNIQUE") !== -1) {
            this.feedbacks.push({
              message: "Ce nom d'utilisateur est déjà utilisé !"
            });
          }
        }
      );
    },
    retryRegister() {
      this.showForm = true
      this.feedbacks = []
    }
  }
};
</script>