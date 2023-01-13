<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data () {
    return {
      loaded: false,
      version: '0113'
    }
  },
  created () {
    this.getV()
  },
  methods: {
    async getV () {
      this.$firebase.firestore().collection('version').doc('version').get().then((e) => {
        if (!e.data()) { return }
        const getVersion = e.data().version
        console.log('버전', getVersion)
        this.loaded = true
        if (getVersion !== this.version) {
          this.reload()
        }
      }).catch((e) => { console.log(e) })
    },
    async reload () {
      caches
        .keys().then(c => {
          for (const i of c) {
            caches.delete(i)
          }
        })
        .then(() => {
          location.reload(true)
        })
    }
  }
};
</script>

<style>
/*=============== VARIABLES CSS ===============*/
:root {
  --header-height: 3.5rem;

  /*========== Colors ==========*/
  /*Color mode HSL(hue, saturation, lightness)*/
  --main-color: #d7e357;
  --bar-color: #272727;
  --bg-color: #595959;
  --first-color: #fbc700;
  --second-color: #ccf863;

  /*========== Font and typography ==========*/
  /*.5rem = 8px | 1rem = 16px ...*/
  --body-font: "Poppins", sans-serif;
  --second-font: "Dancing Script", cursive;
  --big-size: 2.5rem;
  --h1-size: 1.5rem;
  --h2-size: 1.25rem;
  --h3-size: 1rem;
  --normal-size: 0.8rem;
  --small-size: 0.813rem;
  --smaller-size: 0.75rem;

  /*========== Font weight ==========*/
  --bold: 500;
  --semi-bold: 600;
  --big-bold: 700;
}

/* Responsive typography */
@media screen and (min-width: 600px) {
  :root {
    --big-size: 3rem;
    --h1-size: 2.25rem;
    --h2-size: 1.5rem;
    --h3-size: 1.25rem;
    --normal-size: 1rem;
    --small-size: 0.875rem;
    --smaller-size: 0.813rem;
  }
}
/*=============== SCROLL BAR ===============*/
::-webkit-scrollbar {
  width: 0.6rem;
  border-radius: 0.5rem;
  background-color: hsl(210, 8%, 15%);
}
::-webkit-scrollbar-thumb {
  background-color: hsl(210, 8%, 45%);
  border-radius: 0.5rem;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #d7e357;
  /* background-color: hsl(210, 8%, 35%); */
}

#app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  height: 100%;
  /* background-image: url("https://x.gd/JfK6U"); */
  /* background-image: url(./assets/bgwhite.png); */
  /* background-repeat: no-repeat;
  background-size: cover; */
  letter-spacing: 0.5px;
  box-sizing: border-box;
  background-color: #959597;
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
.gradient1 {
  background: linear-gradient(
    rgba(2, 126, 251, 1) 0%,
    rgba(0, 3, 255, 1) 100%
      /* rgba(251, 33, 117, 1) 0%,
    rgba(234, 76, 137, 1) 100% */
  );
}
.gradient2 {
  background: linear-gradient(
    rgba(251, 33, 117, 1) 0%,
    rgba(234, 76, 137, 1) 100%
  );
}
.btn {
  padding: 24px 0;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  color: #fff;
  border-radius: 5px;
  font-family: "Lato", sans-serif;
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
  background: var(--main-color);
  color: var(--bar-color);
  overflow: hidden;
}
.btn1:hover {
  background: rgba(255, 255, 0, 0.5);

  background: linear-gradient(
    rgba(255, 255, 0, 0.5) 0%,
    rgba(255, 255, 0, 0.9) 100%
  );
}
.btn1:active {
  box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, 0.3),
    -4px -4px 6px 0 rgba(116, 125, 136, 0.2),
    inset -4px -4px 6px 0 rgba(255, 255, 255, 0.2),
    inset 4px 4px 6px 0 rgba(0, 0, 0, 0.2);
}
@keyframes move {
  100% {
    transform: translate3d(0, 0, 1px) rotate(360deg);
  }
}
</style>
