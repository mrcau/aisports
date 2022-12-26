<template>
  <v-container>
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Search"
      single-line
      hide-details
    />
    <div class="homeheader mt-5" style="display: flex; gap: 10px">
      <div
        color="info"
        v-for="(item, i) in items"
        :key="i"
        class="mt-5 card"
        style="min-width: 200px; display: block; padding: 10px"
      >
        <h2>{{ item.title }}</h2>
        <h3>{{ item.content }}</h3>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "HomeView",

  components: {},
  data() {
    return {
      items: [
        {
          id: "12313",
          title: "내가짱",
          content: "내가짱이다.",
          name: "홍길동",
          school: "안산해양중",
          people: 7,
          password: "1233",
          startDate: "2022-10-22",
          endDate: "2022-12-22",
        },
        {
          id: "15533",
          title: "우리짱",
          content: "우리짱이다.",
          name: "이숭동",
          school: "봉담고",
          people: 4,
          password: "1233",
          startDate: "2022-10-12",
          endDate: "2022-12-22",
        },
        {
          id: "125353",
          title: "모두짱",
          content: "모두짱이다.",
          name: "김고동",
          school: "오현초",
          people: 2,
          password: "1233",
          startDate: "2022-10-25",
          endDate: "2022-12-22",
        },
      ],
    };
  },
};
</script>
<style></style>
