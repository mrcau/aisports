<template>
  <v-container class="font-italic white--text pb-15">
    <!-- 로그인 -->
    <div class="d-flex login" style="height:45px"> 
        <v-btn rounded color="var(--main-color)" @click="dialogLogin = true" v-if="!$store.state.fireUser"  >
          <h3>Login</h3>
        </v-btn>
        <v-progress-circular indeterminate color="var(--main-color)"  v-if="$store.state.fireUser&&!$store.state.userData"  />
        <v-speed-dial v-model="fab"    direction="right"  v-if="$store.state.fireUser&&$store.state.userData"  >
            <template v-slot:activator> 
              <v-btn v-model="fab" small color="transparent" dark fab style="transform: translateX(10px);" >
                <Avataaars :width="50" :height="50" :avatarOptions="$store.state.userData.options"  />
              </v-btn>
            </template> 
            <v-btn rounded dark small @click="logout" color="var(--main-color)" style="color:black"  >
              Logout
            </v-btn>
        </v-speed-dial>
    </div> 
    <v-dialog v-model="dialogLogin" max-width="500px">
      <DialogLogin @close="dialogLogin = false" />
    </v-dialog>
    <!-- 점보 -->
    <MainJumbo />  
    <!-- 메뉴 -->
    <v-row class="mt-3">
      <!-- <v-col v-for="(n, i) in menus" :key="i" cols="6">
        <v-card style="background: #303030; position: relative">
          <v-img :src="`${require('@/assets/fitness/' + n.img)}`" max-height="200" style="padding: 20px" >
            <div class="d-flex justify-center align-center menuBox" @click="dialogGo(n.src)" >
              <h1 class="white--text smallText">{{ n.title }}</h1>
            </div>
          </v-img>
        </v-card>
      </v-col> -->
      <v-col   cols="6">
        <v-card style="background: #303030; position: relative"  >
          <v-img :src="`${require('@/assets/fitness/card1.png')}`" max-height="200" style="padding: 20px" >
            <div class="d-flex justify-center align-center menuBox" style="background: rgba(255, 255, 255, 0.3)" >
              <h1 style="font-size:var(--h1-size);color:white">WORKOUT</h1>
            </div>
          </v-img>
        </v-card>
      </v-col>
      <v-col   cols="6">
        <v-card style="background: #303030; position: relative"  >
          <v-img :src="`${require('@/assets/fitness/card2.png')}`" max-height="200" style="padding: 20px" >
            <div class="d-flex flex-column justify-center align-center menuBox" style="background: rgba(255, 255, 255, 0.3)" >
              <h1 style="font-size:var(--h1-size);color:white">ROUTINE</h1>
            </div>
          </v-img>
        </v-card>
      </v-col>
      <v-col   cols="6">
        <v-card style="background: #303030; position: relative"  >
          <v-img :src="`${require('@/assets/fitness/card3.png')}`" max-height="200" style="padding: 20px" >
            <div class="d-flex flex-column justify-center align-center menuBox" @click="$store.state.admin?$router.push('/create'):'#'"  >
              <h1 style="font-size:var(--h2-size);color:white">CREATE</h1>
              <h1 style="font-size:var(--h2-size);color:white">CHALLENGE</h1>
            </div>
          </v-img>
        </v-card>
      </v-col>
      <v-col   cols="6">
        <v-card style="background: #303030; position: relative">
          <v-img :src="`${require('@/assets/fitness/card4.png')}`" max-height="200" style="padding: 20px" >
            <div class="d-flex flex-column justify-center align-center menuBox" @click="$store.state.admin?$router.push('/creategame'):'#'"  >
              <h1 style="font-size:var(--h2-size);color:white">CREATE</h1>
              <h1 style="font-size:var(--h2-size);color:white">GAME</h1>
            </div>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
    <!-- 새로운운동 타이틀 -->
    <h3 class="mt-5 text-left italic title" style="color: #d7e357">
      <v-icon color="#d7e357" class="mb-1">mdi-dumbbell</v-icon> New Challenge
    </h3>
    <!-- 새로운운동 아이템들 -->
    <v-row class="itemRow">
      <!-- <v-col v-for="(n, i) in items.filter( (n) => n.type === 'workout' && dateCompare(n.endDate) )" -->
      <v-col v-for="(n, i) in items.filter( (n) => dateCompare(n.endDate) )"
        :key="i" cols="12" sm="6" md="4" lg="3" >
        <v-card :loading="loading" class="mx-auto" style="background: #d7e357" @click="routLink(n,'play')" >
          <v-img max-height="150" :src="`${require('@/assets/fitness/card1.png')}`" > 
            <div class="ma-3 pb-5 rounded-lg white--text menuBox workout">
              <v-card-title><h3>{{ n.title }}</h3></v-card-title>
              <v-card-text>
                <v-row class="mx-0">
                  <v-rating :value="n.rating" color="amber" dense half-increments readonly size="14" ></v-rating>
                  <v-spacer></v-spacer>
                  <div class="grey--text ms-4">
                    <span style="color: var(--second-color)">{{ n.team }}</span>
                  </div>
                </v-row>
                <div class="mt-5 text-subtitle-1">
                  {{ n.content }}
                </div>
              </v-card-text>
            </div>
          </v-img>
          <v-card-actions >
            <v-icon >mdi-timetable</v-icon> {{ n.endDate }}
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- 새로운게임 타이들 -->
    <h2 class="text-left mt-5 title" style="color: #d7e357">
      <v-icon color="#d7e357" class="mb-1">mdi-gamepad-variant-outline</v-icon>
      New Game
    </h2>
    <!-- 새로운게임 아이템들 -->
    <v-row class="itemRow">
      <!-- <v-col v-for="(n, i) in items.filter( (n) => n.type === 'workout' && dateCompare(n.endDate) )" -->
      <v-col v-for="(n, i) in items2.filter( (n) => dateCompare(n.endDate) )"
        :key="i" cols="12" sm="6" md="4" lg="3" >
        <v-card :loading="loading" class="mx-auto" style="background: #d7e357" @click="routLink(n,'game')" >
          <v-img max-height="150" :src="`${require('@/assets/fitness/card3.png')}`" > 
            <div class="ma-3 pb-5 rounded-lg white--text menuBox workout">
              <v-card-title><h3>{{ n.title }}</h3></v-card-title>
              <v-card-text>
                <v-row class="mx-0">
                  <v-rating :value="n.rating" color="amber" dense half-increments readonly size="14" ></v-rating>
                  <v-spacer></v-spacer>
                  <div class="grey--text ms-4">
                    <span style="color: var(--second-color)">{{ n.team }}</span>
                  </div>
                </v-row>
                <div class="mt-5 text-subtitle-1">
                  {{ n.content }}
                </div>
              </v-card-text>
            </div>
          </v-img>
          <v-card-actions >
            <v-icon >mdi-timetable</v-icon> {{ n.endDate }}
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DialogLogin from "@/components/DialogLogin.vue";
import MainJumbo from "@/components/MainJumbo.vue";
import Avataaars from "vue-avataaars";
export default {
  name: "HomeView",
  components: { MainJumbo, Avataaars, DialogLogin },
  data() {
    return {
      fab:false,
      today: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substring(0, 10),
      dialogLogin: false,
      loading: false,
      // menus: [ 
      //   {title: "challenge exercise", content: "운동 생성",src:'create',img: "card3.png",},
      //   { title: "create challenge", content: "참여 현황",src:'create', img: "card4.png" },
      // ],
      items: [], 
      items2: [], 
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$firebase.firestore().collection("workout").get().then((sn) => {
          this.items = sn.docs.map((e) => e.data());
        }).catch((e) => console.log(e));
      this.$firebase.firestore().collection("game").get().then((sn) => {
          this.items2 = sn.docs.map((e) => e.data());
        }).catch((e) => console.log(e));
    },
    dateCompare(day) {
      if (day) {
        const date1 = new Date(this.today);
        const date2 = new Date(day);
        return date1 <= date2;
      } else {
        return true;
      }
    },
    routLink(n,a) {
      this.$router.push({
        name: a,
        params: { id: n.id },
        // params: { id: n.id, data: n },
      });
    },
    logout() {
      this.$firebase.auth().signOut();
    },
  },
};
</script>
<style scoped>
.menuBox {
  height: 100%;
  cursor: pointer;
  transition: all 0.5s;
  backdrop-filter: blur(5px);
  border-radius: 20px;
  background: rgba(255, 255, 0, 0.5);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
.menuBox:hover {
  background: rgba(255, 255, 255, 0.3); 
}
.menuBox.workout {
  background: rgba(0, 0, 0, 0.3);
  border: none;
  border-right: none;
  border-bottom: none;
  overflow: hidden;
}
 
.menuBox.workout:hover {
  background: rgba(255, 255, 0, 0.5);
}
.title {
  text-shadow: 2px 2px 2px gray;
}
.itemRow {
  flex-wrap: nowrap;
  overflow-x: auto;
}
.menuBox:hover h3 {
  transition: all 0.2s;
  transform: scale(1.1);
}
.smallText {
  text-transform: uppercase;
}
/* .login {
  margin-top: 20px;
} */
@media (max-width: 500px) {
  .smallText {
    font-size: x-large;
  }
  .menuBox {
    border-radius: 10px;
  }
  /* .login {
    margin-top: 2px;
  } */
}
</style>
