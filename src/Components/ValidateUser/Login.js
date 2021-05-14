import React from "react"
import styled from "styled-components";
import firebase from 'firebase';
import "firebase/firestore";

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

  const loggIn = (email, password) => {
    return new Promise(resolve => {
      firebase.auth().signInWithEmailAndPassword(email, password)
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
              let form = document.getElementsByTagName("form");
              let inputs = form["login"].elements;
              let email = inputs["mail"].value;
              let password = inputs["passwd"].value;
              //sacas datos y tiras luego pa alante
              loggIn(email, password).then(data => {
                  if(data.user){
                    const response = props.db.collection("perfiles").where("correo", "==", email);
                    response.get().then(snapshot => {
                      snapshot.forEach((doc) => {
                        let photos = JSON.parse(doc.data().fotos);
                        props.setUser({
                          loggedIn: true,
                          userId: doc.id,
                          username: doc.data().nombre,
                          email:doc.data().correo,
                          age:23,
                          distance:doc.data().distancia,
                          recent:null,
                          gender:doc.data().genero,
                          tastes:[],
                          photos:photos,
                          localitzation:null,
                          upper_age_range:2,
                          lower_age_range:2
                        })
                        
                      })
                    });
                  } else {
                    props.setState(data.message);
                  }
              });
              

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