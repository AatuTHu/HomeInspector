const { initializeApp } = require("firebase/app");
const { getFirestore, collection, onSnapshot, query, doc, getDocs,addDoc,orderBy,deleteDoc } = require("firebase/firestore");
const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } = require("firebase/auth");



const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
};

// Initialize Firebase
initializeApp(firebaseConfig)
const firestore = getFirestore();
const HUMIDITY = "humidity"
const TEMPERATURE = "temperature"

module.exports = {
  firestore,
  HUMIDITY,
  TEMPERATURE,
  collection,
  addDoc,
  deleteDoc,
  orderBy,
  onSnapshot,
  query,
  doc,
  getDocs
}