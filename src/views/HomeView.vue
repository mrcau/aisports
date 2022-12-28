<template>
  <v-container class="font-italic white--text pb-15">
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Search"
      single-line
      hide-details
    />
    <!-- 점보 -->
    <MainJumbo />
    <!-- 메뉴 -->
    <v-row>
      <v-col v-for="(n, i) in menus" :key="i" cols="12" sm="6">
        <v-card style="background: #d7e357">
          <v-img
            :src="`${require('@/assets/fitness/' + n.img)}`"
            max-height="250"
          >
            <div class="ma-10 pa-5 rounded-xl menuBox">
              <h1 class="white--text">{{ n.title }}</h1>
              <h3 class="mt-5" style="color: #d7e357">{{ n.content }}</h3>
            </div>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
    <!-- 새로운운동 타이틀 -->
    <h3 class="mt-8 text-left italic title" style="color: #d7e357">
      <v-icon color="#d7e357" class="mb-1">mdi-dumbbell</v-icon> New Workout
    </h3>
    <!-- 새로운운동 아이템들 -->
    <v-row class="itemRow">
      <v-col v-for="(n, i) in items" :key="i" cols="6" md="4">
        <v-card :loading="loading" class="mx-auto" style="background: #d7e357">
          <v-img
            height="200"
            :src="
              n.img
                ? `${n.img}`
                : 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'
            "
          >
            <v-card-title>
              <h2 class="white--text">
                {{ n.title }}
              </h2>
            </v-card-title>

            <v-card-text>
              <v-row align="center" class="mx-0">
                <v-rating
                  :value="4.5"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="14"
                ></v-rating>

                <div class="grey--text ms-4">4.5 (413)</div>
              </v-row>

              <div class="my-4 text-subtitle-1">$ • Italian, Cafe</div>

              <div>
                Small plates, salads & sandwiches - an intimate setting with 12
                indoor seats plus patio seating.
              </div>
            </v-card-text>
          </v-img>

          <v-card-actions>
            <v-btn color="deep-purple lighten-2" text> Reserve </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- 새로운게임 타이들 -->
    <h2 class="text-left mt-10 title" style="color: #d7e357">
      <v-icon color="#d7e357" class="mb-1">mdi-gamepad-variant-outline</v-icon>
      New Game
    </h2>
    <!-- 새로운게임 아이템들 -->
    <v-row class="itemRow">
      <v-col color="info" v-for="n in 5" :key="n" cols="6" md="4">
        <!-- <v-card width="400"> -->
        <v-card>
          <v-img
            height="200px"
            src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
          >
            <v-app-bar flat color="rgba(0, 0, 0, 0)">
              <v-app-bar-nav-icon color="white"></v-app-bar-nav-icon>

              <v-toolbar-title class="text-h6 white--text pl-0">
                Messages
              </v-toolbar-title>

              <v-spacer></v-spacer>

              <v-btn color="white" icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-app-bar>

            <v-card-title class="white--text mt-8">
              <v-avatar size="56">
                <img
                  alt="user"
                  src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg"
                />
              </v-avatar>
              <p class="ml-3">John Doe</p>
            </v-card-title>
          </v-img>
          <v-card-actions>
            <v-list-item-avatar color="grey darken-3">
              <v-img
                src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Evan You</v-list-item-title>
            </v-list-item-content>

            <v-row class="mr-1" justify="end">
              <v-icon class="mr-1"> mdi-heart </v-icon>
              <span class="subheading mr-2">256</span>
              <span class="mr-1">·</span>
              <v-icon class="mr-1"> mdi-share-variant </v-icon>
              <span class="subheading">45</span>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MainJumbo from "@/components/MainJumbo.vue";

export default {
  name: "HomeView",

  components: { MainJumbo },
  data() {
    return {
      search: "",
      loading: false,
      menus: [
        {
          title: "WORKOUT",
          content: "새로운 운동 개설",
          img: "card1.png",
        },
        {
          title: "GAME",
          content: "운동 운동참여",
          img: "card2.png",
        },
        {
          title: "CREATE",
          content: "게임 운동참여",
          img: "card3.png",
        },
        { title: "Diary", content: "운동랭킹을 한눈에", img: "card4.png" },
      ],
      items: [
        {
          id: "12313",
          title: "내가짱",
          content: "내가짱이다내가짱이다내가짱이다.",
          name: "홍길동",
          school: "안산해양중",
          people: 7,
          password: "1233",
          startDate: "2022-10-22",
          endDate: "2022-12-22",
          img: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
        },
        {
          id: "15533",
          title: "우리짱",
          content: "우리짱이다.",
          name: "이숭동",
          school: "봉담고",
          people: 4,
          password: "1233",
          startDate: "2022-10-12",
          endDate: "2022-12-22",
          img: "https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg",
        },
        {
          id: "125353",
          title: "모두짱",
          content: "모두짱이다모두짱이다모두짱이다모두짱이다모두짱이다.",
          name: "김고동",
          school: "오현초",
          people: 2,
          password: "1233",
          startDate: "2022-10-25",
          endDate: "2022-12-22",
          img: "",
        },
      ],
    };
  },
};
</script>
<style scoped>
.menuBox {
  height: 170px;
  cursor: pointer;
  transition: all 0.5s;
  backdrop-filter: blur(5px);
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
.menuBox:hover {
  background: rgba(255, 255, 0, 0.5);
  height: 170px;
}
.title {
  text-shadow: 2px 2px 2px gray;
}
.itemRow {
  flex-wrap: nowrap;
  overflow-x: auto;
}
/* .menuBox:hover h1 {
  transition: all 0.2s;
  transform: scale(1.5);
}
.menuBox:hover h3 {
  transition: all 0.2s;
  transform: translateY(20px);
} */
</style>
