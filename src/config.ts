import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCUuARNzSRGmccOzbGAAmGix1PoPsuJz2w",
    authDomain: "diabietes-app.firebaseapp.com",
    projectId: "diabietes-app",
    storageBucket: "diabietes-app.appspot.com",
    messagingSenderId: "912117164523",
    appId: "1:912117164523:web:3dd82c3ca4f67c5e83d1ae",
    measurementId: "G-HMFJSFXYXG"
  };

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { firebaseApp, db, auth };