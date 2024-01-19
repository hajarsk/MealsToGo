// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import  ReactNativeAsyncStorage  from "@react-native-async-storage/async-storage";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBB1o1UH1_xZGXw30bhmplaurcEYlLZZFw",
    authDomain: "mealstogo-df673.firebaseapp.com",
    projectId: "mealstogo-df673",
    storageBucket: "mealstogo-df673.appspot.com",
    messagingSenderId: "598052007473",
    appId: "1:598052007473:web:a796390f8d3a2ccdebef10",
    databaseURL: "https://mealstogo-df673-default-rtdb.asia-southeast1.firebasedatabase.app"
  };

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});



export const FIREBASE_DATABASE = getDatabase(FIREBASE_APP);
export const FIREBASE_FIRESTORE = getFirestore(FIREBASE_APP);