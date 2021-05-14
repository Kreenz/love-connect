import React, { useState, useEffect } from "react"
import styled from "styled-components";

import MiniProfileWrapper from "../../Shared/MiniProfile/MiniProfileWrapper";

const WrapperPerson = styled.div`
    height: 7vw;
    width: 6vw;
    margin-left: 1vw;
    margin-top: 2vh;
    margin-bottom: 2vh;
    cursor:pointer;
`;

const MatchPerson = (props) =>{
    const [userMatch, setUserMatch] = useState({
        userId: null
    })

    const searchUserMatch = (userMatchCheck, setUserMatchApp, screen, setScreen, setChatMessages) => {
        if(userMatchCheck.userId === userMatch.userId && screen === "chat") setScreen("match");
        else {
            //no se si esto es necesario, necesitamos otro usuario para probarlo bien
            setChatMessages([]);
            setScreen("chat");
        }
        setUserMatchApp(userMatch);
    }

    useEffect(() => {
        if(!userMatch.userId){

            props.db
            .collection("perfiles")
            .doc(props.userMatchId)
            .get()
            .then(doc => {
                let photos = JSON.parse(doc.data().fotos)
                props.db
                .collection("perfiles/" + props.userId + "/match_list")
                .where("id_perfil", "==", props.userMatchId)
                .get()
                .then( user => {
                    user.forEach(docUser => {
                        setUserMatch({
                            userId: doc.id,
                            username: doc.data().nombre,
                            age:doc.data().edad,
                            distance:doc.data().distancia,
                            recent:doc.data().reciente,
                            id_chat: docUser.data().id_chat,
                            tastes:[{name: "Pirola", description: "magic pirola"},{name: "Caca", description: "magic pirola"},{name: "Agua de bater", description: "magic pirola"}],
                            photos:photos
                        })
                    })

                })

            });
        }

    })

    return(
        <WrapperPerson onClick={() => { 
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