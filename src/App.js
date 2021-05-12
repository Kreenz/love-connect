import React, { useState } from "react";

import './App.css';
import Home from './Components/Home/Home';
//import Register from './Components/Register/Register';
//import Login from './Components/Login/Login';
import ValidateUser from './Components/ValidateUser/ValidateUser';
import PhotoLogo from "./Assets/Images/profileIcon.jpg";


function App() {
  const[user, setUser] = useState({
    loggedIn: true,
    userId: "QR2LzSe7dfAcyAEnuWu4",
    username: "Oriol",
    email:"oriol-1-2@hotmail.com",
    age:23,
    distance:11,
    recent:null,
    gender:"chico",
    tastes:[{name: "Pirola", description: "magic pirola"},{name: "Caca", description: "magic pirola"},{name: "Agua de bater", description: "magic pirola"}],
    photos:[PhotoLogo],
    localitzation:{lat:41.570248, long:1.997183}
  });
  
  return (
      <div>
        {user.loggedIn ?  <Home user={user} setUser={setUser}/>: <ValidateUser user={user} setUser={setUser} />}
      </div>
  );
}

export default App;
