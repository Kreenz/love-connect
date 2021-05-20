import React, { useState, useEffect } from "react";
import styled from "styled-components";
import firebase from 'firebase';
import "firebase/firestore";

import './App.css';
import Home from './Components/Home/Home';
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

const AppFont = styled.div`
width:100vw;
height:100vh;
`

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
    lookingFor: "",
    tastes:[{name: "Pirola", description: "magic pirola"},{name: "Caca", description: "magic pirola"},{name: "Agua de bater", description: "magic pirola"}],
    photos:[PhotoLogo],
    localitzation:null,
    upper_age_range:2,
    lower_age_range:2,
    description: ""
  });

  useEffect(() => {
    if(localStorage.getItem("token") && !user.loggedIn){
      setUser(JSON.parse(localStorage.getItem("token")))
    } 
  })

  return (
      <AppFont>
        {user?.loggedIn ?  <Home db={db} user={user} setUser={setUser}/>: <ValidateUser db={db} user={user} setUser={setUser} />}
      </AppFont>
  );
}

export default App;
