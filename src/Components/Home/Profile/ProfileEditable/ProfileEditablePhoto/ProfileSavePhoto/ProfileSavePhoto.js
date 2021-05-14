import React, { useState } from 'react'
import firebase from "firebase";
import "firebase/firestore";

export default function ModalEmpresa(props) {
    const [ref, setRef] = useState(null);

    const [Imagen, setImagen] = useState();

    //OBTENIENDO LA IMAGEN
    const changeImagen = e => {
        setImagen(e.target.files[0]);
    }

    //FUNCION PARA GUARDAR LA IMAGEN EN FIREBASE
    const uploadImage = async () => {
        try {
            console.log(props)
            props.db.collection("perfiles").add({imagen:Imagen.name}); // nombre del archivo
            /* setRef(newRef);
            await newRef.put(Imagen);
            let urlImagen = await newRef.getDownloadURL()
            console.log('la ul de la imagen es' + urlImagen); */
        } catch (error) {
            alert(error);
        }
    };
    return (
        <aside id="modal" className="modal">
            <div className="content-modal">
                <header>
                    <input type="file" name="imagen" onChange={changeImagen} />
                    <button onClick={uploadImage} >GUARDAR</button>
                </header>
            </div>
        </aside>
    )
}