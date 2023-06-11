import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from  "firebase/auth"



const firebaseConfig = {
  apiKey: "AIzaSyA8_kNDoPslL38RCqSxJhZ7l5oB9oxu4dw",
  authDomain: "null-innovation-6b7b3.firebaseapp.com",
  projectId: "null-innovation-6b7b3",
  storageBucket: "null-innovation-6b7b3.appspot.com",
  messagingSenderId: "9939232213",
  appId: "1:9939232213:web:452fccf3608a12dad2c95c",
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)


//sign up component