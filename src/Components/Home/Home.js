import React, { useState } from "react"
import styled from "styled-components";

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
  const[userMatch, setUserMatch] = useState({
    userId: null,
    username: "",
    age:null,
    distance:null,
    recent:null,
    tastes:[{name: "Pirola", description: "magic pirola"},{name: "Caca", description: "magic pirola"},{name: "Agua de bater", description: "magic pirola"}],
    photos:[PhotoLogo, "", "", ""]
  })

  const[chatMessages, setChatMessages] = useState(
  [
    {
      messageId:"QR2LzSe7dfLcyAEnuWu422",
      fecha:"",
      userId:"QR2LzSe7dfAcyAEnuWu4",
      message:"hola k tal",
      type:"text"
    },
    {
      messageId:"QR2LzSe7dfLcyAEnuWu421",
      fecha:"",
      userId:"hE238nlUZVoHsvRDrpQL",
      message:"Aqui va el dos",
      type:"text"
    },
    {
      messageId:"QR2LzSe7dfLcyAEnuWu424",
      fecha:"",
      userId:"QR2LzSe7dfAcyAEnuWu4",
      message:PhotoLogo,
      type:"image"
    },
    {
      messageId:"QR2LzSe7dfLcyAEnuWu428",
      fecha:"",
      userId:"QR2LzSe7dfAcyAEnuWu4",
      message:"gameTpye:name",
      type:"game"
    },
    {
      messageId:"QR2LzSe7dfLcyAEnuWu430",
      fecha:"",
      userId:"QR2LzSe7dfAcyAEnuWu4",
      message:"No me dejes en visto",
      type:"text"
    },
    {
      messageId:"QR2LzSe7dfLcyAEnuWu440",
      fecha:"",
      userId:"hE238nlUZVoHsvRDrpQL",
      message:"Callate mal pario que aqui no aceptamos gente asi, solo queremos gente muy guay con muchas cosas de colores muy guays y muy decentes porque aqui somos muy españoles, si muy españoles",
      type:"text"
    },
  ])

  const loadScreen = (userMatch, setUserMatch, chatMessages, screen, setScreen) => {
    let component = "";
    switch(screen){
      case "match":
          component = <Match userMatch={userMatch} setUserMatch={setUserMatch} user={props.user} setScreen={setScreen}/>
          break;
      case "chat":
          component = <Chat chatMessages={chatMessages} userMatch={userMatch} setUserMatch={setUserMatch} user={props.user} setScreen={setScreen}/>
          break;
      case "profile":
          component = <Profile setScreen={setScreen} editable={userMatch.userId === props.user.userId} user={userMatch}/>
          break;
      case "game":
          component = <Game chatMessages={chatMessages} userMatch={userMatch} user={props.user}/>
          break;
      default:
          component = <Match userMatch={userMatch} setUserMatch={setUserMatch} user={props.user} />
          break;
    }
    return component;
  }

  return (
    <Wrapper key={"black"}>
        <MatchList setChatMessages={setChatMessages} userMatch={userMatch} setUserMatch={setUserMatch} user={props.user} screen={screen} setScreen={setScreen}/>
        {loadScreen(userMatch, setUserMatch, chatMessages, screen, setScreen)}
    </Wrapper>
  );
};

export default Home;