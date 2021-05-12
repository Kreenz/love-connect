import React from "react"
import styled from "styled-components";

import Logo from '../Shared/Logo';
import Form from '../Shared/Form';
import Button from '../Shared/Button';

const Wrapper = styled.div`
  background:white;
  color:white;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const Login = (props) => {

  return (
    <Wrapper>
      <Logo/>
      <Form 
        name="login"
        inputs={
          [{
            label:"Usuario mail: ",
            name:"mail",
            type:"text"
          },
          {
            label:"Contraseña: ",
            name:"passwd",
            type:"text"
          }]
        }
        /* styles={} */
        /* submit={funtion} */
      />
      <Form 
        name="login"
        inputs={
          [{
            label:"Login",
            name:"submit",
            type:"submit",
            fun: () => {
              //let form = document.getElementByName("login");
              //sacas datos y tiras luego pa alante
              props.setUser({
                loggedIn: true,
                userId: "QR2LzSe7dATcyAEnuWu4",
                username: "Oriol",
                email:"oriol-1-2@hotmail.com",
                age:23,
                distance:11,
                recent:null,
                gender:"chico",
                tastes:[],
                photos:props.user.photos,
                localitzation:{lat:41.570248, long:1.997183}
              })
            }
          }]
        }
        /* styles={} */
        /* submit={funtion} */
      />
      <Button 
        name="Registrarse"
        boolean={true}
        setTipo={props.setTipo}
      />
    </Wrapper>
  );
};

export default Login;