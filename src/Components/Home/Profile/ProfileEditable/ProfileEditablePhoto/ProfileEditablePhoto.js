import React, { useEffect, useState} from "react"
import styled from "styled-components";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";
import deleteButton from "../../../../../Assets/Images/Icons/trash.png";

const Wrapper = styled.div`
    ${props=>`
        background: url("${props.foto}") no-repeat center;
        background-size: cover;
        box-shadow: 0 0 0.3vh black;
        border-radius:0.5vh;
        height: 8vw;
        width: 6vw;
        margin-top: 2vh;
        margin-bottom: 3vh;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        display: inline-block;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
        margin-left: 1vw;
    ${props?.styles}
`}`

const ButtonDel = styled.button`
    width: 1.5vw;
    height: 1.5vw;
    margin-left: 5vw;
    margin-top: -0.6vh;
    outline: none;
    border: none;
    border-radius: 0.7vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    cursor:pointer;
    background:url('${deleteButton}') no-repeat center;
    background-color: #F44336;
    background-size: 2vh 2vh;
`;


const ProfileEditablePhoto = (props) =>{
    const deletePhoto = () =>{
        let url = props.user
        let data;
        let storageRef = firebase.storage().ref(props.userId+"/"+props.user);
        const base = props.db.collection("perfiles").doc(props.userId);
        let photoRef = firebase.storage().refFromURL(url);

        photoRef.delete().then(() => {
            base.get().then((doc) => {
                data = JSON.parse(doc.data().fotos);  
                    for(let i = 0; i < data.length;i++){
                        if(url === data[i]){
                            data.splice(i,1);
                            base.update({
                                fotos: JSON.stringify(data)
                                
                            }).then(() => {
                                let obj = props.userFinal?.photos;
                                console.log(props.userFinal.photos[i])
                                obj.splice(i,1);
                                props.setUser({
                                    loggedIn: props.userFinal?.loggedIn,
                                    userId: props.userFinal?.userId,
                                    username: props.userFinal?.username,
                                    email: props.userFinal?.email,
                                    age: props.userFinal?.age,
                                    distance: props.userFinal?.distance,
                                    recent: props.userFinal?.recent,
                                    gender:props.userFinal?.gender,
                                    tastes:props.userFinal?.tastes,
                                    photos: obj,
                                    lookingFor: props.userFinal?.lookingFor,
                                    upper_age_range: props.userFinal?.upper_age_range,
                                    lower_age_range: props.userFinal?.lower_age_range,
                                    description: props.userFinal?.description,
                                    localitzation:{lat: props.userFinal?.localitzation.latitude, long: props.userFinal?.localitzation.longitude},
                                    karma: props.userFinal?.karma
                                })
                                localStorage.setItem("token", JSON.stringify(props.userFinal));
                                console.log(props.userFinal);
                            })
                        }
                    }
            })   
        })
    }

    return (
        <Wrapper foto={props.user}>
            <ButtonDel onClick={() => deletePhoto()}></ButtonDel>
        </Wrapper>
    )
}

export default ProfileEditablePhoto;