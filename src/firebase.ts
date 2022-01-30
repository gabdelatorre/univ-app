import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export const fbConfig = {
  apiKey: 'AIzaSyCHwYgtblpJ7Mi8-xQKy8KN3TQwOrZiKHY',
  authDomain: 'univ-app-612ae.firebaseapp.com',
  projectId: 'univ-app-612ae',
  storageBucket: 'univ-app-612ae.appspot.com',
  messagingSenderId: '516846381804',
  appId: '1:516846381804:web:af7618b9d8bd3374b713c9',
};

firebase.initializeApp(fbConfig);
firebase.firestore();

export default firebase;
