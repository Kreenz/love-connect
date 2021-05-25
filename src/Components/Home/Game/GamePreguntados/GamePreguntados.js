import React from "react"
import styled from "styled-components";
import QuestionFiller from "./QuestionFiller";
import AnswerFiller from "./AnswerFiller";
import GameResults from "./GameResults";

const Wrapper = styled.div`
    ${props=>`
        display:flex;
        flex-direction:column;
        align-items:flex-start;
        width: 100%;
        background:transparent;
        ${props?.styles}
`}`

const GamePreguntados = (props) => {
    const userId = props.userId;
    const userMatchId = props.userMatchId;
    /* 
        currentGame:{
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

    */

    const loadGameStatus = () => {
        let components = [];
        switch (props.userGame.fase) {
            case "preguntas":

                components = <QuestionFiller  matchId={props.matchId} gameId={props.gameMatch.id_gameMatch} db={props.db} state={props.userGame?.[userId].estado} userId={userId} userMatchId={userMatchId} />
                
                break;
            case "respuestas":

                components = <AnswerFiller 
                                db = {props.db}
                                state={props.userGame?.[userId].estado} 
                                user={props.user} 
                                userId={userId} 
                                userMatch={props.userMatch} 
                                userMatchId={userMatchId} 
                                currentGame={props.userGame}
                                idChat={props.userMatch.id_chat}
                                gameId={props.gameMatch.id_gameMatch}
                                setScreen={props.setScreen} />
                break;
            case "final":

                components = <GameResults setScreen={props.setScreen} userId={userId} userMatchId={userMatchId} currentGame={props.userGame}/>

                break;
            default:
                break;
        }

        return components;
    }

    return (
        <Wrapper active={props.active}>
            {loadGameStatus()}
        </Wrapper>
    );
};

export default GamePreguntados;