// Firebase super simple helper functions

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, set, get, child, push } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'aithreads-8470c.firebaseapp.com',
  databaseURL:
    'https://aithreads-8470c-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'aithreads-8470c',
  storageBucket: 'aithreads-8470c.appspot.com',
  messagingSenderId: '565711735978',
  appId: '1:565711735978:web:dcb06ea345e4d5e44394d3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbref = ref(db, 'thread');

export function createThread(messages = []) {
  set(dbref, [...messages]);
}

export function addMessageToThread(message) {
  const messagesRef = push(dbref);
  set(messagesRef, message);
}

export async function getThread() {
  return get(child(ref(db), 'thread')).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    } else {
      return []; // no messages so far
    }
  });
}
