

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { 
getAuth, 
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
onAuthStateChanged, 
signOut, 
sendPasswordResetEmail, 
sendEmailVerification, 
updateProfile,
GoogleAuthProvider,
signInWithPopup } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import {
   getFirestore,
   collection,
   addDoc,
   getDocs,
   doc,
   setDoc,
   Timestamp,
   deleteDoc,
   deleteField ,
   onSnapshot ,
   getDoc,
   query,
   where
 } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js'
import {getDatabase, ref, set ,child , get , update , remove, onValue } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js'


// firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDhO38c1rgHPNNLF3gD9xmN2fZOTpxNrcE",
  authDomain: "smit-mini-hackathon-11685.firebaseapp.com",
  databaseURL: "https://smit-mini-hackathon-11685-default-rtdb.firebaseio.com",
  projectId: "smit-mini-hackathon-11685",
  storageBucket: "smit-mini-hackathon-11685.firebasestorage.app",
  messagingSenderId: "165559002353",
  appId: "1:165559002353:web:2a6762596a5a8e97e7b550",
  measurementId: "G-05PRX0E2HC"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
const db = getFirestore(app)
const database = getDatabase();



export { auth, 
createUserWithEmailAndPassword, 
signInWithEmailAndPassword, 
onAuthStateChanged, 
signOut, 
sendPasswordResetEmail, 
sendEmailVerification, 
updateProfile,
provider,
signInWithPopup,
db,
collection,
addDoc,
getDocs,
doc,
setDoc,
Timestamp,
deleteDoc,
deleteField,
GoogleAuthProvider,
onSnapshot ,
getDoc,
query,
where,
getDatabase, ref, set
,child , get , update , remove,onValue  } 