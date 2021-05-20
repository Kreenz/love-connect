import React, { useEffect, useState} from "react";
import styled from "styled-components";
import firebase from 'firebase';
import "firebase/firestore";

import Card from "./Card/Card";
import MiniProfile from "../../Shared/MiniProfile/MiniProfile";
import ChatMessages from "../../Shared/Chat/ChatMessages";
import ChatTextSender from "../../Shared/Chat/ChatTextSender";

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
        ${props?.styles}


        -moz-box-shadow: 5px 5px 5px rgba(68,68,68,0.6);
        -webkit-box-shadow: 5px 5px 5px rgba(68,68,68,0.6);
        box-shadow: 5px 5px 5px rgba(68,68,68,0.6);
`}`;

const Button = styled.input`
    ${props =>`
        margin-top: 3%;
        height: 20%;
        align-self: center;
        width: 65%;
        border-radius: 1vh;
        border: none;
        text-align: center;
        display:${props.pop == 'init' ? 'flex' : 'none'};

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
        display:${props.pop == 'init' ? 'flex' : 'none'};
    
    `}`
    

const Game = (props) => {
    const [modalForm,setModal] = useState(false);
    const loadPop = () => {
        if(!modalForm) setModal(true);
        if(modalForm) setModal(false);
    }   



    return (
        <Wrapper>
            <GameContainer>
            <PopUp>
                <Titol pop={'init'}>Texto a cambiar</Titol>
                <Button placeholder="Escribe tu pregunta aqui" pop={'idnit'}/>

                <Button placeholder="Escribe tu respuesta aqui" pop={'init'}/>
            </PopUp>
            </GameContainer>
            {/* <Chat chatMessages={props.chatMessages} userMatch={props.userMatch} user={props.user}/> */}
            <Wrapper2>
                <ChatContainer>
                    <MiniProfile user={props.userMatch}/>
                    <ChatMessages db={props.db} user={props.user} userMatch={props.userMatch} setChatMessages={props.setChatMessages} chatMessages={props.chatMessages}/>
                </ChatContainer>
                <ChatMessageSenderWrapper>
                    <ChatTextSender db={props.db} userId={props.user.userId} userMatchId={props.userMatch.userId}/>
                </ChatMessageSenderWrapper>
            </Wrapper2>
        </Wrapper>
    );
};

export default Game;