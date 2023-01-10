import vue from "vue";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import "firebase/firestore";
import "firebase/auth";
import firebaseConfig from "./firebaseConfig";

import store from "../store";

firebase.initializeApp(firebaseConfig);
vue.prototype.$firebase = firebase;

firebase.auth().onAuthStateChanged((fu) => {
  // fu는 로그인 상태를 나타냄 null 또는 참데이터
  store.commit("authTF", fu);
  // store.commit("setUserData", fu);

  if (fu) {
    firebase.firestore().collection("user").doc(fu.uid).get().then((e) => {
        const data = e.data();
        if (data) {
          store.commit("setUserData", data);
        }
      });
  } else {store.commit("setUserData", fu);}

});
