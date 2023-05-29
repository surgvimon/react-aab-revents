import {initializeApp} from 'firebase/app';
import { getAuth, updateProfile } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDZZ1_ELWcz0fyT1bYQu7-eR3se-0BQFnw",
  authDomain: "realtor-e978d.firebaseapp.com",
  projectId: "realtor-e978d",
  storageBucket: "realtor-e978d.appspot.com",
  messagingSenderId: "318042603999",
  appId: "1:318042603999:web:e3aac36a764f97f78b046a",
  measurementId: "G-D15R9VV4RP"

};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
