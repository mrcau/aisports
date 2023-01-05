<template>
  <v-container class="font-italic white--text pb-15">
    <!-- 로그인 -->
    <div class="d-flex login">
      <Avataaars :width="50" :height="50" :avatarOptions="options" />
      <v-btn
        rounded
        color="var(--main-color)"
        class="mb-2"
        dark
        @click="dialogLogin = true"
      >
        <h2 style="color: #303030">LOGIN</h2>
      </v-btn>
    </div>
    <v-dialog v-model="dialogLogin" max-width="500px">
      <DialogLogin />
    </v-dialog>
    <!-- 점보 -->
    <MainJumbo />
    <!-- 메뉴 -->
    <v-row class="mt-3">
      <v-col v-for="(n, i) in menus" :key="i" cols="6">
        <v-card style="background: #303030; position: relative">
          <v-img
            :src="`${require('@/assets/fitness/' + n.img)}`"
            max-height="200"
            style="padding: 20px"
          >
            <div
              class="d-flex justify-center align-center menuBox"
              @click="dialogGo(n.title)"
            >
              <h1 class="white--text smallText">{{ n.title }}</h1>
            </div>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
    <!-- 새로운운동 타이틀 -->
    <h3 class="mt-5 text-left italic title" style="color: #d7e357">
      <v-icon color="#d7e357" class="mb-1">mdi-dumbbell</v-icon> New Workout
    </h3>
    <!-- 새로운운동 아이템들 -->
    <v-row class="itemRow">
      <v-col
        v-for="(n, i) in items.filter(
          (n) => n.type === 'workout' && dateCompare(n.endDate)
        )"
        :key="i"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card
          :loading="loading"
          class="mx-auto"
          style="background: #d7e357"
          @click="routLink(n)"
        >
          <v-img
            max-height="150"
            :src="`${require('@/assets/fitness/card1.png')}`"
          >
            <!-- <v-img
            height="200"
            :src="
              n.img ? `${n.img}` : `${require('@/assets/fitness/cards1.png')}`
            "
          > -->
            <div class="ma-3 pb-5 rounded-lg white--text menuBox workout">
              <v-card-title>
                <h3>
                  {{ n.title }}
                </h3>
              </v-card-title>

              <v-card-text>
                <v-row class="mx-0">
                  <v-rating
                    :value="n.rating"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="14"
                  ></v-rating>
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

          <v-card-actions>
            <v-icon>mdi-timetable</v-icon> {{ n.endDate }}
            <v-spacer></v-spacer>
            <v-icon>mdi-account-group</v-icon>
            <span class="mx-2 mt-1">
              {{ n.members.length }}
            </span>
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
      <v-col
        v-for="(n, i) in items.filter((n) => n.type === 'game' && n.progress)"
        :key="i"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card
          :loading="loading"
          class="mx-auto"
          style="background: #c6ef60"
          @click="routLink(n)"
        >
          <v-img height="200" :src="`${require('@/assets/fitness/card3.png')}`">
            <div class="ma-3 pb-5 rounded-lg white--text menuBox workout">
              <v-card-title>
                <h2 class="cardTitle">
                  {{ n.title }}
                </h2>
              </v-card-title>

              <v-card-text>
                <v-row class="mx-0">
                  <v-rating
                    :value="n.star"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="14"
                  ></v-rating>
                  <v-spacer></v-spacer>
                  <div class="grey--text ms-4">
                    <span style="color: var(--main-color)">{{ n.team }}</span>
                  </div>
                </v-row>

                <div class="mt-5 text-subtitle-1">
                  {{ n.content }}
                </div>
              </v-card-text>
            </div>
          </v-img>

          <v-card-actions>
            <v-icon>mdi-timetable</v-icon> {{ n.endDate }}
            <v-spacer></v-spacer>
            <v-icon>mdi-account-group</v-icon>
            <span class="mx-2 mt-1">
              {{ n.members.length }}
            </span>
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
  creator: "HomeView",

  components: { MainJumbo, Avataaars, DialogLogin },
  data() {
    return {
      today: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substring(0, 10),
      dialogLogin: false,
      loading: false,
      menus: [
        {
          title: "workout",
          content: "운동 참여",
          img: "card1.png",
        },
        {
          title: "game",
          content: "게임 참여",
          img: "card2.png",
        },
        {
          title: "create",
          content: "운동 생성",
          img: "card3.png",
        },
        { title: "board", content: "참여 현황", img: "card4.png" },
      ],
      items: [
        {
          // Date.now().toString()
          id: "sdsd",
          title: "내가짱sdfsdfsdfsdfsdfssdfdsdfsdfsdfsdfsdfsdf",
          content: "내가짱이다내가짱이다내가짱이다.",
          creator: "홍길동",
          team: "한국중학교",
          people: 7,
          password: "1233",
          startDate: "2022-10-22",
          endDate: "2023-12-31",
          type: "workout",
          img: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
          rating: 3.5,
          aiSrc: "https://teachablemachine.withgoogle.com/models/JDpmv3fs7/",
          members: [1115, "member"],
          progress: "false",
          infoImg1: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
          infoImg2: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
          infoText1: "내가짱sdfsdfsdfsdf내가짱sdfsdfsdfsdf",
          infoText2:
            "내가짱sdfsdfsdfsdf내가짱sdfsdfsdfsdf내가짱sdfsdfsdfsdf내가짱sdfsdfsdfsdf",
        },
      ],
      options: {
        backgroundType: "transparent",
        backgroundColor: "black",
        skinColor: "light",
        clothesType: "blazerShirt",
        clothesColor: "black",
        clothesGraphicsType: "diamond",
        eyesType: "cry",
        eyebrowType: "angry",
        mouthType: "disbelief",
        facialHairType: "beardMedium",
        facialHairColor: "auburn",
        accessoriesType: "eyepatch",
        topType: "hijab",
        topColor: "blonde",
      },
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$firebase
        .firestore()
        .collection("workout")
        .get()
        .then((sn) => {
          this.items = sn.docs.map((e) => e.data());
          console.log(this.items);
        })
        .catch((e) => console.log(e))
        .finally(() => {
          console.log("complete get Data");
        });
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
    routLink(n) {
      this.$router.push({
        name: "play",
        params: { id: n.id },
        // params: { id: n.id, data: n },
      });
    },
    dialogGo(n) {
      console.log(n);
      if (n === "create") {
        this.$router.push("/create");
      }
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
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
.menuBox:hover {
  background: rgba(255, 255, 0, 0.5);
}
.menuBox.workout {
  background: rgba(0, 0, 0, 0.3);
  border: none;
  border-right: none;
  border-bottom: none;
  overflow: hidden;
}
.menuBox:hover {
  background: rgba(255, 255, 0, 0.5);
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
.login {
  margin-top: 20px;
}
@media (max-width: 500px) {
  .smallText {
    font-size: x-large;
  }
  .menuBox {
    border-radius: 10px;
  }
  .login {
    margin-top: 2px;
  }
}
</style>
