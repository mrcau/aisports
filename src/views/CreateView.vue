<template>
  <v-container class="font-italic white--text pb-15">
    <div class="d-flex mb-2">
      <v-btn color="var(--main-color)" text small to="/">
        <v-icon>mdi-36px mdi-home</v-icon> </v-btn
      ><v-spacer></v-spacer>
    </div>
    <div class="aiSection">
      <!-- 상단정보 -->
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
              <span style="color: var(--main-color)">{{ data.team }}</span>
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
      <!-- 입력폼 -->
      <v-card-text class="contentBg">
        <v-form>
          <v-container>
            <!-- 운동게임 선택 -->
            <!-- <v-btn-toggle v-model="toggle" mandatory style="display: flex">
              <v-btn
                :color="toggle ? 'grey' : 'var(--main-color)'"
                @click="data.type = 'workout'"
                style="flex: 1"
              >
                <h2 class="white--text">WORKOUT</h2>
              </v-btn>
              <v-btn
                :color="!toggle ? 'grey' : 'var(--main-color)'"
                @click="data.ype = 'game'"
                style="flex: 1"
              >
                <h2 class="white--text">GAME</h2>
              </v-btn>
            </v-btn-toggle> -->

            <v-row class="pt-1">
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="data.title"
                  label="제목"
                  required
                  :rules="Rules"
                  dark
                  dense
                  :counter="20"
                  color="var(--main-color)"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="data.team"
                  label="운영자"
                  required
                  :rules="Rules"
                  dark
                  dense
                  :counter="10"
                  color="var(--main-color)"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-textarea
              v-model="data.content"
              label="내용"
              required
              :rules="Rules"
              dark
              textarea
              dense
              filled
              rows="2"
              outlined
              :counter="100"
              color="var(--main-color)"
              class="pt-7"
            ></v-textarea>
            <v-row>
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
                      color="var(--main-color)"
                      dark
                    />
                  </template>
                  <v-date-picker v-model="data.endDate" no-title scrollable />
                </v-menu>
              </v-col>
              <v-col class="pt-8" cols="6">
                <v-text-field
                  v-model="data.time"
                  label="운동시간"
                  dense
                  dark
                  required
                  :rules="Rules"
                  color="var(--main-color)"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-radio-group v-model="selector" row dense dark>
              <v-radio label="기본동작" value="basic" /> <v-spacer></v-spacer>
              <v-radio label="수정" value="custom" />
            </v-radio-group>
            <v-text-field
              v-model="data.aiSrc"
              label="AI주소"
              required
              :rules="Rules"
              :disabled="selector != 'custom'"
              dark
              dense
              filled
              outlined
              :counter="100"
              color="var(--main-color)"
            ></v-text-field>
            <v-row class="mt-3">
              <v-col cols="12" sm="6">
                <v-textarea
                  v-model="data.infoText1"
                  label="Pose1"
                  :disabled="selector != 'custom'"
                  required
                  :rules="Rules"
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
                  label="Pose2"
                  :disabled="selector != 'custom'"
                  required
                  :rules="Rules"
                  dense
                  dark
                  outlined
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
                    :disabled="selector != 'custom'"
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
                      "
                    >
                      <h2
                        style="line-height: 150px; cursor: pointer"
                        v-if="selector === 'custom'"
                      >
                        Pose1 변경
                      </h2>
                    </div>
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
                    :disabled="selector != 'custom'"
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
                      "
                    >
                      <h2
                        style="line-height: 150px; cursor: pointer"
                        v-if="selector === 'custom'"
                      >
                        Pose2 변경
                      </h2>
                    </div>
                  </label>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <v-divider dark color="var(--main-color)"></v-divider>
        <div class="d-flex pa-2">
          <v-btn-toggle
            v-model="openTF"
            color="var(--main-color)"
            group
            mandatory
            class="mr-3"
          >
            <v-btn>
              <v-icon>mdi-lock-open-variant-outline</v-icon>
            </v-btn>
            <v-btn>
              <v-icon>mdi-lock-outline</v-icon>
            </v-btn>
          </v-btn-toggle>
          <v-text-field
            v-model="data.password"
            label="입장 비밀번호"
            dense
            dark
            :disabled="!openTF"
            color="var(--main-color)"
            style="transform: translateY(15px)"
          ></v-text-field>
        </div>

        <v-btn
          :loading="loading"
          color="var(--main-color)"
          block
          depressed
          @click="save"
        >
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
        id: "",
        creator: "홍길동",
        team: "한국중학교",
        title: "제목",
        content: "어깨운동",
        time: 60,
        type: "workout",
        aiSrc: "https://teachablemachine.withgoogle.com/models/JDpmv3fs7/",
        infoImg1: require("@/assets/fitness/sp2.png"),
        infoImg2: require("@/assets/fitness/sp1.png"),
        infoText1:
          "양 팔을 올리고 팔꿈치를 구부려 두 손이 어깨 위치에 오도록 합니다.",
        infoText2: "팔꿈치를 펴서 두 손을 머리 위로 올립니다.",
        startDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substring(0, 10),
        endDate: "",
        password: "",
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
      toggle: true,
      openTF: false,
      selector: "basic",
      Rules: [(v) => !!v || "필수입력란"],
    };
  },

  mounted() {},

  methods: {
    async addPic(e) {
      this.file = e;
      const url = URL.createObjectURL(e);
      this.data.infoImg1 = url;
    },
    async addPic2(e) {
      this.file = e;
      const url = URL.createObjectURL(e);
      this.data.infoImg2 = url;
    },
    save() {
      this.loading = true;
      const id = Date.now().toString();
      this.data.id = id;
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
          // this.$router.push("/");
          this.$router.push({
            name: "play",
            params: { id: id },
          });
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
  border-bottom: solid 3px var(--main-color);
}
.cameraInfo {
  border-top: solid 5px #ccf863;
}
.contentBg {
  background-color: rgb(43, 40, 40);
}
</style>
