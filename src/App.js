import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
// --------------------
import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase/app";
import "firebase/firestore";
import {
  ReactReduxFirebaseProvider,
  firebaseReducer
} from "react-redux-firebase";
import { createFirestoreInstance, firestoreReducer } from "redux-firestore";
// --------------------
import AppNavBar from "./components/layout/AppNavBar";
import DashBoard from "./components/layout/DashBoard";
import AddClient from "./components/clients/AddClient";
import ClientDetails from "./components/clients/ClientDetails";
import EditClient from "./components/clients/EditClient";

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
  useFirestoreForProfile: true
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

// Initialize other services on firebase instance
firebase.firestore();

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

// Create store with reducers and initial state
const initialState = {};
const store = createStore(
  rootReducer,
  initialState,
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <Router>
            <div>
              <AppNavBar />
              <div className="container">
                <Switch>
                  <Route exact path="/" component={DashBoard} />
                  <Route exact path="/client/:id" component={ClientDetails} />
                  <Route exact path="/client/add" component={AddClient} />
                  <Route exact path="/client/edit/:id" component={EditClient} />
                </Switch>
              </div>
            </div>
          </Router>
        </ReactReduxFirebaseProvider>
      </Provider>
    );
  }
}

export default App;
