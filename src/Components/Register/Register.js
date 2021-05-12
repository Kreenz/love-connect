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

const Wrapper2 = styled.div`
  background:white;
  color:white;
  align-items: center;
  display: flex;
  flex-direction: row;
  margin-bottom: 2vh;
`;

const Register = (props) => {

  return (
    <Wrapper>
      <Logo/>
      <Wrapper2>
        <Form 
          name="register"
          inputs={
            [{
              label:"Correo: ",
              name:"mail",
              type:"text"
            },
            {
              label:"Contraseña: ",
              name:"passwd",
              type:"text"
            },
            {
              label:"Repetir contraseña: ",
              name:"passwd2",
              type:"text"
            }]
          }
          /* styles={} */
          /* submit={funtion} */
        />
        <Form 
          name="register"
          inputs={
            [{
              label:"Nombre: ",
              name:"name",
              type:"text"
            },
            {
              label:"Año: ",
              name:"age",
              type:"number"
            },
            {
              label:"Fecha de cumpleaños: ",
              name:"date",
              type:"date"
            },
            {
              label:"Genero: ",
              name:"select",
              type:"select",
              options:["Hombre", "Mujer", "Triangulo?"]
            }]
          }
          /* styles={} */
          /* submit={funtion} */
        />
      </Wrapper2>
      <Form 
          name="register"
          inputs={
            [{
              label:"Registrar",
              name:"submit",
              type:"submit"
            }]
          }
          /* styles={} */
          /* submit={funtion} */
        />
      <Button 
        name="Login"
        boolean={false}
        setTipo={props.setTipo}
      />
    </Wrapper>
  );
};

export default Register;