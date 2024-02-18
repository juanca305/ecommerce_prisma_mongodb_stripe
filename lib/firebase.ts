// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCz0wzjDcUbfkcvCDh-Io6oL3v6vJwJBqA",
  authDomain: "juanca-shop.firebaseapp.com",
  projectId: "juanca-shop",
  storageBucket: "juanca-shop.appspot.com",
  messagingSenderId: "586755404932",
  appId: "1:586755404932:web:67ec1c4002780763f73ed1"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;