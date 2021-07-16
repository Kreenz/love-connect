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

const PopUp = styled.div`
    ${props=>`
        display: flex;
        flex-direction: row;
        background-color: transparent;

        ${props?.stylos}

`}`;

const ColWrapper = styled.div`
    ${props => `
        display: flex;
        flex-direction: column;
        align-items:center;
        justify-content:center;
        position: absolute;
        top: 18%;
        left: 35%;
        height: 25%;
        width: 32%;
        background-color: #1F305E;
        display: flex;
        flex-direction: column;
        border:none;
        border-radius:0.10vh;
        z-index:

        display:${props.pop ? 'flex' : 'none'};


        ${props.styles}

    `}

`

const Button = styled.button`
    ${props=>`
        width:100%;
        justify-content:center;
        align-items:center;
        text-align:center;
        font-size: calc(0.2px + 2vmin);
        margin-right: 0.5vh;
        width:7vw;
        height: 3.5vh;
        color:white;
        border:none;
        border-radius:0.2vh;
        background-color: #20bf55;
        background-image: linear-gradient(315deg,#20bf55 0%,#01baef 74%);
        cursor:pointer;

        ${props?.styles};
        ${props.active? "display:flex" : "display:none"};
`}`;

const Form1 = styled.div`
    text-align: center;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    width: 25%;
    height: 20vh;
`
const H1 = styled.h2`
    color: white;
    font-size: calc(0.2px + 3vmin);
    text-align: center;
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

        const user = firebase.auth().currentUser;
        const userId = props.user.userId;
        const setUser = props.setUser;
        const db = props.db;

        if(localStorage.getItem("token")) {
            localStorage.removeItem("token");
        }
        setUser({loggedIn:false})

        db.collection("perfiles/"+userId+"/match_list")
        .get()
        .then(snap => {
            let index = 0;
            snap.forEach((matchUser) => {
                let idPerfil = matchUser.data().id_perfil;
                db
                .collection("perfiles/"+idPerfil+"/match_list")
                .where("id_perfil", "==", userId)
                .get()
                .then((snapshot) => {
                    snapshot.forEach((doc) => {
                        doc.ref.delete();
                    })
                })
                console.log(index, snap.size);
                if(index === (snap.size - 1)) {
                    let indexMatchList = 0;
                    db
                    .collection("perfiles/"+userId+"/match_list")
                    .get()
                    .then(userMatchs => {
                        userMatchs.forEach(userMatch => {
                            userMatch.ref.delete();
                            if(indexMatchList === userMatchs.size - 1) db.collection("perfiles").doc(userId).delete(); 
                            indexMatchList++;
                        })
                    })
                        
                    user
                    .delete()
                    .then(function() {
                    }).catch(function(error) {
                        //alert(error)
                    });
                }
                index++;
            })

            if(snap.size === 0){
                user
                .delete()
                .then(function() {
                }).catch(function(error) {
                    //alert(error)
                });
            }
        })
       user.delete().then(function() {
            props.db.collection("perfiles").doc(props.user.userId).delete();
            //props.setUser();
            })
    }
    return(
        <Wrapper>
          {/*  <ColWrapper pop={false}>
            <H1>QUIERES BORRAR LA CUENTA</H1>
                <PopUp stylos={props.stylos}>
                    <Button active={false}  onClick ={() => deleteuser()}>Si</Button>
                    <Button active={false} styles={"margin-left: 30%;"} >No</Button>
                </PopUp>            
    </ColWrapper>*/}

            <AccountSettings>Ajustes de la cuenta</AccountSettings>
            <Input type={"text"} onChange={(e) => setEmail(e.target.value)} value={email} styles="
                align-self: center;
                width: 15vw;
                height: 5vh;
                font-size:2vh;
                overflow: auto;
                outline:none;
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
                outline:none;
            "></Input> 
            <Wrapper2>
                <Input type={"text"} onChange={(e) => setPasswd(e.target.value)} value={passwd} placeholder="Password" styles="
                    align-self: center;
                    width: 15vw;
                    height: 5vh;
                    font-size:2vh;
                    overflow: auto;
                    outline:none;
                "></Input>

                <Input type={"text"} onChange={(e) => setPasswd2(e.target.value)} value={passwd2} placeholder="Repeat Password" styles="
                    margin-top: 2%;
                    align-self: center;
                    width: 15vw;
                    font-size:2vh;
                    height: 5vh;
                    overflow: auto;
                    outline:none;
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
                    outline:none;
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
                outline:none;
            " 
            ></Input>       
        </Wrapper>
    )

}


export default ProfileEditableAdvancedSettings;