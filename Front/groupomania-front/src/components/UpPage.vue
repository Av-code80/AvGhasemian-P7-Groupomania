<template>
  <div class="upPage">
    <img class="logo" alt="Groupomania logo" src="../assets/Groupomania_Logos/icon.svg" />
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: "UpPage",
  props: {
    title: {
      type: String,
      default: 'Hello !'
    }
  }
};
</script>

        