<template>
  <div>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="../assets/logo.png"
          transition="scale-transition"
          width="40"
        />
      </div>
      <v-spacer />
      <div class="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/avatar">avatar</router-link>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "main-header",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style scoped>
a {
  font-weight: bold;
  color: white;
  text-decoration: none;
  transition: 0.5s;
}
a:hover {
  color: #fbc700;
}

a.router-link-exact-active {
  color: #fbc700;
}
</style>
