import React, { useState, useEffect } from "react";
import styled from "styled-components";
import firebase from 'firebase';
import "firebase/firestore";

import './App.css';
import Home from './Components/Home/Home';
import ValidateUser from './Components/ValidateUser/ValidateUser';
import apiKey from "./Config";
console.log(apiKey);

// Initialize Firebase
firebase.initializeApp(apiKey);
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
    photos:[""],
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
