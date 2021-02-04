<template>
  <v-app>
    <div id="app">
      <v-app-bar color="primary" class="appBar" id="scroll-target" v-scroll="onScroll" ref="appbar">
        <img
          class="logo"
          alt="Groupomania logo"
          src="./assets/Groupomania_Logos/icon-left-font-monochrome-white.svg"
        />
        <v-row justify="end" align="center">
          <span v-if="isLoggedIn" class="appBar__username">{{ username }}</span>
          <v-avatar v-if="isLoggedIn" class="appBar__avatar" color="success" size="46">{{ avatar }}</v-avatar>
        </v-row>
      </v-app-bar>

      <Nav :scroll="offsetTop" :appbarRect="appbarRect"></Nav>

      <div class="main">
        <UpPage title="Bienvenue dans votre Espace Groupomania"></UpPage>
        <router-view />
      </div>
    </div>
  </v-app>
</template>

<script>
import Nav from "./components/Nav.vue";
import UpPage from "./components/UpPage.vue";
export default {
  components: {
    Nav,
    UpPage
  },
  data: () => ({
    offsetTop: 0,
    appbarRect: {}
  }),
  computed: {
    isLoggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    username() {
      return this.$store.state.auth.user.username;
    },
    avatar() {
      return this.$store.state.auth.user.username.charAt(0).toUpperCase();
    }
  },
  methods: {
    onScroll() {
      this.offsetTop++;
    }
  },
  mounted() {
    const constraint = this.$refs.appbar.$el;
    const rect = constraint.getBoundingClientRect();
    this.appbarRect = rect;
    console.log(this.appbarRect);
  }
};
</script>

<style lang="scss">
@import "./sass/main";
</style>

