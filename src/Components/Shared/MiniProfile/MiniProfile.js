import React from "react"
import styled from "styled-components";

const Wrapper = styled.div`
    display:flex;
    flex-direction:row;
    font-size: 2.5vh;
    height: 8.5%;
    width: 100%;
    text-align: center;
    align-items: center;
    justify-content:
`

const ImgLogo = styled.div`
  ${props=>`
    background: url("${props.imgFondo}") no-repeat center;
    background-size: 100% auto;
    background-color:lightblue;
    border-radius:0.5vw;
    border: 0.1vh solid white;
    background-repeat: no-repeat;
    height: 3.5vw;
    width: 3.5vw;
    margin-left: 3%;
    ${props?.styles}
`}`

const PersonName = styled.h3`
   margin-left: 1vw;  
`;

const PersonState = styled.input`
  margin-left: 2vw;
`;



const MiniProfile = (props) => {
    const loadProfile = (user, setUserMatch, setScreen) => {
      if(setScreen){
        setUserMatch(user);
        setScreen("profile");
      }
    }

    return (
        <Wrapper>
            <ImgLogo onClick={() => loadProfile(props.user, props.setUserMatch, props.setScreen)} imgFondo={props.user.photos[0]}>

              <PersonState type="radio"/>
              
            </ImgLogo>
            <PersonName>{props.user.username}</PersonName>
        </Wrapper>
    );
};

export default MiniProfile;