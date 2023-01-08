<template>
  <v-card class="cardRank font-italic">
    <v-form ref="form" lazy-validation>
      <v-card-title class="text-h5 white--text rankTop">
        <h4>{{ score>=0 ? "Login to save your records" : "Login" }} </h4>
      </v-card-title>
      <!-- 로그인홈 -->
      <div class="pa-5" v-if="!email">
        <v-btn block color="var(--main-color)" rounded @click="googleLogin" >
          <h2><v-icon>mdi-google</v-icon> Google</h2>
        </v-btn>
        <v-btn rounded block class="mt-5" color="var(--main-color)" @click="email = true" >
          <h2><v-icon>mdi-email-outline</v-icon> email</h2>
        </v-btn>
      </div>
      <!-- 뒤로가기 -->
      <div class="text-left" v-else>
        <v-btn text dark class="mt-3" @click=" email = false; signup = false; " ><v-icon>mdi-chevron-left</v-icon>
        <h3>back</h3></v-btn >
      </div>
      <v-card-text class="pa-3" v-if="login && email && !signup">
        <!-- 이메일로그인 -->
        <div class="px-5 pt-5 rounded" style="background: var(--bar-color)">
          <v-text-field v-model="saveEmail" label="Email" :rules="emailRules" required dark filled outlined dense color="var(--main-color)"
            style="padding: 0; margin: 0; font-style: normal" ></v-text-field>
          <v-text-field v-model="savePass" label="Password" :rules="Rules" required dark filled outlined dense color="var(--main-color)"
            style="padding: 0; margin: 0; font-style: normal" ></v-text-field>
          <div class="d-flex pb-3">
            <v-btn color="var(--main-color)" style="padding: 0" text> Forgot password?</v-btn > <v-spacer></v-spacer>
          </div>
        </div>
        <div class="d-flex">
          <v-spacer></v-spacer>
          <v-btn color="var(--main-color)" text style="padding: 0" @click="signup = true" >Sign up</v-btn >
        </div>
      </v-card-text>
      <!-- 회원가입 -->
      <v-card-text class="pa-3" v-if="email && signup">
        <div class="px-5 pt-5 rounded" style="background: var(--bar-color)">
          <v-text-field v-model="saveEmail" label="Email" :rules="emailRules" required dark filled outlined dense color="var(--main-color)"
            style="font-style: normal" ></v-text-field>
          <v-text-field v-model="savePass" label="Password" :rules="Rules" required dark filled outlined dense color="var(--main-color)"
            style="font-style: normal" ></v-text-field>
          <v-text-field v-model="saveName" label="Name" :rules="nameRules" required dark filled outlined dense color="var(--main-color)"
            style="font-style: normal" ></v-text-field>
          <v-text-field v-model="saveTeam" label="Team" dark filled outlined dense color="var(--main-color)" style="font-style: normal"
          ></v-text-field>
          <div>
            <v-checkbox label="운영정책에 동의합니다." dark v-model="checkbox" :rules="[(v) => !!v || '필수체크란']" required style="margin: 0" ></v-checkbox>
          </div>
        </div> 
      </v-card-text>
      <!-- 제출버튼 -->
      <v-card-actions v-if="email">
        <v-btn rounded class="mb-2" block color="var(--second-color)" @click="emailLogin" :loading="loading" v-if="!signup" > <h2>Sign in</h2> </v-btn>
        <v-btn rounded class="mb-2" block color="var(--second-color)" @click="register" :loading="loading" v-else > <h2>Sign up</h2>  </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import { AvatarGenerator } from "random-avatar-generator";

