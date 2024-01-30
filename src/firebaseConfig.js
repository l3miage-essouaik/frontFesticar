import { initializeApp } from "firebase/app";

const apiKey = "AIzaSyAJMnEdbsomQQpysguTkLQg8vbxLmBNFYc";
const authDomain = "festicar-cf2b2.firebaseapp.com";
const projectId = "festicar-cf2b2";
const storageBucket = "festicar-cf2b2.appspot.com";
const messagingSenderId = "330643569363";
const appId = "1:330643569363:web:0fc0a0de596acdf22ff226";

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
};

initializeApp(firebaseConfig);