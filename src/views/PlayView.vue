<template>
 
  <v-container class="font-italic white--text pb-3 d-flex flex-column" style="height: 100%"   >
    <!-- {{ this.$store.state.userData?!!this.$store.state.userData.uid:false }} -->
   <!-- 로그인 -->
   <div class="d-flex login">
      <!-- <Avataaars :width="50" :height="50" v-if="!$store.state.userData" /> -->
      <div  style="cursor: pointer;padding: 0;margin: 0; height: 50px;">
        <v-progress-circular indeterminate color="var(--main-color)" style="transform: translateY(10px);" v-if="$store.state.fireUser&&!$store.state.userData"  />
        <Avataaars :width="50" :height="50" :avatarOptions="$store.state.userData.options" v-if="$store.state.fireUser&&$store.state.userData" />
        <v-avatar  size="50px" v-else><v-icon dark> mdi-48px mdi-account</v-icon></v-avatar>
      </div>
      <v-btn rounded  color="var(--main-color)" @click="dialogLogin = true" v-if="!$store.state.fireUser"  style="transform: translateY(10px);" >
        <h3>Login</h3>
      </v-btn>
      <v-btn rounded  color="var(--bar-color)" dark @click="logout"  v-else style="transform: translateY(10px);">
        <h3>Logout</h3>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="var(--main-color)" rounded  @click="dialogRank = true" style="transform: translateY(10px);" >
        <v-icon color="var(--bg-color)">mdi-trophy-variant-outline</v-icon>
        <h3 style="color: var(--bg-color)">Rank</h3>
      </v-btn>
    </div>
    <v-dialog v-model="dialogLogin" max-width="500px" :retain-focus="false">
      <DialogLogin @close="dialogLogin = false" />
    </v-dialog>
    <!-- 2. 앱바운동정보 / 티처블머신 -->
    <div class="aiSection">
      <!-- 2-1. 상단 앱바 운동정보 -->
      <div class="topBar">
        <!-- <div :style=" params.type === 'workout' ? `background-image: url(${canvasBg1})` : `background-image: url(${canvasBg2})`
          " ></div> -->
        <v-card-title>
          <h3 style="font-size: var(--h1-size)">{{ params.title }}</h3>
          <v-spacer></v-spacer>

          <v-menu bottom v-if="uid===params.uid">
            <template v-slot:activator="{ on, attrs }">
              <v-btn dark icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item>
                <v-btn icon @click="editData"><v-icon>mdi-pencil</v-icon></v-btn>
              </v-list-item>
              <v-list-item>
                <v-btn icon @click="removeData"><v-icon>mdi-delete</v-icon></v-btn>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-card-title>

        <v-card-text>
          <v-row class="mx-0">
            <v-rating v-model="rating" color="var(--main-color)" dense ></v-rating>
            <v-spacer></v-spacer>
            <div class="grey--text ms-4">
              <span style="color: var(--main-color)">{{ params.team }}</span>
            </div>
          </v-row>

          <div class="mt-5" style="font-size: var(--h3-size)">
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
          <v-progress-linear color="var(--main-color)" indeterminate rounded height="6" />
        </div>

        <!--  2-3.  운동방법 -->
        <v-container lass="text-left px-10" style=" position: absolute; top: 0; background-color: var(--bg-color); height: 100%; "
          v-if="!start && !saveOn" >
          <!-- 비밀번호 입장 물어보기 -->
          <div v-if="params.password!=password">
            <v-text-field v-model="password" :rules="[v => !!v || '비밀번호를 입력해주세요.']" label="입장 비밀번호" required dark  ></v-text-field>
            <!-- <v-btn color="var(--main-color)" rounded @click="passTf"><h3>확인</h3></v-btn> -->
          </div>
          <!-- 비밀번호 해결 -->
          <div v-else>
            <h2 class="mt-1" style="color: var(--main-color);font-size: var(--h2-size)">운동방법</h2>
            <v-banner color="var(--bar-color)" dark rounded single-line >
              <h4 style="font-size: var(--h3-size)">1. 전신이 나오도록 카메라 거리 조절.</h4>
              <h4 class="mt-2" style="font-size: var(--h3-size)">2. Pose1과 Pose2 동작을 반복합니다.</h4>
            </v-banner>

            <v-row class="mt-2">
              <v-col cols="6" style="padding: 0;">
                <v-img :src="params.infoImg1" width="70%" class="mx-auto " style="border-radius: 5px" v-if="params.infoImg1" />
              </v-col>
              <v-col cols="6" style="padding: 0;">
                <v-img :src="params.infoImg2" width="70%" class="mx-auto " style="border-radius: 5px" v-if="params.infoImg2" />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6">
                <h3 class="text-center" style="color: var(--main-color)"> POSE1 </h3>
                <v-card class="mx-auto" color="var(--bar-color)" dark> 
                  <v-card-text>
                    <h3 style="font-size: var(--normal-size)">{{ params.infoText1 }}</h3>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="6">
                <h3 class="text-center" style="color: var(--main-color)"> POSE2 </h3>
                <v-card class="mx-auto" color="var(--bar-color)" dark>
                  <v-card-text>
                    <h3 style="font-size: var(--normal-size)">{{ params.infoText2 }}</h3>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </v-container> 
        <!-- 2.5 티처블머신화면 -->
        <canvas id="canvas">
        </canvas>
        <div class="mt-5" style="position: absolute;top:1px;left:10px" v-if="start&&cameraTF" >
          <h4>POSE1 : {{ pose1 }}</h4>
          <h4>POSE2 : {{ pose2 }}</h4>
        </div> 
        <v-progress-circular :value="(timer / params.time) * 100" :width="8" size="80" color="var(--main-color)"
          v-if="start && !saveOn" style="position: absolute;top:10px;right:10px" >   <h1>{{ timer }}</h1>  </v-progress-circular>
      </div>
    </div>
    <!-- 3. 하단바 티처블머신 정보 -->
    <v-container style="display: flex; width: 100%; gap: 20px; align-items: center" class="cameraInfo" >
      <!-- 운동확인이미지 -->
      <div class="card" style="flex: 1" v-if="start && !saveOn">
        <div :style=" status === 'up' ? `background-image: url(${params.infoImg1})` : `background-image: url(${params.infoImg2})`" class="imgBg" ></div>
      </div>

      <div class="btnBox" style="flex: 1">
        <!-- 시작버튼 -->
        <button @click="init" class="btn btn1 btnCamera" v-if="!start && !saveOn" >
          <h2>START</h2>
        </button>
        <!-- 정지버튼 -->
        <button @click="cancel" class="btn btn1 btnCamera" v-if="start && !saveOn" >
          <h2>STOP</h2>
        </button>
        
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
        <div  >
          <h1 class="mt-5">{{ score }}</h1>
        </div>
      </div>
    </v-container>
    <v-dialog v-model="dialogRank" max-width="600px">
      <DialogRank :items="items" :id="id" />
    </v-dialog>
    <v-dialog v-model="dialogLogin" max-width="600px">
      <!-- <DialogSave :score="score" /> -->
      <DialogLogin :score="score" :id="id" @close="dialogLogin = false"/>
    </v-dialog>
  </v-container>
