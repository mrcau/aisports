<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-container class="font-italic white--text pb-15">
    <div class="d-flex mb-2">
      <v-btn color="var(--main-color)" text small to="/">
        <v-icon>mdi-36px mdi-home</v-icon> </v-btn
      ><v-spacer></v-spacer>
    </div>
    <div class="aiSection">
      <!-- <v-card class="cardRank"> -->
      <div class="topBar">
        <v-card-title>
          <h2>
            {{ data.title }}
          </h2>
        </v-card-title>

        <v-card-text>
          <v-row class="mx-0">
            <v-spacer></v-spacer>
            <div class="grey--text ms-4">
              <span style="color: var(--main-color)">{{ data.made }}</span>
            </div>
          </v-row>

          <div class="mt-5 text-subtitle-1">
            {{ data.content }}
          </div>
        </v-card-text>

        <v-card-actions>
          <v-icon color="white" class="mx-2">mdi-timetable</v-icon>
          <span>
            {{ data.endDate }}
          </span>
          <v-spacer></v-spacer>
          <v-icon color="white">mdi-account-group</v-icon>
          <span class="mx-2 mt-1">
            {{ data.members.length }}
          </span>
        </v-card-actions>
      </div>
      <v-card-text class="contentBg">
        <v-form>
          <v-container>
            <v-text-field
              v-model="data.title"
              label="제목"
              required
              dark
              dense
              :counter="20"
              color="var(--main-color)"
            ></v-text-field>
            <v-textarea
              v-model="data.content"
              label="내용"
              required
              dark
              textarea
              dense
              filled
              rows="3"
              outlined
              :counter="100"
              color="var(--main-color)"
            ></v-textarea>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="data.team"
                  label="운영자"
                  required
                  dark
                  dense
                  outlined
                  filled
                  :counter="10"
                  color="var(--main-color)"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="data.password"
                  label="입장 비밀번호"
                  required
                  dense
                  dark
                  :rules="Rules"
                  outlined
                  filled
                  :counter="10"
                  color="var(--main-color)"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-radio-group
              v-model="data.type"
              row
              dense
              dark
              style="margin-top: -10px"
            >
              <v-radio label="운동" value="workout" /> <v-spacer></v-spacer>
              <v-radio label="게임" value="game" />
            </v-radio-group>
            <v-text-field
              v-model="data.aiSrc"
              label="AI주소"
              required
              dark
              dense
              filled
              outlined
              :counter="100"
              color="var(--main-color)"
            ></v-text-field>
            <v-row>
              <v-col cols="12" sm="6">
                <v-textarea
                  v-model="data.infoText1"
                  label="동작1"
                  required
                  dark
                  dense
                  outlined
                  filled
                  rows="2"
                  :counter="50"
                  color="var(--main-color)"
                ></v-textarea>
              </v-col>
              <v-col cols="12" sm="6">
                <v-textarea
                  v-model="data.infoText2"
                  label="동작2"
                  required
                  dense
                  dark
                  outlined
                  :rules="Rules"
                  filled
                  rows="2"
                  :counter="50"
                  color="var(--main-color)"
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row style="margin: 0">
              <v-col cols="6">
                <div class="text-center">
                  <v-file-input
                    accept="image/*"
                    label="사진"
                    id="imginput"
                    @change="addPic"
                    style="display: none"
                  />
                  <label for="imginput">
                    <div
                      class="mx-auto"
                      :style="`background-image:url(${data.infoImg1})`"
                      style="
                        height: 150px;
                        border-radius: 2px;
                        background-size: contain;
                        background-repeat: no-repeat;
                        background-position: center;
                        cursor: pointer;
                      "
                    ></div>
                  </label>
                </div>
              </v-col>
              <v-col cols="6">
                <div class="text-center">
                  <v-file-input
                    accept="image/*"
                    label="사진"
                    id="imginput2"
                    @change="addPic2"
                    style="display: none"
                  />
                  <label for="imginput2">
                    <div
                      class="mx-auto"
                      :style="`background-image:url(${data.infoImg2})`"
                      style="
                        height: 150px;
                        border-radius: 2px;
                        background-size: contain;
                        background-repeat: no-repeat;
                        background-position: center;
                        cursor: pointer;
                      "
                    ></div>
                  </label>
                </div>
              </v-col>
            </v-row>
            <v-row style="margin: -10px 0 0 0">
              <v-col cols="6">
                <v-menu transition="scale-transition" offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="data.startDate"
                      prepend-icon="mdi-calendar"
                      readonly
                      label="시작날짜"
                      v-bind="attrs"
                      v-on="on"
                      dark
                    />
                  </template>
                  <v-date-picker v-model="data.startDate" no-title scrollable />
                </v-menu>
              </v-col>
              <v-col cols="6">
                <v-menu transition="scale-transition" offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="data.endDate"
                      prepend-icon="mdi-calendar"
                      readonly
                      label="마감날짜"
                      v-bind="attrs"
                      v-on="on"
                      dark
                    />
                  </template>
                  <v-date-picker v-model="data.endDate" no-title scrollable />
                </v-menu>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <v-divider dark color="var(--main-color)"></v-divider>
        <v-spacer></v-spacer>
        <v-btn class="my-5" :loading="loading" dark depressed @click="save">
          <h2>SAVE</h2>
        </v-btn>
      </v-card-text>
      <!-- </v-card> -->
    </div>
  </v-container>
</template>

<script>
export default {
  name: "DialogCreate",
  data() {
    return {
      data: {
        creator: "홍길동",
        team: "안산해양중",
        title: "",
        content: "내가짱이다내가짱이다내가짱이다.",
        type: "workout",
        aiSrc: "https://teachablemachine.withgoogle.com/models/JDpmv3fs7/",
        infoImg1: require("@/assets/fitness/sp2.png"),
        infoImg2: require("@/assets/fitness/sp1.png"),
        infoText1: "내가짱sdfsdfsdfsdf내가짱sdfsdfsdfsdf",
        infoText2: "내가짱s sdfsdf내가짱sdfsdfsdfsdf",
        startDate: "",
        endDate: "",
        password: "1233",
        people: 7,
        img: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
        rating: 3.5,
        members: [],
      },
      members: [1115, "member"],
      progress: "false",
      menuDate1: "false",
      menuDate2: "false",
      file: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
      imgsrc: "",
      loading: false,
      Rules: [(v) => !!v || "필수입력란"],
    };
  },

  mounted() {},

  methods: {
    async addPic(e) {
      this.file = e;
      const url = URL.createObjectURL(e);
      this.infoImg1 = url;
    },
    async addPic2(e) {
      this.file = e;
      const url = URL.createObjectURL(e);
      this.infoImg2 = url;
    },
    save() {
      this.loading = true;
      const id = Date.now().toString();
      this.$firebase
        .firestore()
        .collection("workout")
        .doc(id)
        .set(this.data)
        .then(() => {
          console.log("saved");
        })
        .catch((e) => console.log(e))
        .finally(() => {
          this.loading = false;
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

.aiSection {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: stretch;
  overflow: hidden;
  background-image: url(../assets/fitness/card-col1.png);
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
.contentBg {
  background-color: rgb(43, 40, 40);
}
</style>
