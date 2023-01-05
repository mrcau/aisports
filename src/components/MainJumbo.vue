<template>
  <div class="jumboBox">
    <div class="rounded-lg d-flex jumbo white--text">
      <div class="pa-5" style="flex: 2; z-index: 2">
        <h1 class="font-italic" style="font-size: 3rem; z-index: 2">
          {{ title }}
        </h1>
        <p>{{ content }}</p>
      </div>
      <!-- <div class="jumboRight" style="flex: 1"></div> -->
      <img class="jumboRight people" :src="bgImg" style="z-index: 1" />
    </div>
  </div>
</template>

<script>
export default {
  name: "AisportsMainJumbo",

  data() {
    return {
      bgImg: require("@/assets/fitness/people.png"),
      title: "Ai-GYM",
      content: "체력 향상을 위한 Ai 운동 프로그램",
    };
  },

  mounted() {},

  methods: {},
};
</script>
<style>
@media (max-width: 500px) {
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
