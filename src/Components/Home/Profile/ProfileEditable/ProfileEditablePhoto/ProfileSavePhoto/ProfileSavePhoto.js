import React, { useEffect, useState } from 'react'
import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";
import styled from "styled-components";

import addPhoto from "../../../../../../Assets/Images/Icons/addPhoto_icon.png";

const Wrapper = styled.input`
    color:red;
    width:100%;
    height:100%;
    align-items: center;
    display: flex;
    justify-content:center;
    align-self: center;
    opacity:0;
    cursor:pointer;
`;

const WrapperIMG = styled.image`
    background: url(${addPhoto}) no-repeat center;
    background-size: 6vh auto;
    color:red;
    width:100%;
    height:100%;
    align-items: center;
    display: flex;
    justify-content:center;
    align-self: center;
`;



const ModalEmpresa = (props) => {
    console.log(props)
    const [Imagen, setImagen] = useState();

    //OBTENIENDO LA IMAGEN
    const changeImagen = e => {
        setImagen(e.target.files[0]);
        console.log(Imagen)
        let storageRef = firebase.storage().ref(props.user.userId);

        
    }

    useEffect(() => {
        if(Imagen != undefined){
            uploadImage();
            setImagen();
        }
    });

    //FUNCION PARA GUARDAR LA IMAGEN EN FIREBASE
    const uploadImage = async () => {
        console.log(props.user.photos)
        if(props.user.photos.length < 4){
            let fotos = props.user.photos;
            let storageRef = firebase.storage().ref(props.user.userId+"/"+Imagen.name);
            storageRef.put(Imagen)
            .then(snapshot => snapshot.ref.getDownloadURL()) 
            .then((url) => {
                console.log(url);
                fotos.push(url)    
                console.log(JSON.stringify(fotos));
            
            
                props.db.collection('perfiles').doc(props.user.userId).update({
                    fotos: JSON.stringify(fotos)
                }); 
                

                console.log(fotos)
                props.setUser({
                    loggedIn: props.user.loggedIn,
                    userId: props.user.userId,
                    username: props.user.username,
                    email: props.user.email,
                    age: props.user.age,
                    distance: props.user.distance,
                    recent: props.user.recent,
                    gender:props.user.gender,
                    tastes:props.user.tastes,
                    photos: fotos,
                    lookingFor: props.user.lookingFor,
                    upper_age_range: props.user.upper_age_range,
                    lower_age_range: props.user.lower_age_range,
                    description: props.user.description,
                    localitzation:{lat: props.user.localitzation.latitude, long: props.user.localitzation.longitude},
                    karma: props.user.karma
                })

                localStorage.setItem("token", JSON.stringify(props.user));
            })
            .catch(console.error);

        } else alert("PHOTO LIMIT ERROR");
    };


    return (
        <WrapperIMG>
            <Wrapper type="file" name="imagen" onChange={changeImagen} />
        </WrapperIMG>
        
    )
}
export default ModalEmpresa;