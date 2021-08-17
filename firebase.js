import "firebase/firestore";
import firebase from "firebase";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyDEnHXYqvGbhdICK7CDrveHSFdhEPv6Hoo",
    authDomain: "movie-review-app-af7e6.firebaseapp.com",
    projectId: "movie-review-app-af7e6",
    storageBucket: "movie-review-app-af7e6.appspot.com",
    messagingSenderId: "565240801641",
    appId: "1:565240801641:web:007ced9735255b9d4535f8",
    authDomain: "https://movie-review-app-af7e6.firebaseio.com",
  });
}
export const db = firebase.firestore();
