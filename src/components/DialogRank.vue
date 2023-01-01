<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-card class="cardRank">
    <v-card-title class="text-h5 white--text mb-3 rankTop"> RANK </v-card-title>
    <v-card-text>
      <v-data-table
        dark
        :headers="headers"
        :items="items"
        sort-by="rank"
        fixed-header
        hide-default-footer
      >
        // eslint-disable-next-line vue/valid-v-slot
        <template v-slot:item.name="{ item }">
          <v-avatar size="30">
            <img :src="item.avatar" alt="alt" />
          </v-avatar>
          {{ item.name }}
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "DialogRank",
  props: ["items"],
  data() {
    return {
      headers: [
        { value: "rank", text: "순위", align: "center" },
        { value: "name", text: "이름", align: "center", sortable: false },
        { value: "team", text: "소속", align: "center" },
        { value: "record", text: "최고기록", align: "center", sortable: false },
        // { value: "recordSum", text: "누적기록", sortable: false },
        // { value: "recordRepeat", text: "도전횟수", sortable: false },
      ],
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
v-data-table {
  flex-direction: row;
}
.rankTop {
  background-color: #272727;
  border-bottom: 3px solid var(--second-color);
  // background-image: url(../assets/fitness/top-board3.png);
  // background-repeat: no-repeat;
  // background-size: cover;
  // background-position: top;
}
.cardRank {
  overflow: auto;
  background-color: #595959;

  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
</style>
