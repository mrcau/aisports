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
      <v-data-table dark :headers="headers" :items="items" sort-by="rank" fixed-header hide-default-footer >
        <template v-slot:item.name="{ item }"> 
          <Avataaars :width="30" :height="30" :avatarOptions="item.options" />
          {{ item.name }}
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import Avataaars from "vue-avataaars";
export default {
  name: "DialogRank",
  props: ["id"],
  components: {  Avataaars },
  data() {
    return {
      uid:this.$store.state.userData?this.$store.state.userData.uid:'',
      items: [],
      unsub: "",
      rank:'',
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

  created() {
    this.getData();
  },
  destroyed() {
    if (this.unsub) this.unsub();
  },
  methods: {
    getData() {
      if (!this.id) {
        return;
      }
      this.unsub = this.$firebase.firestore().collection("workout").doc(this.id)
        .collection("rank").orderBy("record", "desc")
        .onSnapshot((sn) => {
          const items = sn.docs.map((e) => e.data());
          const items2 = [];
          items.forEach((e) => {
            const rank = items.indexOf(e) + 1;
            items2.push({ ...e, rank: rank });
          });
          this.items = items2;
          const item = items2.filter((e)=>e.uid === this.uid)
          this.rank = item[0]? item[0].rank:''
        });
    }, 
    // this.$firebase.firestore().collection("workout").doc(this.id)
    // .collection("rank").doc(this.uid).set(data).then(() => {
    //     }).catch((e) => { console.log(e); });
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
