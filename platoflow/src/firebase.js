import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCX_nOSWuyz08A6b4Iqkews3X7kSoR7Dy0",
  authDomain: "platoflow-cca6e.firebaseapp.com",
  projectId: "platoflow-cca6e",
  storageBucket: "platoflow-cca6e.firebasestorage.app",
  messagingSenderId: "919279006805",
  appId: "1:919279006805:web:04543f0890f739bd2310dc",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);