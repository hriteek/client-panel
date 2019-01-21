/*
import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase/app";
import "firebase/firestore";
// import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import {
  ReactReduxFirebaseProvider,
  firebaseReducer
} from "react-redux-firebase";
// import { reduxFirestore, firestoreReducer } from "redux-firestore";
import { createFirestoreInstance, firestoreReducer } from "redux-firestore";



import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth'
// import 'firebase/firestore' // <- needed if using firestore
// import 'firebase/functions' // <- needed if using httpsCallable
import { createStore, combineReducers, compose } from 'redux'
import { ReactReduxFirebaseProvider, firebaseReducer } from 'react-redux-firebase'
// import { createFirestoreInstance, firestoreReducer } from 'redux-firestore' // <- needed if using firestore



// Reducers

// TODO:

// firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCppwpMLaLU_mjAgCv7uqQ9IyQCd298k_E",
  authDomain: "reactclientpanel-8f41b.firebaseapp.com",
  databaseURL: "https://reactclientpanel-8f41b.firebaseio.com",
  projectId: "reactclientpanel-8f41b",
  storageBucket: "reactclientpanel-8f41b.appspot.com",
  messagingSenderId: "588589413855"
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

// Initialize other services on firebase instance
firebase.firestore();
// const firestore = firebase.firestore(); // <- needed if using firestore
// firebase.functions() // <- needed if using httpsCallable

// Add reactReduxFirebase enhancer when making store creator
// const createStoreWithFirebase = compose(
//   reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
//   reduxFirestore(firebase) // <- needed if using firestore
// )(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer // <- needed if using firestore
});

// Create store with reducers and initial state
const initialState = {};
const store = createStore(
  rootReducer,
  initialState,
  compose(
    // reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
};
*/
