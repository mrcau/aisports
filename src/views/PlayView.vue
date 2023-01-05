<template>
  <v-container
    class="font-italic white--text pb-3 d-flex flex-column"
    style="height: 100%"
  >
    <!-- 1. 상단 홈 바로가기/RANK -->
    <div class="d-flex mb-2">
      <v-btn color="var(--main-color)" text small to="/">
        <v-icon>mdi-36px mdi-home</v-icon> </v-btn
      ><v-spacer></v-spacer>
      <v-btn color="var(--main-color)" rounded small @click="dialog = true">
        <v-icon color="var(--bg-color)">mdi-trophy-variant-outline</v-icon>
        <h2 style="color: var(--bg-color)">Rank</h2>
      </v-btn>
    </div>
    <!-- 2. 앱바운동정보 / 티처블머신 -->
    <div class="aiSection">
      <!-- 2-1. 상단 앱바 운동정보 -->
      <div class="topBar">
        <!-- <div
          :style="
            params.type === 'workout'
              ? `background-image: url(${canvasBg1})`
              : `background-image: url(${canvasBg2})`
          "
        ></div> -->
        <v-card-title>
          <h3>{{ params.title }}</h3>
          <v-spacer></v-spacer>

          <v-menu bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn dark icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item>
                <v-btn icon @click="editData"
                  ><v-icon>mdi-pencil</v-icon></v-btn
                >
              </v-list-item>
              <v-list-item>
                <v-btn icon @click="removeData"
                  ><v-icon>mdi-delete</v-icon></v-btn
                >
              </v-list-item>
            </v-list>
          </v-menu>
        </v-card-title>

        <v-card-text>
          <v-row class="mx-0">
            <v-rating
              v-model="rating"
              color="var(--main-color)"
              dense
            ></v-rating>
            <v-spacer></v-spacer>
            <div class="grey--text ms-4">
              <span style="color: var(--main-color)">{{ params.team }}</span>
            </div>
          </v-row>

          <div class="mt-5 text-subtitle-1">
            {{ params.content }}
          </div>
        </v-card-text>

        <v-card-actions>
          <v-icon color="white" class="mx-2">mdi-timetable</v-icon>
          <span>
            {{ params.endDate }}
          </span>
          <v-spacer></v-spacer>
          <v-icon color="white">mdi-account-group</v-icon>
          <span class="mx-2 mt-1">
            {{ params ? params.members.length : "0" }}
          </span>
        </v-card-actions>
      </div>
      <!--  2-2. 캔버스배경    -->
      <div class="bgCanvas">
        <div v-if="start && !cameraTF" style="position: absolute">
          <h3>카메라 로딩중...</h3>
          <v-progress-linear
            color="var(--main-color)"
            indeterminate
            rounded
            height="6"
          />
        </div>

        <!--  2-3.  운동방법 -->
        <v-container
          class="text-left px-10"
          style="
            position: absolute;
            top: 0;
            background-color: var(--bg-color);
            height: 100%;
          "
          v-if="!start && !saveOn"
        >
          <div>
            <v-banner color="var(--bar-color)" dark rounded single-line>
              <h2 class="mt-1" style="color: var(--main-color)">운동방법</h2>
              <h4 class="mt-2">1. 신체와 카메라 거리 조절</h4>
              <h4 class="mt-2">2. Pose1과 Pose2 동작 반복</h4>
            </v-banner>

            <v-row class="mt-2">
              <v-col cols="6">
                <v-img
                  :src="params.infoImg1"
                  width="70%"
                  class="mx-auto mt-2"
                  style="border-radius: 5px"
                  v-if="params.infoImg1"
                />
              </v-col>
              <v-col cols="6">
                <v-img
                  :src="params.infoImg2"
                  width="70%"
                  class="mx-auto mt-2"
                  style="border-radius: 5px"
                  v-if="params.infoImg2"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6">
                <v-card class="mx-auto" color="var(--bar-color)" dark>
                  <v-card-title>
                    <h3 class="text-center" style="color: var(--main-color)">
                      POSE1
                    </h3>
                  </v-card-title>

                  <v-card-text>
                    <h3>{{ params.infoText1 }}</h3>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card class="mx-auto" color="var(--bar-color)" dark>
                  <v-card-title>
                    <h3 class="text-center" style="color: var(--main-color)">
                      POSE2
                    </h3>
                  </v-card-title>

                  <v-card-text>
                    <h3>{{ params.infoText2 }}</h3>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </v-container>

        <!-- 2-4. 기록저장 -->
        <v-container
          class="pa-10"
          style="
            position: absolute;
            top: 0;
            background-color: var(--bg-color);
            height: 100%;
          "
          v-if="saveOn"
        >
          <v-card color="var(--bar-color)" dark class="text-center">
            <v-card-title> SAVE RECORD </v-card-title>
            <v-divider></v-divider>
            <h1>{{ score }}</h1>
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
        </v-container>
        <!-- 2.5 티처블머신화면 -->
        <canvas id="canvas"></canvas>
      </div>
    </div>
    <!-- 3. 하단바 티처블머신 정보 -->
    <v-container
      style="display: flex; width: 100%; gap: 20px; align-items: center"
      class="cameraInfo"
    >
      <!-- 정확도 -->
      <div class="card" style="flex: 1" v-if="start && !saveOn">
        <!-- <h3 style="position: absolute; top: 5px; color: var(--second-color)">
            정확도
          </h3> -->
        <div class="mt-5" id="label-container"></div>
      </div>

      <div class="btnBox" style="flex: 1">
        <!-- 시작버튼 -->
        <button
          @click="init"
          class="btn btn1 btnCamera"
          v-if="!start && !saveOn"
        >
          <h3>START</h3>
        </button>
        <!-- 진행/시간 버튼 -->
        <v-progress-circular
          :value="(timer / params.time) * 100"
          :width="10"
          size="100"
          color="var(--main-color)"
          v-if="start && !saveOn"
        >
          <h1>{{ timer }}</h1>
        </v-progress-circular>
        <!-- 저장버튼 -->
        <button @click="restart" class="btn btn1 btnCamera" v-if="saveOn">
          <h3>RESTART</h3>
        </button>
      </div>
      <!-- 점수 -->
      <div class="card" style="flex: 1" v-if="start && !saveOn">
        <h3 style="position: absolute; top: 5px; color: var(--second-color)">
          점수
        </h3>
        <div id="label-container">
          <h1 class="mt-5">{{ score }}</h1>
        </div>
      </div>
    </v-container>
    <v-dialog v-model="dialogRank" max-width="600px">
      <DialogRank :items="items" />
    </v-dialog>
    <v-dialog v-model="dialogSave" max-width="600px">
      <DialogSave :score="score" />
    </v-dialog>
  </v-container>
