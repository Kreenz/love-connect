import React from "react"
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
    background: url("${props.imgFondo}") no-repeat center;
    background-size: 100% auto;
    background-color:lightblue;
    border-radius:0.5vw;
    background-repeat: no-repeat;
    height: 3.5vw;
    width: 3.5vw;
    margin: 3%;
    margin-right:0;
    ${props?.styles}
`}`;

const PersonName = styled.h3`
  font-size: 2vh;
  margin-left: 1vw; 
  color:white;
`;

const PersonState = styled.input`
  margin-left: 2vw;
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
    const loadProfile = (user, setUserMatch, setScreen, screen, setOldScreen) => {
      if(setScreen){
        setUserMatch(user);
        if(setOldScreen) setOldScreen(screen);
        setScreen("profile");
        
      }
      console.log(props.user.photos[0])
    }

    
    return (
        <Wrapper>
          <Wrapper1 styles="display:flex; justify-content:flex-start">
            <ImgLogo 
              imgFondo={props.user.photos?.[0]} 
              onClick={() => loadProfile(props.user, props.setUserMatch, props.setScreen, props.screen, props.setOldScreen)
            }>

              <PersonState type="radio"/>
              
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