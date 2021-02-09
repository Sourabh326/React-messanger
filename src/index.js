import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from "firebase/app";
import {Provider} from 'react-redux'
import store  from './store';

// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
const firebaseConfig = {
  apiKey: "AIzaSyD5Y-dwJcPct0gXAV8smHCtH9aNbXkgvAM",
  authDomain: "react-web-messenger.firebaseapp.com",
  projectId: "react-web-messenger",
  storageBucket: "react-web-messenger.appspot.com",
  messagingSenderId: "265685284818",
  appId: "1:265685284818:web:fa61ec78a4c6293719ba0b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