</template>

<script>
import DialogRank from "@/components/DialogRank.vue";
import DialogSave from "@/components/DialogSave.vue";
import * as tmPose from "@teachablemachine/pose";
export default {
  name: "ActivityTryWorkout",
  components: { DialogRank, DialogSave },
  data() {
    return {
      // params: this.$route.params.data || "",
      // canvasBg1: require("@/assets/fitness/bgMan.png"),
      uid: "",
      id: this.$route.params.id || "",
      params: "",
      items: [],
      dialogRank: false,
      dialogSave: false,
      info: {
        timer: 60,
        title: "해양중챔피온",
      },
      rating: 3,
      model: "",
      webcam: "",
      ctx: "",
      labelContainer: "",
      maxPredictions: "",
      cavasBg: "",
      circle: "",
      timer: 0,
      score: 0,
      radius: 45,
      start: false,
      saveOn: false,
      cameraTF: false,
      saveName: "",
      savePass: "",
      saveEmail: "",
      saveTeam: "",
      Rules: [(v) => !!v || "필수입력란"],
    };
  },
  created() {
    this.getData();
  },
  beforeDestroy() {
    if (this.webcam) {
      console.log(this.webcam, "webcam 닫기");
      this.webcam.stop();
    }
  },
  methods: {
    getData() {
      if (!this.id) {
        return;
      }
      this.$firebase
        .firestore()
        .collection("workout")
        .doc(this.id)
        .get()
        .then((e) => {
          this.params = e.data();
          this.$firebase
            .firestore()
            .collection("workout")
            .doc(this.id)
            .collection("rank")
            .get()
            .then((sn) => {
              this.items = sn.docs.map((e) => e.data());
            })
            .catch((e) => console.log(e))
            .finally(() => {
              console.log("get Item");
            });
        })
        .catch((e) => console.log(e))
        .finally(() => {
          console.log("get Data");
        });
    },
    removeData() {
      this.$firebase
        .firestore()
        .collection("workout")
        .doc(this.id)
        .delete()
        .then(() => {
          this.$router.push("/");
        })
        .catch((e) => console.log(e));
    },
    editData() {
      this.$router.push({
        name: "create",
        params: this.params,
      });
    },

    async init() {
      this.start = true;
      this.timer = this.params.time;
      this.start = true;
      // const URL = "https://teachablemachine.withgoogle.com/models/JDpmv3fs7/";
      const URL = "https://teachablemachine.withgoogle.com/models/k-nnfICb0/";
      const modelURL = URL + "model.json";
      const metadataURL = URL + "metadata.json";
      this.model = await tmPose.load(modelURL, metadataURL);
      this.maxPredictions = this.model.getTotalClasses();
      const size = window.innerWidth < 600 ? window.innerWidth - 20 : 590;
      const flip = true;
      this.webcam = new tmPose.Webcam(size, size, flip);
      await this.webcam.setup();
      await this.webcam.play();
      this.cameraTF = true;
      // append/get elements to the DOM
      const canvas = document.getElementById("canvas");
      canvas.width = size;
      canvas.height = size;
      this.ctx = canvas.getContext("2d");
      this.labelContainer = document.getElementById("label-container");
      window.requestAnimationFrame(this.loop);
      for (let i = 0; i < this.maxPredictions; i++) {
        // and class labels
        this.labelContainer.appendChild(document.createElement("div"));
      }
      this.circle = setInterval(() => {
        this.timer--;
        if (this.timer < 1) {
          clearInterval(this.circle);
          this.start = false;
          this.cameraTF = true;
          // this.saveOn = true;
          this.dialogSave = true;
          this.webcam.stop();
        }
      }, 1000);
    },
    async loop() {
      this.webcam.update(); // update the webcam frame
      await this.predict();
      window.requestAnimationFrame(this.loop);
    },
    async predict() {
      const { pose, posenetOutput } = await this.model.estimatePose(
        this.webcam.canvas
      );
      const prediction = await this.model.predict(posenetOutput);
      for (let i = 0; i < this.maxPredictions; i++) {
        const classPrediction =
          "Pose" + i + 1 + ": " + prediction[i].probability.toFixed(2);
        this.labelContainer.childNodes[i].innerHTML = classPrediction;
      }
      // finally draw the poses
      this.drawPose(pose);
    },
    drawPose(pose) {
      if (this.webcam.canvas) {
        this.ctx.drawImage(this.webcam.canvas, 0, 0);
        // draw the keypoints and skeleton
        if (pose) {
          const minPartConfidence = 0.5;
          tmPose.drawKeypoints(pose.keypoints, minPartConfidence, this.ctx);
          tmPose.drawSkeleton(pose.keypoints, minPartConfidence, this.ctx);
        }
      }
    },
    restart() {
      this.saveOn = false;
    },
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
.aiSection {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: stretch;
  overflow: hidden;
  background-image: url(../assets/fitness/card-col1.png);
  border-radius: 10px 10px 0 0;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.topBar {
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  max-height: 300px;
  border-bottom: solid 3px var(--main-color);
}
.cameraInfo {
  flex: auto;
  border-top: solid 3px var(--main-color);
  background-image: url(../assets/fitness/card-col1.png);
  border-radius: 0 0 10px 10px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top;
}
.bgCanvas {
  background-color: var(--bg-color);
  width: 600px;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 2px solid rgba(255, 255, 255, 0.2);
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  // background-image: url("../assets/logo.png");
  /* background-image: url('../assets/logo.png'); */
  // background-position: center;
  // background-repeat: no-repeat;
  // background-size: cover;
  // backdrop-filter: blur(25px);
  // box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.5);
}
@media (max-width: 576px) {
  .bgCanvas {
    width: 100%;
    height: 100vw;
  }
}

.btnCamera {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  font-size: var(--normal-size);
}
.card {
  height: 100px;
}
</style>
