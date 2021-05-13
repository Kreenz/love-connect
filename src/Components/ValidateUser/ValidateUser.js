import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Register from "./Register";
import Login from "./Login";

const Wrapper = styled.div`
  background:white;
  color:white;
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 10vh;
`;

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

    useEffect(() => {
        setTimeout(() => {
            if(state != "") setState("");
        }, 3000);

    }, [state])

    return (
        <Wrapper>
            <StateMessageUpdate>{state}</StateMessageUpdate>
            {tipo ? <Register db={props.db} setState={setState} setUser={props.setUser} setTipo={setTipo}/> : <Login db={props.db} setState={setState} user={props.user} setUser={props.setUser} setTipo={setTipo}/>}
        </Wrapper>
    );
};

export default ValidateUser;