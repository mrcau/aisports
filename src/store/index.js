import Vue from "vue";
import Vuex from "vuex";
// import firebase from "firebase";
// import "firebase/firestore";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    fireUser: null,
    admin: false,
    userData: null,
  },
  getters: {},
  mutations: {
    //로그인- 관리자판정
    authTF(state, fu) {
      state.fireUser = fu;
      state.admin = false;
      if (!fu) {
        state.userData = fu;
        return;
      }
      if (fu.uid === process.env.VUE_APP_FIREBASE_Admin) {
        state.admin = true;
      } else {
        state.admin = false;
      }
    },
    //유저데이터 저장
    setUserData(state, data) {
      state.userData = data;
    },
  },
  // actions: {
  //   getUserdata(context) {
  //     firebase
  //       .firestore()
  //       .collection("user")
  //       .doc(this.state.fireUid)
  //       .get()
  //       .then((e) => {
  //         const data = e.data();
  //         context.commit("setUserData", data);
  //       });
  //   },
  // },
});
