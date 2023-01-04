<template>
  <div class="jumboBox">
    <div class="rounded-lg d-flex jumbo white--text">
      <div class="pa-5" style="flex: 2">
        <h1 class="font-italic" style="font-size: 3rem">{{ title }}</h1>
        <p>{{ content }}</p>
      </div>
      <div class="jumboRight" style="flex: 1"></div>
      <img class="jumboRight people" src="@/assets/fitness/people.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "AisportsMainJumbo",

  data() {
    return {
      bgImg: "https://x.gd/AxUyA",
      title: "AI-GYM",
      content: "Welcome AIGYM!!",
    };
  },

  mounted() {},

  methods: {},
};
</script>
<style>
@media (max-width: 600px) {
  .jumboRight {
    display: none;
  }
}
.jumbo {
  position: relative;
  background-position: center;
  background-size: cover;
  background-image: url("@/assets/fitness/jumboBg.png");
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.4);
}
.jumbo .people {
  position: absolute;
  right: 10px;
  bottom: 10px;
  width: 250px;
}
</style>
