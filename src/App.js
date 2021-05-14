import React, { useState } from "react";
import firebase from 'firebase';
import "firebase/firestore";

import './App.css';
import Home from './Components/Home/Home';
//import Register from './Components/Register/Register';
//import Login from './Components/Login/Login';
import ValidateUser from './Components/ValidateUser/ValidateUser';
import PhotoLogo from "./Assets/Images/profileIcon.jpg";


var firebaseConfig = {
  apiKey: "AIzaSyC42VNzf1WChOi8Z9odO-XBBG1TpldmsZY",
  authDomain: "loveconnect-8fb23.firebaseapp.com",
  projectId: "loveconnect-8fb23",
  storageBucket: "loveconnect-8fb23.appspot.com",
  messagingSenderId: "332872202017",
  appId: "1:332872202017:web:aaef6bf3ae0f6bb8273060",
  measurementId: "G-2DJQKDVC4V"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.database();
const db = firebase.firestore();

function App() {
  const[user, setUser] = useState({
    loggedIn: false,
    userId: "QR2LzSe7dfLcyAEnuWu4",
    username: "Oriol",
    email:"oriol-1-2@hotmail.com",
    age:23,
    distance:11,
    recent:null,
    gender:"chico",
    tastes:[{name: "Pirola", description: "magic pirola"},{name: "Caca", description: "magic pirola"},{name: "Agua de bater", description: "magic pirola"}],
    photos:[PhotoLogo],
    localitzation:null
  });

  return (
      <div>
        {user.loggedIn ?  <Home db={db} user={user} setUser={setUser}/>: <ValidateUser db={db} user={user} setUser={setUser} />}
      </div>
  );
}

export default App;
