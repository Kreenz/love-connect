import React from "react"
import styled from "styled-components";
import firebase from 'firebase';
import "firebase/firestore";

import Form from '../Shared/Form';
import Button from '../Shared/Button';

const Wrapper = styled.div`
  background:transparent
  color:white;
  align-items: center;
  justify-content:center;
  display: flex;
  flex-direction: column;
  height:90%;

`;

const Wrapper2 = styled.div`
  background:transparent
  color:white;
  align-items: center;
  display: flex;
  flex-direction: row;
  margin-bottom: 2vh;
`;

const Register = (props) => {

  const register = (email, password) => { 
    return new Promise(resolve => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        resolve(user);
        //props.setUser(user.user.email);
        //props.setLoggedIn(true);
      })
      .catch((error) => {
        resolve(error);
      })
    })

  }
  const calcularEdad = (fecha) => {
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }

    return edad;
}
  return (
    <Wrapper>
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
          styles={"margin-left:2vw;"} 
          name="register"
          inputs={
            [{
              label:"Nombre: ",
              name:"name",
              type:"text"
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
              options:["chico", "chica", "no binario"]
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
              type:"submit",
              fun: () => {
                let form = document.getElementsByTagName("form");
                console.log(form[0])
                let inputs = form[0].elements;
                let email = inputs["mail"].value;
                let password = inputs["passwd"].value;
                //let password2 = inputs["passwd2"].value;
                let form2 = document.getElementsByTagName("form");
                let inputs2 = form2[1].elements;
                let name = inputs2["name"].value;
                let date = inputs2["date"].value;
                let select = inputs2["select"].value;

                register(email, password).then(data => {
                  if(data.user){
                    props.db.collection("perfiles").add({
                      busca:null,
                      correo:email,
                      descripcion:null,
                      distancia:null,
                      edad:new Date(date).getTime(),
                      genero:select,
                      karma:null,
                      nombre:name,
                      posicion:[],
                      rango_edad_mayor:null,
                      rango_edad_menor:null,
                      reciente:null
                    }).then(data =>{
                      console.log("<-- datos")
                      console.log(data);
                    })
                  } else {
                    props.setState(data.message)
                  }

                });
              }
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