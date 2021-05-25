import React, { useState } from "react"
import styled from "styled-components";
import Report from "../../Shared/Report/Report";
import img from  "../../../Assets/Images/Profile/ProfileQR2LzSe7dfLcyAEnuWu4/1.jpeg";
               
const Wrapper = styled.div`
  ${props=>`
      display:flex;
      flex-direction:row;
      font-size: 2.5vh;
      height: 8.5%;
      width: 100%;
      text-align: center;
      align-items: center;
      background-color: #14557b;
      justify-content:
      ${props?.styles}
`}`;

const ImgLogo = styled.div`
  ${props=>`
    display:flex;
    align-items:flex-end;
    justify-content:flex-end;
    background: url("${props.imgFondo}") no-repeat center;
    background-size: 100% auto;
    background-color:lightblue;
    border-radius:0.5vw;
    background-repeat: no-repeat;
    height: 3.5vw;
    width: 3.5vw;
    margin: 3%;
    margin-right:0;
    cursor:pointer;
    ${props?.styles}
`}`;

const PersonName = styled.h3`
  font-size: 2vh;
  margin-left: 1vw; 
  color:white;
`;

const PersonState = styled.div`
  ${props =>`
    width:0.7vw;
    height:0.7vw;
    border-radius:50%;
    margin-right:1vh;
    margin-bottom:1vh;
    background-color ${props.active ? "green" : "gray"}
  `}
`;

const Wrapper1 = styled.div`
  ${props=>`
    display:flex;
    flex-direction:row;
    height: 100%;
    width:22vw;
    text-align: center;
    align-items: center;
    justify-content:center;
    ${props?.styles}
`}`;

const MiniProfile = (props) => {
  const [userone,setUserone] = useState(props.userMatch);
  const [point,setPoint] = useState(false);

  const recent =  (( (new Date().getTime() / 1000) - (props.user.recent / 1000) ) <= 300);
  //console.log(recent, new Date().getTime() / 1000 , props.user.recent / 1000 , props.user.username);
  const loadProfile = (user, setUserMatch, setScreen, screen, setOldScreen, oldScreen,userMatch) => {
    //console.log(props)
    if(setScreen){
      
      if(point){
        setScreen("match")
        setOldScreen("profile")
        //setUserMatch(userMatch);
      }
      else{
        setScreen("profile")
        setOldScreen(screen)
        setUserMatch(user);
      }
    }
  }

  
  return (
      <Wrapper>
        <Wrapper1 styles="display:flex; justify-content:flex-start">
          <ImgLogo 
            imgFondo={props.user.photos?.[0]} 
            onClick={() => {loadProfile(props.user, props.setUserMatch, props.setScreen, props.screen, props.setOldScreen, props.oldScreen, userone); point ? setPoint(false): setPoint(true);}
          }> 

              <PersonState active={recent}/>
              
            </ImgLogo>
            <PersonName>{props.user.username}</PersonName>
          </Wrapper1>
          {
          props.Report ? 
            <Wrapper1 styles="display:flex; justify-content:flex-end">
              {props.Report}
            </Wrapper1>
            : null
          }

        </Wrapper>
    );
};

export default MiniProfile;