import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
import "firebase/firestore";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fireUser: null,
    admin: false,
    fireUid: "",
  },
  getters: {},
  mutations: {
    setFierUser(state, fu) {
      state.fireUser = fu;
      if (!state.fireUser) {
        return;
      }
      state.fireUid = fu.uid;
      if (fu.uid === "MXPvgEa9mgMrhyjgxiQx8hxqoD53") {
        state.admin = true;
      } else {
        state.admin = false;
      }
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
