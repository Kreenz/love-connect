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
              type:"password"
            },
            {
              label:"Repetir contraseña: ",
              name:"passwd2",
              type:"password"
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
              label:"Fecha de cumpleaños: ",
              name:"date",
              type:"date",
              styl:"width:100%;"
            },
            {
              label:"Genero: ",
              name:"select",
              type:"select",
              options:["chico", "chica", "no binario"]
            }]
          }
          styles={"margin-left:2vh;"}
          /* submit={funtion} */
        />
      </Wrapper2>
      <Form
          name="register"
          inputs={
              [{
                  label:"Política de privacidad y protección de datos: ",
                  name:"check",
                  type:"checkbox",
                  styl:"color:white; width:30vw; height:4vh;",
                  style2:"height:15vh;",
                  styles:"width:3vw; height:3vh;"
              }]
          }
          styles="width:95%; height:10vh;"
      />
      <Form 
          name="register"
          inputs={
            [{
              label:"Registrar",
              name:"submit",
              type:"submit",
              fun: () => {
                let form = document.getElementsByTagName("form");
                let inputs = form[0].elements;
                let email = inputs["mail"].value;
                let password = inputs["passwd"].value;
                let password2 = inputs["passwd2"].value;
                let inputs2 = form[1].elements;
                let name = inputs2["name"].value;
                let date = inputs2["date"].value;
                let select = inputs2["select"].value;
                let inputs3 = form[2].elements;
                let check = inputs3["check"];

                if(check.checked == true){
                  if(password == password2){
                    register(email, password).then(data => {
                      if(data.user){
                          props.db.collection("perfiles").add({
                            busca:"Heterosexual",
                            correo:email,
                            descripcion:"",
                            distancia:15,
                            edad:calcularEdad(date),
                            fotos:"[]",
                            genero:select,
                            karma:50,
                            nombre:name,
                            posicion:[],
                            rango_edad_mayor:50,
                            rango_edad_menor:18,
                            reciente:new Date(2).getTime(),
                            tastes:[],
                            politica:"Acceptada el dia ("+ new Date(2).getTime()+")"
                          }).then(data =>{
                            console.log("<-- datos")
                            console.log(data);

                            let storage = firebase.storage();
                            let storageUser = storage.ref();
                          })
                          props.setState();
                          props.setTipo(false);
                      } else {
                        props.setState(data.message)
                      }
                    });
                  }else{
                    props.setState("La contraseña es incorrecta");
                  }
                }else{
                  props.setState("No se han aceptado los terminos");
                }
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