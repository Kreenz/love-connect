import React, { useState } from 'react'
import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";

export default function ModalEmpresa(props) {
    const [ref, setRef] = useState(null);
    console.log(props)
    const [Imagen, setImagen] = useState();

    //OBTENIENDO LA IMAGEN
    const changeImagen = e => {
        setImagen(e.target.files[0]);
        let storageRef = firebase.storage().ref(props.user.userId);

        storageRef.listAll().then(function(result) {
            result.items.forEach(function(imageRef) {
              // And finally display them
              console.log(imageRef.fullPath);
            });
          }).catch(function(error) {
            alert(error)
          });
    }

    //FUNCION PARA GUARDAR LA IMAGEN EN FIREBASE
    const uploadImage = async () => {
        if(props.user.photos.length < 4){
            let storageRef = firebase.storage().ref(props.user.userId+"/"+Imagen.name);
            storageRef.put(Imagen);
            console.log(Imagen.name)


            storageRef.getDownloadURL().then((url) => {
                console.log(url);
                props.db.collection('perfiles').doc(props.user.userId).update({
                    fotos: [url]
                });

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
                    photos: [url],
                    lookingFor: props.user.lookingFor,
                    upper_age_range: props.user.upper_age_range,
                    lower_age_range: props.user.lower_age_range,
                    description: props.user.description,
                    localitzation:{lat: props.user.localitzation.latitude, long: props.user.localitzation.longitude}
                })    
        });
    }
    else alert("PHOTO LIMIT ERROR");

    };
    return (
        <aside id="modal" className="modal">
            <div className="content-modal">
                <header>
                    <input type="file" name="imagen"/>
                    <button >GUARDAR</button>
                </header>
            </div>
        </aside>
    )
}