<template>
  <v-card>
    <v-card-title class="text-h5 grey lighten-2"> RANK </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="items"
        sort-by="rank"
        class="elevation-1"
        dense
      >
        <template v-slot:name="{ item }">
          <v-avatar size="22" class="mr-2"><v-img :src="item.src" /></v-avatar>
          {{ item.name }}
        </template>

        <template v-slot:no-data>
          <v-btn color="primary"> Reset</v-btn>
        </template>
      </v-data-table>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" text> I accept </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "AisportsMainRank",

  data() {
    return {
      items: [
        {
          rank: "1",
          team: "해양중",
          name: "a",
          src: "daum.net",
          record: 23,
          score: 10,
          video: "youtube.com",
        },
        {
          rank: "11",
          team: "오현중",
          name: "b",
          src: "naver.com",
          record: 100,
          score: 10,
          video: "",
        },
      ],

      headers: [
        { text: "순위", value: "rank", align: "center" },
        { text: "이름", value: "name", align: "center", sortable: false },
        { text: "소속", value: "team", align: "center" },
        { text: "최고기록", value: "record", sortable: false },
        { text: "누적기록", value: "recordSum", sortable: false },
        { text: "도전횟수", value: "recordRepeat", sortable: false },
      ],
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped></style>
