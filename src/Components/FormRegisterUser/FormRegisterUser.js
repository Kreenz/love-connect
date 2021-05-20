import React from "react"
import styled from "styled-components";
import firebase from 'firebase';
import "firebase/firestore";

import Logo from '../Shared/Logo';
import Form from '../Home/Profile/ProfileEditable/ProfileEditableForm/ProfileEditableForm';
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

const FormRegisterUser = (props) => {

  return (
    <Wrapper>
      <Logo/>
        <Form 
          name="formuser"
          inputs={
            [{
                label:"Descripcion: ",
                name:"des",
                type:"text"
            },
            {
                label:"Gustos: ",
                name:"taste",
                type:"text"
            },
            {
                label:"Distancia",
                name:"distance",
                type:"range",
                range:{min:0,max:100},
                step:10,
                start:[0],
                styles:"width:100%; height:100%;"
            },
            {
                label:"Edad",
                name:"age",
                type:"range",
                range:{min:18,max:50},
                step:1,
                start:[18,50],
                styles:"width:100%; height:100%;"
            },
            {
                label:"Genero que te gusta: ",
                name:"select",
                type:"select",
                options:["Hombre", "Mujer", "Triangulo?"]
            },
            {
                label:"IMG Perfil: ",
                name:"img",
                type:"text"
            },
            {
                label:"Ubicación: ",
                name:"ubi",
                type:"text"
            }]
          }
          styles={"height:70vh; width:16vw"}
          /> 
      <Form 
          name="formuser"
          inputs={
            [{
              label:"Terminar",
              name:"submit",
              type:"submit",
              fun: () => {
                let form = document.getElementsByTagName("form");
                console.log(form[0])
                let inputs = form[0].elements;
                let description = inputs["des"].value;
                /* let distance = inputs["distance"].value;
                let max = inputs["age"].value;
                let min = inputs["age"].value;
                let select = inputs["select"].value;
                let img = inputs["img"].value;
                let ubi = inputs["ubi"].value; */

                console.log(description)
                /* register(props.email, props.password).then(data => {
                  if(data.user){
                    props.db.collection("perfiles/"+data.user.uid).update({
                      busca:select,
                      descripcion:description,
                      distancia:distance,
                      posicion:[ubi],
                      fotos:"["+img+"]",
                      rango_edad_mayor:max,
                      rango_edad_menor:min
                    }).then(data =>{
                      console.log("<-- datos")
                      console.log(data);
                    })
                  } else {
                    props.setState(data.message)
                  }

                }); */
              }
            }]
          }
          styles={"height:10vh; width:15vw;"}
          /* submit={funtion} */
        />
    </Wrapper>
  );
};

export default FormRegisterUser;