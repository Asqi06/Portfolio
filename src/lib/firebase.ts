import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAlz1ZGbfg41s6ID1SLbRm5kZKAr2Mz_9w",
  authDomain: "anirudh-portfolio-84bb8.firebaseapp.com",
  projectId: "anirudh-portfolio-84bb8",
  storageBucket: "anirudh-portfolio-84bb8.firebasestorage.app",
  messagingSenderId: "290165706754",
  appId: "1:290165706754:web:e69e5fd4313ee0b798171b"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
