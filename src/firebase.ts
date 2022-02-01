import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { fbConfig } from './config';

firebase.initializeApp(fbConfig || process.env.REACT_APP_FIREBASE_CONFIG);
firebase.firestore();

export default firebase;
