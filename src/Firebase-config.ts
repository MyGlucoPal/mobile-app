import { initializeApp } from 'firebase/app';
import { initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getReactNativePersistence } from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
    apiKey: "AIzaSyCUuARNzSRGmccOzbGAAmGix1PoPsuJz2w",
    authDomain: "diabietes-app.firebaseapp.com",
    projectId: "diabietes-app",
    storageBucket: "diabietes-app.appspot.com",
    messagingSenderId: "912117164523",
    appId: "1:912117164523:web:3dd82c3ca4f67c5e83d1ae",
    measurementId: "G-HMFJSFXYXG"
  };

const storage = AsyncStorage;

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { firebaseApp, db, auth };