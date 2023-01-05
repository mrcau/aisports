<template>
  <v-card class="cardRank">
    <v-form ref="form" lazy-validation>
      <v-card-title class="text-h5 white--text rankTop">
        <h1>LOGIN</h1>
      </v-card-title>
      <v-card-text class="pa-3" v-if="login">
        <div class="px-5 pt-5 rounded" style="background: var(--bar-color)">
          <v-text-field
            v-model="saveEmail"
            label="Email"
            :rules="emailRules"
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
            label="Password"
            :rules="Rules"
            required
            dark
            filled
            outlined
            dense
            color="var(--main-color)"
            style="padding: 0; margin: 0"
          ></v-text-field>
        </div>
      </v-card-text>
      <v-card-text class="pa-3" v-else>
        <div class="px-5 py-5 rounded" style="background: var(--bar-color)">
          <v-text-field
            v-model="saveEmail"
            label="Email"
            :rules="emailRules"
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
            label="Password"
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
            label="Name"
            :rules="nameRules"
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
            label="Team"
            dark
            filled
            outlined
            dense
            color="var(--main-color)"
            style="padding: 0; margin: 0"
          ></v-text-field>
          <v-checkbox
            dark
            class="ml-3"
            v-model="checkbox"
            :rules="[(v) => !!v || '필수체크란']"
            label="기록저장 / 회원가입에 동의합니다."
            required
          ></v-checkbox>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-btn class="mb-2" block color="var(--second-color)" @click="save">
          <h2>SAVE</h2>
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import { AvatarGenerator } from "random-avatar-generator";

export default {
  name: "DialogLogin",
  // props: ["score", "id"],
  data() {
    return {
      login: true,
      uid: "",
      saveName: "",
      savePass: "",
      saveEmail: "",
      saveTeam: "",
      checkbox: false,
      Rules: [(v) => !!v || "필수입력란"],
      nameRules: [
        (v) => !!v || "필수입력란",
        (v) => v.length <= 10 || "10자내로 입력",
      ],
      emailRules: [
        (v) => !!v || "필수입력란",
        (v) => /.+@.+/.test(v) || "E-mail 형식",
      ],
    };
  },

  mounted() {},

  methods: {
    // avatarCreate() {
    //   const generator = new AvatarGenerator();
    //   this.avatarSrc = generator.generateRandomAvatar();
    // },
    save() {
      const valid = this.$refs.form.validate();
      if (!valid) {
        return;
      }

      const id = Date.now().toString();
      const date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substring(0, 10);

      const generator = new AvatarGenerator();
      const avatarSrc = generator.generateRandomAvatar();
      const data = {
        id: id,
        date: date,
        avatar: avatarSrc,
        name: this.saveName,
        email: this.saveEmail,
        team: this.saveTeam,
        // record: this.score,
      };
      console.log(data);
      // this.$firebase
      //   .firestore()
      //   .collection("workout")
      //   .doc(this.id)
      //   .collection("rank")
      //   .doc(id)
      //   .set(data)
      //   .then(() => {
      //     this.saveOn = false;
      //   })
      //   .catch((e) => {
      //     console.log(e);
      //   })
      //   .finally(() => {
      //     this.$emit("close");
      //   });
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
