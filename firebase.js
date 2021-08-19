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
// apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
