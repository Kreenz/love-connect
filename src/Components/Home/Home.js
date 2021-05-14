import React, { useState, useEffect } from "react"
import styled from "styled-components";
import firebase from 'firebase';
import "firebase/firestore";

import MatchList from "./MatchList/MatchList";
import Match from "./Match/Match";
import Chat from "./Chat/Chat";
import Profile from "./Profile/Profile";
import Game from "./Game/Game";

import PhotoLogo from "../../Assets/Images/profileIcon.jpg";

const Wrapper = styled.div`
  ${props=>`
    display:flex;
    flex-direction:row;
    font-size: 2.5vh;
    background: white;
    height: 100vh;
    width: 100vw;
    text-align: center;
    align-items: center;
    ${props?.styles}
`}`

const Home = (props) => {
  const[screen, setScreen] = useState("game");
  const[oldScreen, setOldScreen] = useState("game");
  const[chatMessages, setChatMessages] = useState([])

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  }

  const getCoords = (pos) => {
    console.log("user.localitzation: ", pos.coords.latitude, pos.coords.longitude)
    if(pos.coords.latitue != props.user.localitzation?.lat || pos.coords.longitude != props.user.localitzation?.long) {
      props.setUser({
        loggedIn: props.user.loggedIn,
        userId: props.user.userId,
        username: props.user.username,
        email: props.user.email,
        age: props.user.age,
        distance: props.user.distance,
        recent: props.user.recent,
        gender:props.user.gender,
        tastes:props.user.tastes,
        photos:props.user.photos,
        localitzation:{lat: pos.coords.latitude, long: pos.coords.longitude}
      })
    }
      
  }

  const errCoords = (err) => {
    console.log(err.message);
  }

  useEffect(() => {
    if(!props.user.localitzation) navigator.geolocation.getCurrentPosition(getCoords, errCoords, options);
  })
  
  //siguente usuario de la lista, se conserva para poder volver en todo momento a ese usuario sin ningun problema
  const[nextUserMatch, setNextUserMatch] = useState({
    userId: null,
    username: "",
    age:null,
    distance:null,
    recent:null,
    tastes:[],
    photos:[]
  })

  //usuario mostrado en el perfil u otros lados
  const[userMatch, setUserMatch] = useState({
    userId: null,
    username: "",
    age:null,
    distance:null,
    recent:null,
    id_chat:null,
    tastes:[{name: "Pirola", description: "magic pirola"},{name: "Caca", description: "magic pirola"},{name: "Agua de bater", description: "magic pirola"}],
    photos:[PhotoLogo, "", "", ""]
  })

  

  const loadScreen = () => {
    let component = "";
    switch(screen){
      case "match":
          component = <Match userMatch={nextUserMatch} setUserMatch={setUserMatch} setNextUserMatch={setNextUserMatch} user={props.user} screen={screen} setScreen={setScreen} setOldScreen={setOldScreen}/>
          break;
      case "chat":
          component = <Chat db={props.db} setChatMessages={setChatMessages} chatMessages={chatMessages} userMatch={userMatch} setUserMatch={setUserMatch} user={props.user} screen={screen} setScreen={setScreen} setOldScreen={setOldScreen}/>
          break;
      case "profile":
          component = <Profile screen={screen} setScreen={setScreen} editable={userMatch.userId === props.user.userId} user={userMatch} oldScreen={oldScreen} setOldScreen={setOldScreen}/>
          break;
      case "game":
          component = <Game db={props.db} setChatMessages={setChatMessages} chatMessages={chatMessages} userMatch={userMatch} user={props.user}/>
          break;
      default:
          component = <Match userMatch={nextUserMatch} setUserMatch={setNextUserMatch} user={props.user} screen={screen} setScreen={setScreen} setOldScreen={setOldScreen} />
          break;
    }
    return component;
  }

  return (
    <Wrapper key={"black"}>
        <MatchList db={props.db} setChatMessages={setChatMessages} userMatch={userMatch} setUserMatch={setUserMatch} user={props.user} screen={screen} setScreen={setScreen}/>
        {loadScreen(userMatch, setUserMatch, chatMessages, screen, setScreen)}
    </Wrapper>
  );
};

export default Home;