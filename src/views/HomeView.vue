<template>
  <v-container>
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Search"
      single-line
      hide-details
    />
    <MainJumbo />
    <v-row>
      <v-col v-for="(n, i) in menus" :key="i" cols="12" sm="6">
        <v-card>
          <v-img
            :src="`${require('@/assets/fitness/' + n.img)}`"
            max-height="250"
          >
            <div
              class="ma-10 pa-5 rounded-xl"
              style="background: rgba(0, 0, 0, 0.5); height: 170px"
            >
              <h1 class="white--text">{{ n.title }}</h1>
              <h3 style="color: #d7e357">{{ n.content }}</h3>
            </div>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
    <h3 class="mt-8 text-left">최근 운동</h3>
    <v-row>
      <v-col color="info" v-for="(item, i) in items" :key="i">
        <!-- <v-col
        color="info"
        v-for="(item, i) in items"
        :key="i"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      > -->
        <v-card :loading="loading" class="mx-auto">
          <v-img
            height="200"
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
          >
            <div class="ma-5">
              <v-card-title>Cafe Badilico</v-card-title>

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
                  Small plates, salads & sandwiches - an intimate setting with
                  12 indoor seats plus patio seating.
                </div>
              </v-card-text>
            </div>
          </v-img>

          <v-divider class="mx-4"></v-divider>

          <v-card-actions>
            <v-btn color="deep-purple lighten-2" text> Reserve </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <h2 class="text-left mt-10">인기 운동</h2>

    <v-row>
      <v-col color="info" v-for="n in 5" :key="n" cols="6">
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

          <v-card-text>
            <div class="font-weight-bold ml-8 mb-2">Today</div>

            <v-timeline align-top dense>
              <v-timeline-item
                v-for="message in messages"
                :key="message.time"
                :color="message.color"
                small
              >
                <div>
                  <div class="font-weight-normal">
                    <strong>{{ message.from }}</strong> @{{ message.time }}
                  </div>
                  <div>{{ message.message }}</div>
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col color="info" v-for="n in 5" :key="n">
        <v-card class="mx-auto" color="#26c6da" dark>
          <v-card-title>
            <v-icon large left> mdi-twitter </v-icon>
            <span class="text-h6 font-weight-light">Twitter</span>
          </v-card-title>

          <v-card-text class="text-h5 font-weight-bold">
            "Turns out semicolon-less style is easier and safer in TS because
            most gotcha edge cases are type invalid as well."
          </v-card-text>

          <v-card-actions>
            <v-list-item class="grow">
              <v-list-item-avatar color="grey darken-3">
                <v-img
                  class="elevation-6"
                  alt=""
                  src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                ></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>Evan You</v-list-item-title>
              </v-list-item-content>

              <v-row align="center" justify="end">
                <v-icon class="mr-1"> mdi-heart </v-icon>
                <span class="subheading mr-2">256</span>
                <span class="mr-1">·</span>
                <v-icon class="mr-1"> mdi-share-variant </v-icon>
                <span class="subheading">45</span>
              </v-row>
            </v-list-item>
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
        },
      ],
    };
  },
};
</script>
<style></style>
