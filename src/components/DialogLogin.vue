<template>
  <v-card class="cardRank font-italic">
    <v-form ref="form" lazy-validation>
      <v-card-title class="text-h5 white--text rankTop">
        <h4>{{ login ? "AiGym 로그인" : "Ai-Gym 회원가입" }}</h4>
      </v-card-title>
      <!-- 로그인홈 -->
      <div class="pa-5" v-if="!email">
        <v-btn block color="var(--second-color)" rounded @click="googleLogin"
          ><h2><v-icon>mdi-google</v-icon> Google</h2></v-btn
        >
        <v-btn
          rounded
          block
          class="mt-5"
          color="var(--second-color)"
          @click="email = true"
          ><h2><v-icon>mdi-email-outline</v-icon> email</h2></v-btn
        >
      </div>
      <!-- 뒤로가기 -->
      <div class="text-left" v-else>
        <v-btn
          text
          dark
          class="mt-3"
          @click="
            email = false;
            signup = false;
          "
          ><v-icon>mdi-chevron-left</v-icon>
          <h3>back</h3></v-btn
        >
      </div>
      <v-card-text class="pa-3" v-if="login && email && !signup">
        <!-- 이메일로그인 -->

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
            style="padding: 0; margin: 0; font-style: normal"
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
            style="padding: 0; margin: 0; font-style: normal"
          ></v-text-field>
          <div class="d-flex pb-3">
            <v-btn color="var(--main-color)" style="padding: 0" text>
              Forgot password?</v-btn
            >
            <v-spacer></v-spacer>
          </div>
        </div>
        <div class="d-flex">
          <v-spacer></v-spacer>
          <v-btn
            color="var(--main-color)"
            text
            style="padding: 0"
            @click="signup = true"
            >Sign up</v-btn
          >
        </div>
      </v-card-text>
      <v-card-text class="pa-3" v-if="email && signup">
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
            style="font-style: normal"
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
            style="font-style: normal"
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
            style="font-style: normal"
          ></v-text-field>
          <v-text-field
            v-model="saveTeam"
            label="Team"
            dark
            filled
            outlined
            dense
            color="var(--main-color)"
            style="font-style: normal"
          ></v-text-field>
          <div>
            <v-checkbox
              label="운영정책에 동의합니다."
              dark
              v-model="checkbox"
              :rules="[(v) => !!v || '필수체크란']"
              required
              style="margin: 0"
            ></v-checkbox>
          </div>
        </div>
        <div class="d-flex">
          <v-spacer></v-spacer>
          <v-btn
            color="var(--main-color)"
            text
            style="padding: 0"
            @click="signup = false"
            >Sign in</v-btn
          >
        </div>
      </v-card-text>

      <v-card-actions v-if="email">
        <v-btn
          rounded
          class="mb-2"
          block
          color="var(--second-color)"
          @click="emailLogin"
          :loading="loading"
          v-if="!signup"
        >
          <h2>Sign in</h2>
        </v-btn>
        <v-btn
          rounded
          class="mb-2"
          block
          color="var(--second-color)"
          @click="save"
          :loading="loading"
          v-else
        >
          <h2>Sign up</h2>
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
      today: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substring(0, 10),
      login: true,
      signup: false,
      email: false,
      uid: "",
      loading: false,
      avatarSrc: "",
      checkbox: false,
      saveName: "",
      savePass: "",
      saveEmail: "",
      saveTeam: "",
      ranNum: Math.floor(Math.random() * 101),
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
    avatarCreate() {
      const generator = new AvatarGenerator();
      this.avatarSrc = generator.generateRandomAvatar();
    },
    emailLogin() {
      this.loading = true;
      this.$firebase
        .auth()
        .signInWithEmailAndPassword(this.saveEmail, this.savePass)
        .then((result) => {
          console.log(result);
          this.loading = false;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async googleLogin() {
      const provider = new this.$firebase.auth.GoogleAuthProvider();
      this.$firebase.auth().languageCode = "ko";

      try {
        await this.$firebase
          .auth()
          .signInWithPopup(provider)
          .then((e) => {
            this.$firebase
              .firestore()
              .collection("user")
              .get()
              .then((users) => {
                const userId = users.docs.map((a) => {
                  return a.id;
                });
                console.log(userId.includes(e.user.uid));
                if (userId.includes(e.user.uid)) {
                  return;
                }
                const userData = {
                  uid: e.user.uid || "",
                  name: e.user.displayName || "",
                  email: e.user.email || "",
                  avatar: e.user.photoURL || "",
                  since: this.today,
                  point: 1000,
                  Level: 1,
                  ability: [],
                  badge: [],
                  team: "",
                  sex: "남",
                  age: 10,
                  pw: "",
                };
                this.$firebase
                  .firestore()
                  .collection("user")
                  .doc(e.user.uid)
                  .set(userData)
                  .then(() => {
                    this.loading = false;
                  });
              });
          });
      } catch {
        console.log("stop!");
      } finally {
        this.loading = false;
        // this.userSave()
      }
    },
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
