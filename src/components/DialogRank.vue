<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-card class="cardRank">
    <!-- 랭크제목줄 -->
    <v-card-title class="text-h5 white--text mb-3 rankTop" style="padding: 5px 12px 0 12px"> 
      RANK <v-spacer></v-spacer>
     <h3 v-if="$store.state.userData"> {{ rank }}th </h3>
      <Avataaars :width="50" :height="50" :avatarOptions="$store.state.userData.options" v-if="$store.state.userData" />
    </v-card-title>
    <!-- 랭크테이블 -->
    <v-card-text>
      <!-- <v-data-table dark :headers="headers" :items="items" sort-by="rank" fixed-header hide-default-footer >
        <template v-slot:item.name="{ item }"> 
          <Avataaars :width="30" :height="30" :avatarOptions="item.options" />
          {{ item.name }}
        </template>
      </v-data-table> -->

      <v-simple-table dark>
        <thead>
          <tr >
            <th class="text-center"  >순위</th>
            <th class="text-center">이름</th>
            <th class="text-center">기록</th>
            <th class="text-center">도전</th>
          </tr>
        </thead>
        <tbody>
          <tr  v-for="(a,i) in items"  :key="i" >
            <td class="text-center">{{ a.rank }}</td> 
            <td class="text-center">
              <Avataaars :width="30" :height="30" :avatarOptions="a.options" />              
              {{ a.name }}</td>
            <td class="text-center">{{ a.record }}</td>
            <td class="text-center">{{ a.recordRepeat }}</td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card-text>
  </v-card>
</template>

<script>
import Avataaars from "vue-avataaars";
export default {
  name: "DialogRank",
  props: ['items','rank',"id"],
  components: {  Avataaars },
  data() {
    return {
      headers: [
        { value: "rank", text: "순위", align: "center" },
        { value: "name", text: "이름", align: "center", sortable: false }, 
        { value: "record", text: "최고기록", align: "center", sortable: false }, 
      ],
    };
  },

  created() {
  },
  destroyed() {
  },
  methods: { 
  },
};
</script>

<style lang="scss" scoped>
v-data-table {
  flex-direction: row;
}
.rankTop {
  background-color: #272727;
  border-bottom: 3px solid var(--second-color);
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
