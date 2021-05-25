import React, { useEffect, useState} from "react";
import styled from "styled-components";
import "firebase/firestore";

import LoadingScreen from "./LoadingScreen";
import GamePreguntados from "./GamePreguntados/GamePreguntados";

const Wrapper = styled.div`
    ${props=>`
        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content:center;
        height:100vh;
        width: 75vw;
        ${props?.styles}
`}`

const GameContainer = styled.div`
    ${props=>`
        display:flex;
        flex-direction:column;
        justify-content: space-between;
        align-items:center;
        height: 100%;
        width: 100%;
        ${props?.styles}
`}`

const Game = (props) => {
    const[gameName, setGameName] = useState(null);
    const[userGame, setUserGame] = useState({})
    const loadGame = () => {
        let components = [];
        /* 
            gameMatch:{
                state: ready,
                game:{
                    fase: preguntas,
                    id_1:{
                        estado: "",
                        preguntas: [],
                        respuestas: []
                    },
                    id_2:{
                        estado: "",
                        preguntas: [],
                        respuestas: []
                    }
                }
            }
        */

        if(gameName){
            switch(gameName){
                case "Preguntados":
                    components = <GamePreguntados 
                                    db={props.db} 
                                    setScreen={props.setScreen} 
                                    matchId={props.userMatch.id_chat} 
                                    gameMatch={props.gameMatch} 
                                    userGame={userGame} 
                                    userId={props.user.userId} 
                                    userMatchId={props.userMatch.userId} 
                                    setGameMatch={props.setGameMatch}
                                    user={props.user}
                                    userMatch={props.userMatch} />
                    break;
                default:
                    components = <></>;
                    break;
            }
        }
        
        if(components.length == 0) components = <></>;
        return components;
    }

    useEffect(() => {
        
        if(props.db){
            const unsubscribe = props.db
                .collection("matches/" + props.userMatch.id_chat + "/juegos")
                .doc(props.gameMatch.id_gameMatch)
                .onSnapshot(doc => {
                    let gameObj = props.gameMatch;
                    gameObj.state = "ready";
                    gameObj.game = JSON.parse(doc.data().juego);
                    setUserGame(gameObj.game);
                    setGameName(gameObj.name);
                    props.setGameMatch(gameObj);
                });
            
            return unsubscribe;
        }

    }, [props.db])
    
    return (
        <Wrapper>
            <LoadingScreen/>
            <GameContainer>
                {loadGame()}
            </GameContainer>
            {props.chatgame}
        </Wrapper>
    );
};

export default Game;