<template>
  <v-app>
    <MainHeader />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import MainHeader from "../src/components/MainHeader.vue";

export default {
  name: "App",
  components: {
    MainHeader,
  },
  data: () => ({
    //
  }),
};
</script>

<style>
/*=============== VARIABLES CSS ===============*/
:root {
  --header-height: 3.5rem;

  /*========== Colors ==========*/
  /*Color mode HSL(hue, saturation, lightness)*/
  --main-color: #ff328e;
  --btn-color: #fff;
  --first-color: #fbc700;
  --second-color: hsl(210, 80%, 50%);

  /*========== Font and typography ==========*/
  /*.5rem = 8px | 1rem = 16px ...*/
  --body-font: "Poppins", sans-serif;
  --second-font: "Dancing Script", cursive;
  --big-size: 2.5rem;
  --h1-size: 1.5rem;
  --h2-size: 1.25rem;
  --h3-size: 1rem;
  --normal-size: 0.938rem;
  --small-size: 0.813rem;
  --smaller-size: 0.75rem;

  /*========== Font weight ==========*/
  --bold: 500;
  --semi-bold: 600;
  --big-bold: 700;
}

/* Responsive typography */
@media screen and (min-width: 1024px) {
  :root {
    --biggest-size: 5rem;
    --h1-size: 2.25rem;
    --h2-size: 1.5rem;
    --h3-size: 1.25rem;
    --normal-size: 1rem;
    --small-size: 0.875rem;
    --smaller-size: 0.813rem;
  }
}

#app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  background-image: url(./assets/bgwhite.png);
  background-repeat: no-repeat;
  background-size: cover;
  letter-spacing: 0.5px;
  box-sizing: border-box;
}
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
.card {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  backdrop-filter: blur(5px);
  box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 2px solid rgba(255, 255, 255, 0.2);
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
}
.btn {
  width: 130px;
  height: 40px;
  text-align: center;
  color: #fff;
  border-radius: 5px;
  font-family: "Lato", sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
    7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  outline: none;
}

.btn1 {
  border: none;
  background: linear-gradient(
    rgba(2, 126, 251, 1) 0%,
    rgba(0, 3, 255, 1) 100%
      /* rgba(251, 33, 117, 1) 0%,
    rgba(234, 76, 137, 1) 100% */
  );
  color: #fff;
  overflow: hidden;
}
.btn1:hover {
  background: linear-gradient(rgba(2, 126, 251, 1) 0%, rgba(0, 3, 255, 1) 100%);
}
.btn1:active {
  box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, 0.3),
    -4px -4px 6px 0 rgba(116, 125, 136, 0.2),
    inset -4px -4px 6px 0 rgba(255, 255, 255, 0.2),
    inset 4px 4px 6px 0 rgba(0, 0, 0, 0.2);
}
</style>
