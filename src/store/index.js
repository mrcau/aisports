import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
import "firebase/firestore";
// import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
  // plugins: [createPersistedState()],
  state: {
    fireUser: null,
    admin: false,
    fireUid: "",
    userData: null,
  },
  getters: {},
  mutations: {
    adminTF(state, fu) {
      state.fireUser = fu;
      if (!state.fireUser) {
        return;
      }
      state.fireUid = fu.uid;
      if (fu.uid === "UeiJvPIx2GYB4nCmKYb8ob49FUF3") {
        state.admin = true;
      } else {
        state.admin = false;
      }
    },
    setUserData(state, data) {
      state.userData = data;
    },
  },
  actions: {
    getUserdata(store) {
      firebase
        .firestore()
        .collection("user")
        .doc(this.state.fireUid)
        .get()
        .then((e) => {
          const data = e.data();
          store.commit("setUserData", data);
        });
    },
  },
  modules: {},
});
