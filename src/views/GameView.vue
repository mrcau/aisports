<template>
 
  <v-container class="font-italic white--text pb-3 d-flex flex-column" style="height: 100%"   >
   <!-- 로그인 -->
   <div class="d-flex login pr-5" style="height:45px"> 
        <v-btn icon color="var(--main-color)" to="/" style="transform: translateY(10px);" >
          <span class="mdi mdi-36px mdi-home"></span>
        </v-btn>
      <v-spacer></v-spacer>
        <v-btn rounded color="var(--main-color)" @click="dialogLogin = true" v-if="!$store.state.fireUser"  >
          <h3>Login</h3>
        </v-btn>
        <v-progress-circular indeterminate color="var(--main-color)"  v-if="$store.state.fireUser&&!$store.state.userData"  />
        <v-speed-dial v-model="fab"  style="padding: 0;margin:0"  direction="left"  v-if="$store.state.fireUser&&$store.state.userData"  >
            <template v-slot:activator> 
              <v-btn v-model="fab" small color="transparent" dark fab style="transform: translateX(10px);" >
                <Avataaars :width="50" :height="50" :avatarOptions="$store.state.userData.options"  />
              </v-btn>
            </template> 
            <v-btn rounded dark small @click="logout" color="var(--main-color)" style="color:black;transform: translateX(20px);"  >
              Logout
            </v-btn>
        </v-speed-dial>
    </div> 
    <!-- 2. 앱바운동정보 / 티처블머신 -->
    <div class="aiSection">
      <!-- 2-1. 상단 앱바 운동정보 -->
      <div class="topBar">
  <!-- <div :style=" params.type === 'game' ? `background-image: url(${canvasBg1})` : `background-image: url(${canvasBg2})` " ></div> -->
        <v-card-title>
          <h3 style="font-size: var(--h1-size)">{{ params.title }}</h3>
          <v-spacer></v-spacer>
          <v-speed-dial v-model="fabEdit"    direction="left"  v-if="$store.state.fireUser&&$store.state.fireUser.uid===params.uid"  >
            <template v-slot:activator> 
              <v-btn v-model="fabEdit" small color="transparent" dark fab style="transform: translateX(10px);" >
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template> 
            <div style="display:flex;transform: translateX(20px);">
              <v-btn dark icon @click="removeData"><v-icon>mdi-delete</v-icon></v-btn>
              <v-btn dark icon @click="editData"><v-icon>mdi-pencil</v-icon></v-btn>
            </div>
          </v-speed-dial>
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
            {{members }}
          </span>
        </v-card-actions>
      </div>
      <!--  2-2. 캔버스배경    -->
      <div class="bgCanvas">
        <!-- 운동방법화면 -->
        <v-container style=" position: absolute; top: 0; background-color: var(--bg-color); height: 100%;padding-bottom: 0; "
          v-if="!start && !saveOn" >
          <!-- 비밀번호 입장 물어보기 -->
          <div v-if="params.password!=password">
            <v-text-field v-model="password" :rules="[v => !!v || '비밀번호를 입력해주세요.']" label="입장 비밀번호" required dark  ></v-text-field>
            <!-- <v-btn color="var(--main-color)" rounded @click="passTf"><h3>확인</h3></v-btn> -->
          </div>
          <!-- 비밀번호 해결 -->
          <div v-else>
            <h2 class="mt-1" style="color: var(--main-color);font-size: var(--h2-size)">게임방법</h2>
            <v-banner color="var(--bar-color)" dark rounded single-line >
              <h3 style="font-size: var(--normal-size)">1. 'START' 버튼을 클릭후 카메라 사용을 허용합니다.</h3>
              <h3 style="font-size: var(--normal-size)">2. 몸 전체가 나오도록 카메라 거리를 조절합니다.</h3>
              <h3 style="font-size: var(--normal-size)">3. 아래 동작을 반복하여 캐릭터를 움직입니다.</h3>
            </v-banner>
            <v-row class="mt-5">
              <v-col cols="6" style="padding: 0;">
                <v-img :src="params.infoImg1" width="80%" class="mx-auto " style="border-radius: 5px" v-if="params.infoImg1" />
              </v-col>
              <v-col cols="6" style="padding: 0;">
                <v-img :src="params.infoImg2" width="90%" class="mx-auto " style="border-radius: 5px" v-if="params.infoImg2" />
              </v-col>
            </v-row>
            <v-row class="pa-5">
              <v-col cols="6" style="padding-top: 0;">
                <!-- <h3 class="text-center" style="color: var(--main-color)"> POSE1 </h3> -->
                <v-card class="mx-auto pa-2" color="var(--bar-color)" dark> 
                    <h3 style="font-size: var(--normal-size);">{{ params.infoText1 }}</h3>
                </v-card>
              </v-col>
              <v-col cols="6" style="padding-top: 0;">
                <!-- <h3 class="text-center" style="color: var(--main-color)"> POSE2 </h3> -->
                <v-card class="mx-auto pa-2" color="var(--bar-color)" dark>
                    <h3 style="font-size: var(--normal-size);">{{ params.infoText2 }}</h3>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </v-container> 
        <!-- 게임화면 -->
        <v-container class="gamescreen scene" ref="gameScreen"  v-else>
          <!-- 달 -->
          <v-img src="../assets/img/moon.png" style="width: 150px;height:150px;position: absolute;right: 0;" ></v-img>
          <!-- 별 -->
          <!-- <div v-for="s in 50" :key="s" :style="`position:absolute;left:${Math.floor(Math.random()*300)}px; top:${Math.floor(Math.random()*300)}px;`">
            <v-icon   :size="`${Math.floor(Math.random()*20)}`" :style="`color:rgba(255,255,255,${Math.random()})`" >
            mdi-star</v-icon>
          </div> -->
          <!-- 떨어지는 별 -->
          <div ref="stars" :style="`position:absolute;left:${ranX}px;
          top:-50px;transform:translate(0,${starY}px);`">
            <v-icon size="50" color="var(--main-color)" >
            mdi-spin mdi-star</v-icon>
          </div>
          <div ref="virus" :style="`position:absolute;left:${ranXX}px;
          top:-100px;transform:translate(0,${virusY}px);`">
            <v-icon size="50" color="red" >
            mdi-spin mdi-virus</v-icon>
          </div>
          <!-- 떨어지는 유성 -->
          <div v-if="start">
            <div v-for="a in 5" :key="a" class="drop"
            :style="`left:${Math.floor(Math.random() * gameScreenW)}px;
            height:${Math.random()*100}px;animation-duration:${Math.random() * 5}s ;`" >
            </div>
          </div>
          <!-- 움직이는 캐릭터 -->
          <div ref="monster" class="monster" :class="navi==='left'?'left':navi==='right'?'right':'center'" 
          :style="`left:${xx}px;top:${yy}px;width:${monSize}px`" > 
              <v-avatar tile :size="monSize" style="position: relative;" >
               <img :src="`${require('../assets/img/hamster.png')}`" style="position:absolute;top:10;left:10"   />
              </v-avatar>
            <div v-if="fire">
              <img :src="`${require('../assets/img/fire2.gif')}`" style="position:absolute;top:98px;left:30px;width: 50px; transform: rotate(180deg);" v-if="egg" />
              <img :src="`${require('../assets/img/fire1.gif')}`" style="position:absolute;top:98px;left:30px;width: 50px; transform: rotate(180deg);" v-else />
            </div>
          </div>
        </v-container>
        <!-- 게임진행정보 -->        
        <div class="mt-5 ml-3" style="position: absolute;top:1px;left:10px" v-if="start&&cameraTF" >
          <h5>POSE1 : {{ pose1 }}</h5>
          <h5>POSE2 : {{ pose2 }}</h5>
          <h5>POSE3 : {{ pose3 }}</h5>
          <h5>POSE4 : {{ pose4 }}</h5>
        </div> 
        <v-progress-circular :value="(timer / params.time) * 100" :width="5" size="60" color="var(--main-color)"
          v-if="start && cameraTF" style="position: absolute;top:10px;right:10px" >   <h2>{{ timer }}</h2>  
        </v-progress-circular>
      </div>
    </div>

      <!--<div class="d-flex "  >
         <v-btn   style="flex:1;opacity:0.5;background:transparent" elevation="0" @click="btnRun('left') "  >
           <v-icon>mdi-arrow-left-bold</v-icon>
         </v-btn> 
         <v-btn   style="flex:1;opacity:0.5;background:transparent" elevation="0" @click="btnRun('down') "  >
           <v-icon>mdi-arrow-down-bold</v-icon>
         </v-btn>
         <v-btn   style="flex:1;opacity:0.5;background:transparent" elevation="0" @click="btnRun('up') "  >
           <v-icon>mdi-arrow-up-bold</v-icon>
         </v-btn> 
         <v-btn   style="flex:1;opacity:0.5;background:transparent" elevation="0" @click="btnRun('right') "  >
           <v-icon>mdi-arrow-right-bold</v-icon>
         </v-btn>
      </div>-->

    <!-- 3. 하단바 티처블머신 정보 -->
    <v-container class="cameraInfo "  >
      <!-- 티처블머신 -->
      <div  style="display: flex; width: 100%; gap: 20px; align-items: center" v-if="start && !saveOn">
         <div class="bgCanvas2 card" style="flex: 1">
           <div v-if="start && !cameraTF" style="position: absolute">
             <h3>카메라 로딩중...</h3>
             <v-progress-linear color="var(--main-color)" indeterminate rounded height="6" />
           </div>
           <canvas id="canvas"> </canvas>
         </div>
         <!-- 점수 -->
         <div class="card card2" :class="light==='up'?'light1':light==='down'?'light2':''" style="flex: 1"  >
          
           <h2 style="position: absolute; top: 15px; color: var(--second-color)"> 점수 </h2>
           <div> <h1 class="mt-5">{{ score }}</h1> </div>
         </div>
      </div>
      <!-- 시작정지버튼 -->
      
        <v-btn  class="mt-2" rounded color="var(--main-color)" @click="init" style="width:100%;max-width: 500px;" v-if="!start && !saveOn" >
          <h2>START</h2>
        </v-btn>
        <v-btn  class="mt-2" rounded color="var(--main-color)" @click="cancel" style="width:100%;max-width: 500px;" v-if="start && !saveOn" >
          <h2>STOP</h2>
        </v-btn>
        <v-btn class="mt-2"  rounded color="var(--main-color)" @click="restart" style="width:100%;max-width: 500px;" v-if="saveOn">
          <h3>RESTART</h3>
        </v-btn>
    </v-container>

    <v-dialog v-model="dialogRank" max-width="600px">
      <DialogRank :items="items" :rank="rank" :id="id" :maxAdd="params.maxAdd"  />
    </v-dialog>
    <v-dialog v-model="dialogLogin" max-width="600px" :retain-focus="false">
      <DialogLogin :score="score" :id="id" @close="dialogLogin = false" @rank="rankView" />
    </v-dialog>
  </v-container>
</template>

<script>
import DialogLogin from "@/components/DialogLogin.vue";
import DialogRank from "@/components/DialogRank.vue";
import * as tmPose from "@teachablemachine/pose";
export default {
  name: "ActivityTrygame",
  components: { DialogRank,  DialogLogin },
  data() {
    return {
      // params: this.$route.params.data || "",
      // canvasBg1: require("@/assets/fitness/bgMan.png"),
      today: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substring(0, 10),
      uid:this.$store.state.fireUser?this.$store.state.fireUser.uid:'',
      userData:'',
      id: this.$route.params.id || "",
      test:false,
      params: "",
      members:'',
      passinput:"",
      password:"",
      userRecord: '',
      items: [],
      rank:'',
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
      pose3:'',
      pose4:'',
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
      unsub: "",
      fab:false,
      fabEdit:false,
      light:'',
      timerSound:new Audio(require('@/assets/mp3/bgm.mp3')),
      endbell: new Audio(require('@/assets/mp3/endbell.mp3')),
      crash:false,
      monSize:100,
      banana: false,
      // xx: window.innerWidth/2,
      step: 15,
      egg: false,
      starSpeed:5,
      navi:'',
      screen:'',
      starfirstY:'',
      starX:0,
      starY:0,
      virusY:0,
      yy:200,
      xx:100,
      ranX:200,
      ranXX:50,
      fire:false,
      ranNum:Math.random(),
      randomNum:100,
      gameScreenW: window.innerWidth
      
    };
  },
  created() {
    this.getData();
    this.getRank();
  },
  destroyed(){
    cancelAnimationFrame(this.animationframe)
  },
  beforeDestroy() {
    this.timerSound.pause()
    if(this.cameraTF){ this.cancel() }
    if (this.unsub) this.unsub();
  },
  methods: {
    logout() {  this.$firebase.auth().signOut();this.score = 0; },
    gohome() { this.$router.push('/')},
    passTf(){ this.password = this.passinput},
    rankView() { 
      this.dialogRank=true;
      this.score=0;
      this.getRank(); },
    // 랭킹데이터 가져오기
    getData() {
      if (!this.id) {return }
      this.$firebase.firestore().collection("game").doc(this.id).get()
        .then((e) => {this.params = e.data()}).catch((e) => console.log(e)) 
      },
    getRank(){
      if (!this.id) {return }
      this.$firebase.firestore().collection("game").doc(this.id).get()
        .then((e) => {this.params = e.data()}).catch((e) => console.log(e))
        .finally(()=>{

        const order = this.params.maxAdd==='max'?'record':'recordSum'
      this.$firebase.firestore().collection("game").doc(this.id)
        .collection("rank").orderBy(order, "desc").limit(10)
        .get().then((sn) => {
          const items = sn.docs.map((e) => e.data());
          this.members = items.length
          const items2 = [];
          items.forEach((e) => {
            const rank = items.indexOf(e) + 1;
            items2.push({ ...e, rank: rank });
          });
          this.items = items2;
          if (!this.$store.state.fireUser) {return }
          const item = items2.filter((e)=>e.uid === this.$store.state.fireUser.uid)
          this.rank = item[0]? item[0].rank:''
        }).catch((e) => {console.log(e)}).finally(() =>{
          if(this.rank){
            this.dialogRank = true}
          });
        })
    },
    //유저데이터 가져오기
    getUserData(){
      if (this.$store.state.fireUser) { 
      this.$firebase.firestore().collection("user").doc(this.$store.state.fireUser.uid).get()
       .then((e) => {   this.userData = e.data();  })
      }
    },
    // 챌린지룸 제거
  async removeData() {
    await this.$firebase.firestore().collection('game').doc(this.id).collection('rank').get().then((sn) => {
          if(sn.empty){return}  
          sn.docs.forEach((e) => {
              this.$firebase.firestore().collection('game').doc(this.id).collection('rank').doc(e.data().uid).delete().catch(e => console.log(e))
            })
          }).catch((e)=>{console.log(e)})
          
        this.$firebase.firestore().collection("game").doc(this.id).delete()
        .then(() => { this.$router.push("/")}).catch((e) => console.log(e));

    },
    editData() {
      this.$router.push({name: "creategame",params: this.params});
    },
    startGame(){
      this.screen = this.$refs.gameScreen.getBoundingClientRect()
      this.starfirstY = this.$refs.stars.getBoundingClientRect().y
      this.gameScreenW = this.$refs.gameScreen.getBoundingClientRect().width - this.$refs.stars.getBoundingClientRect().width
      // this.randomX()
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
      const size = window.innerWidth < 600 ? window.innerWidth * 0.4 : 200;
      const flip = true;
      this.webcam = new tmPose.Webcam(size, size, flip);
      await this.webcam.setup();
      await this.webcam.play();
      this.startGame()
      this.cameraTF = true;
      // append/get elements to the DOM
      const canvas = document.getElementById("canvas");
      canvas.width = size;
      canvas.height = size;
      this.ctx = canvas.getContext("2d"); 
      this.loop(); 
      // 운동타이머 시작
      
      this.timerSound.loop = true
      this.timerSound.play()

      this.circle = setInterval(() => {
        this.timer--;
        if (this.timer < 1) { 
          this.cancel()     ;
      this.endbell.play()
          
          //시간초과 저장
          if(this.$store.state.userData){ 
            console.log("uid있음")
            this.recordSave() 
          }else{
            console.log("uid없음")
            this.dialogLogin=true;
          }
        }
      }, 1000);
    },
    async loop() {
      if(this.start){
        this.webcam.update(); // update the webcam frame
      await this.predict(); 
      this.dropItem(this.$refs.stars,'star')
      this.dropItem(this.$refs.virus,'virus') 
      this.animationframe = window.requestAnimationFrame(this.loop)
      }
    },
    // 동작판별하기
    async predict() {
      // 포즈뼈대그리기
      const { pose, posenetOutput } = await this.model.estimatePose( this.webcam.canvas );
      const prediction = await this.model.predict(posenetOutput);
      if(prediction[0]&&prediction[1]&&prediction[2]&&prediction[3]){
        this.drawPose(pose);
        //동작판정하기
        if (prediction[0].probability&&prediction[0].probability.toFixed(2) > 0.95) {
          this.btnRun('left');
          this.status = 'left'
        }else if (prediction[1].probability&&prediction[1].probability.toFixed(2) > 0.95) {
          this.btnRun('right');
          this.status = 'right'
        }else if (prediction[2].probability&&prediction[2].probability.toFixed(2) > 0.95) {
          this.btnRun('up');
          this.status = 'up'
        }else if (prediction[3].probability&&prediction[3].probability.toFixed(2) > 0.95) {
          this.btnRun('down');
          this.status = 'down'
        }   
        //동작판정치수나타내기
        this.pose1 = prediction[0].probability.toFixed(2)
        this.pose2 = prediction[1].probability.toFixed(2) 
        this.pose3 = prediction[2].probability.toFixed(2)
        this.pose4 = prediction[3].probability.toFixed(2) 
      }else{
        this.cancel();
        this.$swal.fire({ title: 'Ai모델 오류',text:'Ai모델을 확인해주세요.', icon: 'error' })
      }
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
    cancel(){    
          this.timerSound.pause()
          this.start = false;
          this.cameraTF = false;

      this.navi=''
      this.screen=''
      this.starfirstY=''
      this.starX=0
      this.starY=0
      this.virusY=0
      this.yy=200
      this.xx=100
      this.ranX=200
      this.ranXX=50
      this.fire=false

      if (this.webcam) { this.webcam.stop() }
      if(this.circle){clearInterval(this.circle)}     
      if(this.animationframe){window.cancelAnimationFrame(this.animationframe)}
    },
    restart() {
      this.saveOn = false;
    },
    countSound () {
      const audio = new Audio(require('../assets/mp3/' + (this.score % 10) + '.mp3'))
      const audioPlay = audio.play()
      if (audioPlay !== undefined) {
        audioPlay.then(() => { audio.play() })
          .catch(e => { audio.pause() })
      }
    },
   async recordSave() {
    this.$firebase.firestore().collection('game').doc(this.id).collection('rank').doc(this.uid).get()
    .then((e) => {
      this.userRecord = e.data()
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
      this.$firebase.firestore().collection("game").doc(this.id).collection("rank").doc(this.uid).set(data)
      .then(() => {
          this.saveOn = false;
          this.score=0
        }).catch((e) => { console.log(e); }).finally(() => {this.getRank()})
    },
    save2(){
      const record = Math.max(this.userRecord.record, this.score)
      const recordSum = this.userRecord.recordSum
      const recordRepeat = this.userRecord.recordRepeat
      const data = {
        ...this.userRecord,
        recordSum: recordSum + this.score,
        recordRepeat: recordRepeat + 1,
        record: record
      }
      this.$firebase.firestore().collection('game').doc(this.id).collection('rank').doc(this.uid).update(data)
      .then(() => {
          this.saveOn = false;
          this.score=0
        }).catch((e) => { console.log(e); }).finally(() => {this.getRank()})
    },
    // 게임관련
    btnRun (e) {
          if (this.crash) { return }
          const monster = this.$refs.monster.getBoundingClientRect()
          // const gameScreen = this.$refs.gameScreen.getBoundingClientRect().width - monster.width
          const gameScreen = this.$refs.gameScreen.getBoundingClientRect() 
          if (e === 'left') { 
            if(monster.x>gameScreen.x){
              this.xx -= this.step; this.navi = 'left';this.fire = true
            }
            // if (0 < monster.x ) { this.xx -= this.step;this.navi = 'left';this.fire = true;} 
            // else {this.xx = 10;this.fire = false;}
          }
          if (e === 'right') { 
          if(monster.x<gameScreen.width-monster.width){
            this.xx += this.step; this.navi = 'right';this.fire = true
            }
            // if (monster.x+monster.width < gameScreen.width) { this.xx += this.step ; this.navi = 'right' ; this.fire = true;
            // } else { this.xx = gameScreen.width - monster.width; this.fire = false;}
          }
          if (e === 'up') {  
          if(monster.y>gameScreen.y){
            this.yy -= this.step; this.navi = 'center';this.fire = true
            }
          }
          if (e === 'down') { 
          if(monster.y<gameScreen.y+gameScreen.height-monster.height){
            this.yy += this.step; this.navi = 'center'; this.fire = false
            }
           }
          if (e === 'stop') { this.navi = 'center' }
        },
    // randomX(){
    //       const screen = this.$refs.gameScreen.getBoundingClientRect()
    //     const gameScreenW = this.$refs.gameScreen.getBoundingClientRect().width - this.$refs.stars.getBoundingClientRect().width
    //       return Math.floor(Math.random() * gameScreenW)
    // },
    dropItem(e,i){
      const item = e.getBoundingClientRect()
      const mon = this.$refs.monster.getBoundingClientRect()
      const screen = this.$refs.gameScreen.getBoundingClientRect()
      this.starY += this.starSpeed
      this.virusY += this.starSpeed
      this.light = '';
      if(item.y-this.starfirstY>this.screen.height){
        console.log('바닥충돌') 
          
          if(i==='star'){
            this.ranX = Math.floor(Math.random() * screen.width)+screen.x
          }else if(i==='virus'){
            this.ranXX = Math.floor(Math.random() * screen.width)+screen.x
          }
       i==='star' ? this.starY =  -screen.y : this.virusY = -screen.y
      }
      if (item.y + item.height > mon.y && item.x + item.height > mon.x && item.x < mon.x + mon.height) {
          // this.hit = true
          console.log('충돌')
          if(i==='star'){
            this.score++
            this.ranX = Math.floor(Math.random() * screen.width)+screen.x
            this.light = 'up';
            console.log(this.light)
          }else if(i==='virus'){
            this.score>0?this.score--:this.score =0
            this.ranXX = Math.floor(Math.random() * screen.width)+screen.x
            this.light = 'down';
            console.log(this.light)
          }
       i==='star' ? this.starY = -screen.y : this.virusY = -screen.y
        }
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
}
.bgCanvas2 {
  background-color: var(--bg-color);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow-y: hidden;
  overflow-x: hidden;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 2px solid rgba(255, 255, 255, 0.2);
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
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
.card2 {
  height: 100%;
}
.light0{
  box-shadow: 0 0 10px 5px white;
}
.light1{
  box-shadow: 0 0 10px 5px yellow;
}
.light2{
  box-shadow: 0 0 10px 5px red;
}
.gamescreen{
  height:100%;
  background-color: black;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position:relative;
        overflow:hidden;
      /* background-image:url('@/assets/menu/banner0.png'); */
      // background-size: cover;
      // background-repeat:no-repeat;
      // background-position:center bottom
    }
    //게임관련
.reverse{
  transform: rotate( 90deg );
  }

  .monster{
    position:absolute;
  }
  @keyframes updown{
    0%,100%{
    transform:translatey(-2px) ;
  }
  50%{
    transform:translatey(2px)  ;    
  } }

  // 운석떨어지기  
  .drop1{
    position:absolute;
    top: -150px;
    animation:animate linear infinite;
  }
  .drop{
    position:absolute;
    top: -100px;
    width:1px;
    background:rgba(255,255,255,0.5);
    animation:animate linear infinite;
  }
  @keyframes animate{
    0%{ transform:translateY(0)}
    100%{transform:translateY(100vh)}
  }
  // 햄스터조종
  .right{
    animation:right 0.2s  infinite;
  }
  .left{
    animation:left 0.2s  infinite;
  }
  .center{
    animation:center 0.2s  infinite;
  }
  @keyframes center{
    0%,100%{
    transform:translatey(-2px) rotate(0deg);
  }
  50%{
    transform:translatey(2px) rotate(0deg);    
  } }
  @keyframes left{
    0%,100%{
    transform:translatey(-2px) rotate(-70deg);
  }
  50%{
    transform:translatey(2px) rotate(-70deg);    
  } }
  @keyframes right{
    0%,100%{
    transform:translatey(-2px) scaleX(-1) rotate(-70deg);
  }
  50%{
    transform:translatey(2px) scaleX(-1) rotate(-70deg);    
  } }
</style>
