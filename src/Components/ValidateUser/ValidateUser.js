import React, { useState } from "react";
import styled from "styled-components";

import Register from "../Register/Register";
import Login from "../Login/Login";

const Wrapper = styled.div`
  background:white;
  color:white;
  width:100vw;
  height:100vh;
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 10vh;
`;

const ValidateUser = (props) => {

    const[tipo,setTipo] = useState(false);

    return (
        <Wrapper>
            {tipo ? <Register setUser={props.setUser} setTipo={setTipo}/> : <Login user={props.user} setUser={props.setUser} setTipo={setTipo}/>}
        </Wrapper>
    );
};

export default ValidateUser;