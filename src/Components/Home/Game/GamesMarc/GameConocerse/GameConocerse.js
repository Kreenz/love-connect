import React, { useEffect, useState} from "react";
import styled from "styled-components";
import firebase from 'firebase';
import "firebase/firestore";
import AnswerFiller from "./AnswerFiller";
import GameResults from "./GameResults";

const Wrapper = styled.div`
    ${props=>`
        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content:center;
        height:100vh;
        width: 100%;
        ${props?.styles}
`}`

const GameContainer = styled.div`
    ${props=>`
        display:flex;
        flex-direction:column;
        justify-content: space-between;
        align-items:center;
        height: 100%;
        width: 70%;
        background:lightblue;
        ${props?.styles}
`}`

const DivContainer = styled.div`
    ${props=>`
        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content:center;
        width: 90%;
        max-height: 100%;
        background:lightblue;
        flex-wrap: wrap;
        ${props?.styles}
`}`


const Wrapper2 = styled.div`
    ${props=>`
        display:flex;
        flex-direction:column;
        height: 100%;
        width: 30%;
        ${props?.styles}
`}`

const ChatContainer = styled.div`
    ${props=>`
        display:flex;
        flex-direction:column;
        align-items:flex-start;
        height: 90%;
        width: 100%;
        background:gray;
        ${props?.styles}
`}`



const ChatMessageSenderWrapper = styled.div`
    ${props=>`
        display:flex;
        flex-direction:column;
        align-items:flex-start;
        height:10%;
        width:100%;
        background:black;
        ${props?.styles}
`}`

const PopUp = styled.div`
    ${props=>`
        width: 40%;
        height: 40%;
        position: absolute;
        top: 50%;
        left: 53%;
        display:flex;
        border-radius: 3vh;
        border: none;
        flex-direction:column;
        transform: translate(-50%, -50%);
        background-color: red;
        justify-content: center;
        align-items:center;
        ${props?.styles}


        -moz-box-shadow: 5px 5px 5px rgba(68,68,68,0.6);
        -webkit-box-shadow: 5px 5px 5px rgba(68,68,68,0.6);
        box-shadow: 5px 5px 5px rgba(68,68,68,0.6);
`}`;

const InputField = styled.input`
    ${props =>`
        margin-top: 3%;
        height: 20%;
        align-self: center;
        width: 65%;
        border-radius: 1vh;
        border: none;
        text-align: center;
        display:flex;

    `}`

const Button = styled.input`
    ${props => `
    margin-top: 3%;
    height: 20%;
    align-self: center;
    width: 65%;
    border-radius: 1vh;
    border: none;
    text-align: center;
    `}`

const Titol = styled.h1`
    ${props =>`
        margin-top: 12%;
        height: 20%;
        align-self: center;
        width: 65%;
        border-radius: 1vh;
        border: none;
        text-align: center;
        justify-content: center;
        display:flex;
    
    `}`
    

const GameRun = (props) => {
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

export default GameRun;