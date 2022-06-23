import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "tasker-e9126.firebaseapp.com",
  projectId: "tasker-e9126",
  storageBucket: "tasker-e9126.appspot.com",
  messagingSenderId: "557835847641",
  appId: "1:557835847641:web:adef0962833ec3c8253bc8",
  measurementId: "G-267C5QPTD7"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;