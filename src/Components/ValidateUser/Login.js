import React from "react"
import styled from "styled-components";
import firebase from 'firebase';
import "firebase/firestore";

import Form from '../Shared/Form';
import Button from '../Shared/Button';

const Wrapper = styled.div`
  background:transparent;
  color:white;
  align-items: center;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  height:90%;
  padding-bottom:1%;
`;

const FormWrapper = styled.div`
  margin-top:30%;
`


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
      <FormWrapper>
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
              type:"password"
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
                          /* console.log(doc)
                          console.log(doc.data()) */

                        /*  let storageRef = firebase.storage().ref(doc.id);
                          storageRef.listAll().then(function(result) {
                            result.items.forEach(function(imageRef) {
                              imageRef.getDownloadURL().then((url) => {
                                photos.push(url);
                              });
                            });
                          }).catch(function(error) {
                            alert(error)
                          });*/

                          let photos = JSON.parse(doc.data().fotos);
                          console.log(photos)
                          let user = {
                            loggedIn: true,
                            userId: doc.id,
                            username: doc.data().nombre,
                            email:doc.data().correo,
                            age:doc.data().edad,
                            distance:doc.data().distancia,
                            recent: doc.data().reciente,
                            gender:doc.data().genero,
                            lookingFor: doc.data().busca,
                            tastes:doc.data().tastes,
                            photos:photos,
                            localitzation:null,
                            upper_age_range:doc.data().rango_edad_mayor,
                            lower_age_range:doc.data().rango_edad_menor,
                            description: doc.data().descripcion,
                            karma: doc.data().karma
                          }
                          
                          localStorage.setItem("token", JSON.stringify(user));
                          props.setUser(user);
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
      </FormWrapper>
      
      <Button 
        name="Registrarse"
        boolean={true}
        setTipo={props.setTipo}
      />
    </Wrapper>
  );
};

export default Login;