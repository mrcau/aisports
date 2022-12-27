<template>
  <div class="jumboBox pa-5">
    <div
      class="rounded-lg d-flex white--text mt-5 pa-10"
      style="
        background-color: #0052cc;
        background-position: right bottom;
        background-size: contain;
        background-image: url('https://x.gd/AxUyA');
      "
    >
      <div style="flex: 1">
        <h1 class="font-italic">{{ title }}</h1>
        <p>{{ content }}</p>
      </div>
      <div style="flex: 1"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AisportsMainJumbo",

  data() {
    return {
      bgImg: "https://x.gd/AxUyA",
      title: "Welcome AIGYM!!",
      content: "lorem titletitletitletitletitle",
    };
  },

  mounted() {},

  methods: {},
};
</script>
