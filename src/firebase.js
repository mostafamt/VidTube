// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyA-ibHjnjJ61cyrFFIJgY8wc9F24DD_OP8",
  authDomain: "firestore-ccb06.firebaseapp.com",
  projectId: "firestore-ccb06",
  storageBucket: "firestore-ccb06.appspot.com",
  messagingSenderId: "17095655724",
  appId: "1:17095655724:web:878e5891b5e3356d302c89",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
