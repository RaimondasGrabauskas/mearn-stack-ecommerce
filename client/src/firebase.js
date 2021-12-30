// Import the functions you need from the SDKs you need
import * as firebase from 'firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDpKozUGsCbsflXtxdm0QS0RY-l0_vb3CU',
  authDomain: 'ecommerce-9381b.firebaseapp.com',
  projectId: 'ecommerce-9381b',
  storageBucket: 'ecommerce-9381b.appspot.com',
  messagingSenderId: '609738377403',
  appId: '1:609738377403:web:b2fb608c61c6251dc0019e',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.googleAuthProvider();
