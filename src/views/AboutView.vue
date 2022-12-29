<template>
  <v-container class="font-italic white--text pb-15">
    <div class="aiSection">
      <div class="topBar">
        <v-card-title>
          <h2>
            {{ params.title }}
          </h2>
        </v-card-title>

        <v-card-text>
          <v-row class="mx-0">
            <v-rating
              :value="params.star"
              color="amber"
              dense
              half-increments
              readonly
              size="14"
            ></v-rating>
            <v-spacer></v-spacer>
            <div class="grey--text ms-4">{{ params.made }}</div>
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
            {{ params.members.length }}
          </span>
        </v-card-actions>
      </div>
      <div class="bgCanvas" :style="`background-image: url(${params.img})`">
        <canvas id="canvas"></canvas>
      </div>
      <v-container
        style="display: flex; width: 100%; gap: 20px"
        class="cameraInfo mx-5 my-b"
      >
        <div class="card" style="flex: 1" v-if="cameraTF">
          <h3 style="position: absolute; top: 5px">정확도</h3>
          <div class="mt-5" id="label-container"></div>
        </div>

        <div class="btnBox" style="flex: 1">
          <button @click="init" class="btn btn1 btnCamera" v-if="!cameraTF">
            <h2>START</h2>
          </button>
          <v-progress-circular
            :value="(timer / info.timer) * 100"
            :width="10"
            size="100"
            color="var(--main-color)"
            v-else
          >
            <h1>{{ timer }}</h1>
          </v-progress-circular>
        </div>

        <div class="card" style="flex: 1" v-if="cameraTF">
          <h3 style="position: absolute; top: 5px">점수</h3>
          <div id="label-container"></div>
        </div>
      </v-container>
    </div>
  </v-container>
</template>

<script>
import * as tmPose from "@teachablemachine/pose";
export default {
  name: "ActivityTryWorkout",
  data() {
    return {
      info: {
        timer: 60,
        title: "해양중챔피온",
      },
      params: this.$route.params.data || "",
      model: "",
      webcam: "",
      ctx: "",
      labelContainer: "",
      maxPredictions: "",
      cameraTF: false,
      cavasBg: "",
      circle: "",
      timer: 0,
      radius: 45,
      start: false,
    };
  },

  created() {
    console.log(this.params);
  },
  methods: {
    async init() {
      this.timer = this.info.timer;
      this.cameraTF = true;
      // const URL = "https://teachablemachine.withgoogle.com/models/JDpmv3fs7/";
      const URL = "https://teachablemachine.withgoogle.com/models/k-nnfICb0/";
      const modelURL = URL + "model.json";
      const metadataURL = URL + "metadata.json";
      this.model = await tmPose.load(modelURL, metadataURL);
      this.maxPredictions = this.model.getTotalClasses();
      const size = window.innerWidth < 600 ? window.innerWidth : 600;
      const flip = true;
      this.webcam = new tmPose.Webcam(size, size, flip);
      await this.webcam.setup();
      await this.webcam.play();
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
          this.cameraTF = false;
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
          prediction[i].className + ": " + prediction[i].probability.toFixed(2);
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
  background-image: url(../assets/fitness/card-col3.png);
  border-radius: 18px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.topBar {
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  max-height: 300px;
  border-bottom: solid 5px #ccf863;
}
.cameraInfo {
  border-top: solid 5px #ccf863;
}
.bgCanvas {
  background-color: rgba(255, 255, 255, 0.2);
  // background-image: url("../assets/logo.png");
  /* background-image: url('../assets/logo.png'); */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 600px;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
  // box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 2px solid rgba(255, 255, 255, 0.2);
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
}
@media (max-width: 576px) {
  .bgCanvas {
    width: 100%;
    height: 100vw;
  }
}
.bgCamera {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin-top: 20px;
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