export default {
  name: "DialogLogin",
  props: ["score","id"],
  data() {
    return {
      Rules: [(v) => !!v || "필수입력란"],
      nameRules: [ (v) => !!v || "필수입력란", (v) => v.length <= 10 || "10자내로 입력", ],
      emailRules: [ (v) => !!v || "필수입력란", (v) => /.+@.+/.test(v) || "E-mail 형식", ],
      today: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substring(0, 10),
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
      // avatar options:
      backgroundType: ["circle", "transparent"],
      backgroundColor: ["black", "blue01", "blue02", "blue03", "gray01", "gray02", "heather", "pastelBlue", "pastelGreen", "pastelOrange", "pastelRed", "pastelYellow", "pink", "red", "white"],
      skinColor: ["tanned", "yellow", "pale", "light", "brown", "darkBrown", "dark"],
      clothesType: ["blazerShirt", "blazerSweater", "collarSweater", "graphicShirt", "hoodie", "overall", "shirtCrewNeck", "shirtScoopNeck", "shirtVNeck"],
      clothesColor: ["black", "blue01", "blue02", "blue03", "gray01", "gray02", "heather", "pastelBlue", "pastelGreen", "pastelOrange", "pastelRed", "pastelYellow", "pink", "red", "white"],
      eyesType: ["close", "cry", "default", "dizzy", "eyeroll", "happy", "hearts", "side", "squint", "surprised", "wink", "winkWacky"],
      eyebrowType: ["angry", "angryNatural", "default", "defaultNatural", "flatNatural", "frownNatural", "raisedExcited", "raisedExcitedNatural", "sadConcerned", "sadConcernedNatural", "unibrowNatural", "updown", "updownNatural"],
      mouthType: ["concerned", "default", "disbelief", "eating", "grimace", "sad", "screamOpen", "serious", "smile", "tongue", "twinkle", "vomit"],
      facialHairType: ["none", "beardMedium", "beardLight", "beardMajestic", "moustacheFancy", "moustacheMagnum"],
      facialHairColor: ["auburn", "black", "blonde", "blondeGolden", "brown", "brownDark", "platinum", "red"],
      accessoriesType: ["none", "eyepatch", "kurt", "prescription01", "prescription02", "round"],
      topType: ["none", "hat", "hijab", "turban", "winterHat1", "winterHat2", "winterHat3", "winterHat4", "longHairBigHair", "longHairBob", "longHairBun", "longHairCurly", "longHairCurvy", "longHairDreads", "longHairFro", "longHairFroBand", "longHairNotTooLong", "longHairShavedSides", "longHairMiaWallace", "longHairStraight", "longHairStraight2", "longHairStraightStrand", "shortHairDreads01", "shortHairDreads02", "shortHairFrizzle", "shortHairShaggyMullet", "shortHairShortCurly", "shortHairShortFlat", "shortHairShortRound", "shortHairShortWaved", "shortHairSides", "shortHairTheCaesar", "shortHairTheCaesarSidePart"],
      topColor: ["auburn", "black", "blonde", "blondeGolden", "brown", "brownDark", "platinum", "red","blue01", "blue02", "blue03", "gray01", "gray02", "heather", "pastelBlue", "pastelGreen", "pastelOrange", "pastelRed", "pastelYellow", "pink", "red01", "white"],
      clothesGraphicsType: ["none", "bat", "cumbia", "diamond", "pizza", "resist", "selena", "bear", "skullOutline", "skull"],
    };
  },
  created() {
    console.log(this.score,'score')
  },  
  methods: {
    // 구글로그인
    async googleLogin() {
      this.$emit("close");
      const provider = new this.$firebase.auth.GoogleAuthProvider();
      this.$firebase.auth().languageCode = "ko";
      try {
        // 신규구글로그인시 데이터 저장
        await this.$firebase
          .auth()
          .signInWithPopup(provider)
          .then((e) => {
            this.$firebase.firestore().collection("user").get().then((users) => {
                const userId = users.docs.map(a => a.id);
                if (userId.includes(e.user.uid)) {return}
                this.saveUserdata(e).then(() => {
                  this.$firebase.firestore().collection("user").doc(e.user.uid).get()
                  .then((e) => {
                      const data = e.data();
                      this.$store.commit("setUserData", data);
                    });
                });
              });
          });
        } catch {
          console.log("stop!");
        } finally {
          this.loading = false;
          this.email = false;
          this.signup = false;
          if(this.score){
            console.log('하이하이')
          }
        }
    },
    randomItem(e){
      return e[Math.floor(Math.random()*e.length)]
    },
    // 유저데이터 저장(회원가입 && 구글로그인)
   async saveUserdata(e) {
      // 온라인 아바타링크 만들기
      const generator = new AvatarGenerator();
      const avatarSrc = generator.generateRandomAvatar();
      const userData = {
        uid: e.user.uid || "",
        name: e.user.displayName ? e.user.displayName : this.saveName,
        email: e.user.displayName ? e.user.email : this.saveEmail,
        pw: e.user.displayName ? "" : this.savePass,
        avatar: avatarSrc || "",
        since: this.today,
        point: 1000,
        Level: 1,
        ability: [],
        badge: [],
        team: "",
        sex: "남",
        age: 10,
        options: {
          backgroundType: "transparent",
          backgroundColor:this.randomItem(this.backgroundColor),
          skinColor: this.randomItem(this.skinColor),
          clothesType: this.randomItem(this.clothesType),
          clothesColor:this.randomItem(this.clothesColor),
          eyesType: this.randomItem(this.eyesType),
          eyebrowType:this.randomItem(this.eyebrowType),
          mouthType:this.randomItem(this.mouthType),
          facialHairType: this.randomItem(this.facialHairType),
          facialHairColor:this.randomItem(this.facialHairColor),
          accessoriesType:this.randomItem(this.accessoriesType),
          topType: this.randomItem(this.topType),
          topColor:this.randomItem(this.topColor),
          clothesGraphicsType:this.randomItem(this.clothesGraphicsType),
        }
      };
      this.$firebase
        .firestore()
        .collection("user")
        .doc(e.user.uid)
        .set(userData)
        .then(() => {
          this.loading = false;
          this.email = false;
          this.signup = false;
        });
    },
    // 이메일 로그인
    emailLogin() {
      const valid = this.$refs.form.validate();
      if (!valid) {
        return;
      }
      this.loading = true;
      this.$firebase
        .auth()
        .signInWithEmailAndPassword(this.saveEmail, this.savePass)
        .then(() => {
          this.$emit("close");
          this.loading = false;
        })
        .catch((e) => {
          this.loading = false;
            this.$swal.fire({ title: '회원정보 오류',text:'이메일과 비밀번호를 확인해주세요.', icon: 'error' })
          console.log( e);
        }) 
    },
    // 이메일 회원가입
    async register() {
      this.loading = true;
      const valid = this.$refs.form.validate();
      if (!valid) {
        return;
      }
      try {
        await this.$firebase
          .auth()
          .createUserWithEmailAndPassword(this.saveEmail, this.savePass)
          .then((result) => {
            console.log(result);
            this.saveUserdata(result);
              this.$emit("close");
          this.loading = false;
          })
          .catch((e) => {
            console.log(e);
            this.$swal.fire({ title: '이메일 오류',text:'입력하신 이메일은 이미 등록된 메일입니다.', icon: 'error' })
          this.loading = false;
          })
          // .finally(() => {
          // });
      } catch {
        console.log("E-mail을 확인해주세요.\n 이미 가입된 E-mail입니다.");
      }
    },

    saveRecord() { 

      const id = Date.now().toString();
      const generator = new AvatarGenerator();
      const avatarSrc = generator.generateRandomAvatar();
      const data = {
        id: id,
        uid:this.$store.state.userData?this.$store.state.userData.uid:'',
        date: this.today,
        avatar: avatarSrc,
        option:this.$store.state.userData?this.$store.state.userData.option:'',
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
          this.saveOn = false;
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          this.$emit("close");
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
