<template>
  <div id="Account">
    <section class="myAccount">
    <h2>Votre compte</h2>
    <div>
      <h3>Votre nom d'utilisateur:</h3>
      <p>{{currentUser.username}}</p>
    </div>
    <div>
      <h3>Votre identifiant:</h3>
      <p>{{currentUser.userId}}</p>
    </div>
    <div>
      <h3>Votre adresse mail:</h3>
      <p>{{currentUser.email}}</p>
    </div>
    <div>
      <h3>Votre statut:</h3>
      <p>{{ currentUser.privilege }}</p>
      <ul>
        <li v-for="(role, index) in currentUser.roles" :key="index">{{ role }}</li>
      </ul>
    </div>
    <v-btn color="secondary" @click="confirmDelete">Supprimer mon compte</v-btn>
    </section>
  </div>
</template>

<script>
export default {
  name: "Account",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    confirmDelete() {
      if (window.confirm('Attention ! Cette opération est irreversible. Tous vos messages ainsi que les commentaires associés seront définitivement supprimés !')) {
        this.deleteMyAccount()
      }
    },
    deleteMyAccount() {
      let payload = this.$store.state.auth.user.userId
      this.$store.dispatch("auth/deleteAccount",payload).then(
        data => {
          console.log(data);
          window.alert(data.message)
        },
        error => {
          console.log(error);
        }
      );
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/");
    }
  },
    updated() {
    if (!this.currentUser) {
      this.$router.push("/");
    }
  }
};
</script>