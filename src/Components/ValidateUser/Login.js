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
                          let f = new Date();
                          f.setTime(doc.data().reciente);
                          let photos = JSON.parse(doc.data().fotos);
                         /* let arrayPhotos = [];
                          var pathReference = firebase.storage().ref(doc.id+"/photo_2021-05-12_11-29-49.jpg");
                          pathReference.getDownloadURL().then((url) => {
                            console.log(url);
                            arrayPhotos.push(url);
                          }).catch((error)=>{
                            switch (error.code) {
                              case 'storage/object-not-found':
                                // File doesn't exist
                                console.log("File doesn't exist")
                                break;
                          
                              case 'storage/unauthorized':
                                // User doesn't have permission to access the object 
                                console.log("User doesn't have permission to access the object ")
                                break;
                          
                              case 'storage/canceled':
                                console.log("User canceled the upload")
                                // User canceled the upload
                                break;
                          
                              case 'storage/unknown':
                                console.log("Unknown error occurred, inspect the server response")
                                // Unknown error occurred, inspect the server response
                                break;
                            }  
                          });*/

                          let user = {
                            loggedIn: true,
                            userId: doc.id,
                            username: doc.data().nombre,
                            email:doc.data().correo,
                            age:doc.data().edad,
                            distance:doc.data().distancia,
                            recent:f,
                            gender:doc.data().genero,
                            lookingFor: doc.data().busca,
                            tastes:[],
                            photos:photos,
                            localitzation:null,
                            upper_age_range:doc.data().rango_edad_mayor,
                            lower_age_range:doc.data().rango_edad_menor,
                            description: doc.data().descripcion
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