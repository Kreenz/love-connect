import React, { useState, useEffect } from "react"
import styled from "styled-components";

import MiniProfileWrapper from "../../Shared/MiniProfile/MiniProfileWrapper";

const WrapperPerson = styled.div`
    ${props =>`
        height: 7vw;
        width: 6vw;
        margin-left: 1vw;
        margin-bottom: 2vh;
        cursor:pointer;
        display: ${props.active ? "flex" : "none"};
`}`;

const MatchPerson = (props) =>{
    const [userMatch, setUserMatch] = useState({
        userId: null
    })


    const searchUserMatch = (userMatchCheck, setUserMatchApp, screen, setScreen, setChatMessages) => {
        if(userMatchCheck.userId === userMatch.userId && screen === "chat") setScreen("match");
        else {
            props.db
            .collection("perfiles")
            .doc(props.userMatchId)
            .get()
            .then(doc => {
                //Lo mismo que en home
                //let photos = JSON.parse(doc.data().fotos);
                console.log(props.userMatch)
                props.db
                .collection("perfiles/" + props.userId + "/match_list")
                .where("id_perfil", "==", props.userMatchId)
                .get()
                .then( user => {
                    user.forEach(docUser => {
                        let photos = JSON.parse(doc.data().fotos);
                        let userMatch = {
                            userId: doc.id,
                            username: doc.data().nombre,
                            email:doc.data().correo,
                            age:doc.data().edad,
                            distance:doc.data().distancia,
                            recent:doc.data().reciente,
                            gender:doc.data().genero,
                            lookingFor: doc.data().busca,
                            id_chat: docUser.data().id_chat,
                            tastes:doc.data().tastes,
                            photos: photos,
                            localitzation:{lat: doc.data().posicion._lat, long: doc.data().posicion._long},
                            upper_age_range:doc.data().rango_edad_mayor,
                            lower_age_range:doc.data().rango_edad_menor,
                            description: doc.data().descripcion
                        }

                        console.log(doc.data().reciente)
                        setUserMatch(userMatch)
                        props.setUserMatch(userMatch)

                        setScreen("chat");
                    })
                })
            });
        }

        setUserMatchApp(userMatch);
    }

    useEffect(() => {

        //aqui hay que poner que carge la imagen por primera vez cuz esta hecho asi antes
        props.db
            .collection("perfiles")
            .doc(props.userMatchId)
            .get()
            .then(doc => {
                //Lo mismo que en home
                //let photos = JSON.parse(doc.data().fotos);
                let photos = JSON.parse(doc.data().fotos);
                props.db
                .collection("perfiles/" + props.userId + "/match_list")
                .where("id_perfil", "==", props.userMatchId)
                .get()
                .then( user => {
                    user.forEach(docUser => {
                        
                        let userMatch = {
                            userId: doc.id,
                            username: doc.data().nombre,
                            email:doc.data().correo,
                            age:doc.data().edad,
                            distance:doc.data().distancia,
                            recent:doc.data().reciente,
                            gender:doc.data().genero,
                            lookingFor: doc.data().busca,
                            id_chat: docUser.data().id_chat,
                            tastes:doc.data().tastes,
                            photos:photos,
                            localitzation:{lat: doc.data().posicion._lat, long: doc.data().posicion._long},
                            upper_age_range:doc.data().rango_edad_mayor,
                            lower_age_range:doc.data().rango_edad_menor,
                            description: doc.data().descripcion
                        }

                        setUserMatch(userMatch)
                        props.setUserMatch(userMatch)

                    })
                })
            });

    }, [props.userMatchId])

    return(
        <WrapperPerson active={userMatch.username?.toLowerCase().includes(props.searchText.toLowerCase())} onClick={() => { 
            //[props.userIndex] es el indice es decir array[i]
            //el primer usermatch es el de la tarjeta, el segundo pos no me acuerdo, algo para ver que salia la pantalla que toca
            searchUserMatch(props.userMatch, props.setUserMatch, props.screen, props.setScreen, props.setChatMessages);
        }}>

            <MiniProfileWrapper user={userMatch}>
            </MiniProfileWrapper>
           
        </WrapperPerson>
    );
}


export default MatchPerson;