</template>

<script>
import DialogLogin from "@/components/DialogLogin.vue";
import DialogRank from "@/components/DialogRank.vue";
// import DialogSave from "@/components/DialogSave.vue";
import * as tmPose from "@teachablemachine/pose";
export default {
  name: "ActivityTryWorkout",
  components: { DialogRank,  DialogLogin },
  data() {
    return {
      // params: this.$route.params.data || "",
      // canvasBg1: require("@/assets/fitness/bgMan.png"),
      today: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substring(0, 10),
      uid:this.$store.state.userData?this.$store.state.userData.uid:'',
      id: this.$route.params.id || "",
      params: "",
      passinput:"",
      password:"",
      userRecord: '',
      items: [],
      dialogRank: false,
      dialogSave: false,
      dialogLogin:false,
      info: {
        timer: 60,
        title: "해양중챔피온",
      },
      rating: 3,
      model: "",
      webcam: "",
      ctx: "",
      pose1:'',
      pose2:'',
      animationframe:'',
      labelContainer: "",
      maxPredictions: "",
      cavasBg: "",
      circle: "",
      status: "",
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
    if(this.cameraTF){ this.cancel() }
  },
  methods: {
    logout() {  this.$firebase.auth().signOut();this.score = 0;this.uid='' },
    gohome() { this.$router.push('/')},
    passTf(){ this.password = this.passinput},
    // 랭킹데이터 가져오기
    getData() {
      if (!this.id) {
        return;
      }
      this.$firebase
        .firestore().collection("workout").doc(this.id).get()
        .then((e) => {
          this.params = e.data();
          this.$firebase.firestore().collection("workout").doc(this.id).collection("rank")
            .get().then((sn) => {
              this.items = sn.docs.map((e) => e.data());
            }).catch((e) => console.log(e))
        })
        .catch((e) => console.log(e))
    },
    // 챌린지룸 제거
    removeData() {
      this.$firebase.firestore().collection("workout").doc(this.id).delete()
        .then(() => {
          this.$router.push("/");
        }).catch((e) => console.log(e));
    },
    editData() {
      this.$router.push({name: "create",params: this.params});
    },
    // 티처블 운동 시작
    async init() {
      this.start = true;
      this.timer = this.params.time;
      // const URL = "https://teachablemachine.withgoogle.com/models/SLjZUOxCB/";
      // const URL = "../assets/model/";
      const modelURL = this.params.aiSrc + "model.json";
      const metadataURL = this.params.aiSrc + "metadata.json";
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
      // this.labelContainer = document.getElementById("label-container");
      // window.requestAnimationFrame(this.loop);
      this.loop();
      // for (let i = 0; i < this.maxPredictions; i++) { 
      //   this.labelContainer.appendChild(document.createElement("div"));
      // }
      // 운동타이머 시작
      this.circle = setInterval(() => {
        this.timer--;
        if (this.timer < 1) { 
          this.cancel()     ;
          //시간초과 저장
          if(this.$store.state.userData){
          // if(this.$store.state.userData?this.$store.state.userData.uid:false){
            this.save().then(() => {
              this.dialogRank=true
            });
          }else{
            console.log("uid없음")
            this.dialogLogin=true;
          }
        }
      }, 1000);
    },
    async loop() {
      this.webcam.update(); // update the webcam frame
      await this.predict(); 
      this.animationframe = window.requestAnimationFrame(this.loop)
    },
    cancel(){    
          this.start = false;
          this.cameraTF = false;
      if (this.webcam) { this.webcam.stop() }
      if(this.circle){clearInterval(this.circle)}     
      if(this.animationframe){cancelAnimationFrame(this.animationframe)}
    },
    // 동작판별하기
    async predict() {
      // 포즈뼈대그리기
      const { pose, posenetOutput } = await this.model.estimatePose( this.webcam.canvas );
      const prediction = await this.model.predict(posenetOutput);
      this.drawPose(pose);
      //동작판정하기
      if (prediction[0].probability.toFixed(2) > 0.99) {
        if (this.status == 'down') {this.score++;}
        this.status = 'up'
      }else if (prediction[1].probability.toFixed(2) > 0.99) {
        this.status = 'down'
      } 
      //동작판정치수나타내기
      this.pose1 = prediction[0].probability.toFixed(2)
      this.pose2 = prediction[1].probability.toFixed(2)
      // for (let i = 0; i < this.maxPredictions; i++) {
      //   const classPrediction =
      //   "Pose" + (Number(i) + 1) + ": " + prediction[i].probability.toFixed(2);
      //   this.labelContainer.childNodes[i].innerHTML = classPrediction;
      // }
    },
    // 포즈그리기
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
   async save() {
    this.$firebase.firestore().collection('workout').doc(this.id).collection('rank').doc(this.uid).get()
    .then((e) => {
      this.userRecord = e.data()
      console.log(e.data())
          if (e.data() === undefined) { this.save1() } else { this.save2() }
        }).catch((e) => { console.log(e) }) 
      },
    save1(){
      const id = Date.now().toString();
      const data = {
        id: id,
        date: this.today,
        uid: this.$store.state.userData.uid ,
        name: this.$store.state.userData.name,
        email: this.$store.state.userData.email,
        team: this.$store.state.userData.team,
        options:this.$store.state.userData.options,
        record: this.score,
        recordSum: this.score,
        recordRepeat: 1,
      };
      this.$firebase.firestore().collection("workout").doc(this.id).collection("rank").doc(this.uid).set(data)
      .then(() => {
          this.saveOn = false;
          this.score=0
        }).catch((e) => { console.log(e); });
    },
    save2(){
      console.log('save2',this.userRecord.record,this.score)
      const record = Math.max(this.userRecord.record, this.score)
      const recordSum = this.userRecord.recordSum
      const recordRepeat = this.userRecord.recordRepeat
      const data = {
        ...this.userRecord,
        recordSum: recordSum + this.score,
        recordRepeat: recordRepeat + 1,
        record: record
      }
      this.$firebase.firestore().collection('workout').doc(this.id).collection('rank').doc(this.uid).update(data)
      .then(() => {
          this.saveOn = false;
          this.score=0
        }).catch((e) => { console.log(e); });
    }
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
.imgBg{
 background-position:center;
 background-size:contain;
 flex: 1;
 height:100%;
 background-repeat: no-repeat;
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
@media (max-width: 600px) {
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
a