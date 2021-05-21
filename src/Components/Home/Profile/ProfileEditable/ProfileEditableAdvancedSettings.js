import React, { useEffect, useState } from "react"

import styled from "styled-components";
import firebase from 'firebase';
import "firebase/firestore";

import Input from "./../../../Shared/Formulario/Input";

const Wrapper = styled.div`
    background: #D3D3D3;
    height: 100%;
    width: 45%;
    display: flex;
    align-items:center;
    flex-direction: column;
`;

const AccountSettings = styled.span`
    color:black;
    font-size:2.3vh;
    padding:1vh;
    margin-top:1vh;
    margin-bottom:1vh;
`;

const Wrapper2 = styled.div`
    margin-top: 10%;
    heigth: 40%;
    width: 100%;
`;

const ProfileEditableAdvancedSettings = (props) =>{

    const [email, setEmail] = useState(props.user.email);
    const [passwd, setPasswd] = useState("");
    const [passwd2, setPasswd2] = useState("");

    const SaveJS = () => {
        let currentUser = {
            loggedIn: props.user.loggedIn,
            userId: props.user.userId,
            username: props.user.username,
            description: props.user.description,
            email:email,
            age:props.user.age,
            distance:props.user.distance,
            recent:props.user.recent,
            gender:props.user.gender,
            lookingFor:props.user.lookingFor,
            localitzation:props.user.localitzation,
            tastes:props.user.tastes,
            photos:props.user.photos,
            upper_age_range:props.user.upper_age_range,
            lower_age_range:props.user.lower_age_range
        }
        props.setUser(currentUser);
    }

    const update = () => {
        var user = firebase.auth().currentUser;
        user.updateEmail(email).then(function() {
            // Update successful.
            }).catch(function(error) {
            // An error happened.
        });

        let correo = {
            correo:email
        }
        props.db.collection("perfiles").doc(props.user.userId).update(correo);

        SaveJS();

        alert("Su correo se a cambiado correctamente")
    }

    const newpasswd = () => {
        var user = firebase.auth().currentUser;
        if(passwd == passwd2){
            user.updatePassword(""+passwd.toString()+"").then(function() {
                alert("Su contraseña se a cambiado correctamente")
              }).catch(function(error) {
                  alert(error)
            });
        }
        else{/* props.setState("") */ alert("Revisa que la contraseña sea la misma")}
    }

    const deleteuser = () => {
        //console.log(props.db.collection("perfiles").doc(props.user.userId))
        var user = firebase.auth().currentUser;
        user.delete().then(function() {
            props.db.collection("perfiles").doc(props.user.userId).delete();
            //props.setUser();
            }).catch(function(error) {
            alert(error)
            // An error happened.
        });
      }


    return(
        <Wrapper>
            <AccountSettings>Ajustes de la cuenta</AccountSettings>
            <Input type={"text"} onChange={(e) => setEmail(e.target.value)} value={email} styles="
                align-self: center;
                width: 15vw;
                height: 5vh;
                font-size:2vh;
                overflow: auto;
            "></Input>
            <Input value="Guardar correo" type="submit" onClick ={() => update()} styles="
                align-self: center;
                margin-top:1vh;
                border-radius: 0.3vh;
                width: 15vw;
                font-size:2.2vh;
                height: 5vh;
                cursor:pointer;
                background-color: #20bf55;
                background-image: linear-gradient(315deg,#20bf55 0%,#01baef 74%);
                color:white;
            "></Input> 
            <Wrapper2>
                <Input type={"text"} onChange={(e) => setPasswd(e.target.value)} value={passwd} placeholder="Password" styles="
                    align-self: center;
                    width: 15vw;
                    height: 5vh;
                    font-size:2vh;
                    overflow: auto;
                "></Input>

                <Input type={"text"} onChange={(e) => setPasswd2(e.target.value)} value={passwd2} placeholder="Repeat Password" styles="
                    margin-top: 2%;
                    align-self: center;
                    width: 15vw;
                    font-size:2vh;
                    height: 5vh;
                    overflow: auto;
                "></Input>
                <Input value="Guardar contraseña" type="submit" onClick ={() => newpasswd()} styles="
                    align-self: center;
                    margin-top: 1vh;
                    border-radius: 0.3vh;
                    width: 15vw;
                    font-size:2.2vh;
                    height: 5vh;
                    cursor:pointer;
                    background-color: #20bf55;
                    background-image: linear-gradient(315deg,#20bf55 0%,#01baef 74%);
                    color:white;
                "></Input> 
            </Wrapper2>  
            <Input value="Borrar Cuenta" type="submit" onClick ={() => deleteuser()} styles="
                align-self: center;
                margin-top: auto;
                border-radius:0;
                width: 100%;
                height: 5vh;
                font-size:2.2vh;
                cursor:pointer;
                color:white;
                background-color: #f71735;
                background-image: linear-gradient(147deg, #f71735 0%, #db3445 74%);
            " 
            ></Input>       
        </Wrapper>
    )

}


export default ProfileEditableAdvancedSettings;