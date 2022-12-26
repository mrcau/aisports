<template>
  <v-container>
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Search"
      single-line
      hide-details
    />
    <v-row class="homeheader pa-5">
      <v-col
        color="info"
        v-for="(item, i) in items"
        :key="i"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card :loading="loading" class="mx-auto">
          <v-img
            height="250"
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
          >
            <div
              class="ma-5"
              style="background-color: white; backdrop-filter: blur(20px)"
            >
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
            <v-btn color="deep-purple lighten-2" text @click="reserve">
              Reserve
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-card width="400">
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
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HomeView",

  components: {},
  data() {
    return {
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
