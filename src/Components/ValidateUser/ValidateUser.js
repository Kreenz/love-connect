import React, { useState } from "react";
import styled from "styled-components";

import Register from "./Register";
import Login from "./Login";

const Wrapper = styled.div`
  background:white;
  color:white;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  width:100%;
  height:100%;
  background-color: #9eabe4;
  background-image: linear-gradient(315deg, #9eabe4 0%, #77eed8 74%);
`;


const LogoWrapper = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    height:20%;
`

const LogoText = styled.h1`
    font-weight: 800;
    font-size:5vh;
    background-color: #60dfcd;
    background-image: linear-gradient(315deg, #60dfcd 0%, #1e9afe 74%);
    text-shadow: 0 0 2px #1e9afe;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`

const StateMessageUpdate = styled.span`
    position:absolute;
    top:1vw;
    left:1vw;
    font-size:3vh;
    width:fit-content;
    height:fit-content;
    color:black;
`

const ValidateUser = (props) => {

    const[tipo,setTipo] = useState(false);
    const[state,setState] = useState("");

    return (
        <Wrapper>
            <LogoWrapper>
                <LogoText>
                    Lover Connect
                </LogoText>
            </LogoWrapper>
            <StateMessageUpdate>{state}</StateMessageUpdate>
            {tipo ? <Register db={props.db} setState={setState} setUser={props.setUser} setTipo={setTipo}/> : <Login db={props.db} setState={setState} user={props.user} setUser={props.setUser} setTipo={setTipo}/>}
        </Wrapper>
    );
};

export default ValidateUser;