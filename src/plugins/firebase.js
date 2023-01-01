import vue from "vue";
import firebase from "firebase";
import "firebase/database";
import "firebase/storage";
import "firebase/firestore";
import "firebase/auth";
import firebaseConfig from "./firebaseConfig";

import store from "../store";

firebase.initializeApp(firebaseConfig);
vue.prototype.$firebase = firebase;

firebase.auth().onAuthStateChanged((fu) => {
  store.commit("setFierUser", fu);
  if (fu) {
    firebase
      .firestore()
      .collection("user")
      .doc(fu.uid)
      .get()
      .then((e) => {
        const data = e.data();
        store.commit("setUserData", data);
      });
    // store.dispatch('getRadar')
    store.dispatch("getUserdata");
  }
});
