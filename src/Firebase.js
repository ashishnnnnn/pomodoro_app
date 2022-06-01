// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPX7lX0DpyXWsbYGpXRwy76lV7_4R1hd4",
  authDomain: "music-manthan-authentication.firebaseapp.com",
  projectId: "music-manthan-authentication",
  storageBucket: "music-manthan-authentication.appspot.com",
  messagingSenderId: "1074333866705",
  appId: "1:1074333866705:web:7ffadfbb0484bceb47c3f0",
  measurementId: "G-DVJTM7EY98",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
