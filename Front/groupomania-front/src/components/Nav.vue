<template>
  <nav id="navbar">
    <transition name="slide">
      <div class="menu" v-show="show">
        <button class="menu__close" @click="show = !show">
          <i class="fas fa-times"></i>
        </button>

        <ul class="menu__list">
          <template v-for="item in navItems">
            <li
              v-if="!item.needAuth || (item.needAuth && $store.state.auth.status.loggedIn)"
              @click="show = !show"
              :key="item.id"
            >
              <router-link class="menu__list__link" :to="{ name: item.name }">
                <v-btn rounded text class="menu__list__btn">
                  <v-icon class="menu__list__ico" color="grey">mdi-{{item.icon}}</v-icon>
                  <div class="menu__list__text" >{{ item.text }}</div>
                </v-btn>
              </router-link>
            </li>
          </template>
           
          <li class="menu__control" v-show="this.$store.state.auth.status.loggedIn === true">

            <div class="menu__control__logout">

            <v-icon>mdi-power</v-icon>
           <button @click="logOut(); show =! show">Se deconnecter</button>

           </div>
           
          </li>
        </ul>
      </div>
    </transition>

    <div class="menu__btn" @click="show = !show">
      <button class="open">
        <i class="fas fa-bars"></i>
        <span
          v-if="this.$store.state.auth.status.loggedIn === true"
        >{{this.$store.state.auth.user.username}}</span>
        <span v-else>Menu</span>
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Nav",
  data: function() {
    return {
      show: false,
      navItems: [
        { id: 1, text: "Accueil", name: "Home", icon: "message" },
        {
          id: 2,
          text: "Votre compte",
          name: "Account",
          icon: "account",
          needAuth: true
        },
        { id: 3, text: "A propos", name: "About", icon: "information" }
      ],
      activeClass: "active"
    };
  },
  props: {
    scroll: Number,
    appbarRect: {}
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/");
      console.log("logOut");
    }
  },
  watch: {
    appbarRect: function(newVal, oldVal) {
      console.log("changed", newVal, oldVal);
      this.appbarRect;
    }
  },
  mounted() {
    console.log(this.appbarRect);
  }
};
</script>
