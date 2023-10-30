// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {GoogleAuthProvider,getAuth} from "firebase/auth"
import {getStorage} from "firebase/storage"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8XMIj9O_UYGSgUbnwlCCSWp0AdI4NMdI",
  authDomain: "enterprise-3ffe6.firebaseapp.com",
  projectId: "enterprise-3ffe6",
  storageBucket: "enterprise-3ffe6.appspot.com",
  messagingSenderId: "713933068114",
  appId: "1:713933068114:web:cb38930986a23f1f724c8b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const Auth=getAuth(app);
export const  Provider=new GoogleAuthProvider();
export const Storage=getStorage(app);
export const db=getFirestore(app);

