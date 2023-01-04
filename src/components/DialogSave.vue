<template>
  <v-card class="cardRank">
    <v-card-title dark> SAVE RECORD </v-card-title>
    <v-divider></v-divider>
    <h1 style="font-size: 80px; color: white">{{ score }}</h1>
    <v-card-text>
      <v-text-field
        v-model="saveEmail"
        label="이메일"
        :rules="Rules"
        required
        dark
        filled
        outlined
        dense
        color="var(--main-color)"
        style="padding: 0; margin: 0"
      ></v-text-field>
      <v-text-field
        v-model="savePass"
        label="비밀번호"
        :rules="Rules"
        required
        dark
        filled
        outlined
        dense
        color="var(--main-color)"
        style="padding: 0; margin: 0"
      ></v-text-field>
      <v-text-field
        v-model="saveName"
        label="이름"
        :rules="Rules"
        required
        dark
        filled
        outlined
        dense
        color="var(--main-color)"
        style="padding: 0; margin: 0"
      ></v-text-field>
      <v-text-field
        v-model="saveTeam"
        label="소속"
        :rules="Rules"
        required
        dark
        filled
        outlined
        dense
        color="var(--main-color)"
        style="padding: 0; margin: 0"
      ></v-text-field>
    </v-card-text>
    <v-card-actions style="margin: -20px 0 0 0">
      <v-btn class="mb-2" block color="var(--main-color)" @click="save">
        <h2 style="color: var(--bar-color)">
          {{ uid ? "저장" : "회원가입 & 기록저장" }}
        </h2>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "DialogRank",
  props: ["score"],
  data() {
    return {
      uid: "",
      saveName: "",
      savePass: "",
      saveEmail: "",
      saveTeam: "",
      Rules: [(v) => !!v || "필수입력란"],
    };
  },

  mounted() {},

  methods: {
    save() {
      const id = Date.now().toString();
      const date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substring(0, 10);
      const data = {
        id: id,
        date: date,
        avatar:
          "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light",
        name: this.saveName,
        email: this.saveEmail,
        team: this.saveTeam,
        record: this.score,
      };
      this.$firebase
        .firestore()
        .collection("workout")
        .doc(this.id)
        .collection("rank")
        .doc(id)
        .set(data)
        .then(() => {
          console.log("save finished");
          this.saveOn = false;
        })
        .catch((e) => {
          console.log(e);
        });
    },
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
