import React, { useState, useEffect } from "react"
import styled from "styled-components";
import "firebase/firestore";

import chatBackground from "../../../Assets/Images/chat_background.png";
import playIcon from "../../../Assets/Images/Icons/play_icon.png";

const Wrapper = styled.div`
  ${props=>`
        display:flex;
        flex-direction:column;
        align-items:flex-start;
        font-size: 2.5vh;
        width: 100%;
        height:${props.active ? "70%" : "100%"};
        background:url('${props?.background}') no-repeat center;
        background-size: 15vw 15vw;
        background-color: #f5f5f5;
        text-align: center;
        align-items: center;
        overflow-y:auto;
        padding-bottom:4vh;
        ${props?.styles}
`}`

const MessageWrapper = styled.div`
    ${props=>`
        display:flex;
        flex-direction:column;
        width:100%;
        height:fit-content;
        margin-bottom:1.5%;
        align-items: ${props.messageUserId === props.userId ? "flex-end" : "flex-start"};
        justify-content:center;
`}`

const Message = styled.span`
    ${props=>`
        display:flex;
        flex-direction:row;
        flex-wrap:wrap;
        background: ${(props.messageUserId === props.userId) ? "lightgreen" : "white"};
        border-radius:0.5vh;
        box-shadow: 0 0 0.2vh black;
        width:fit-content;
        max-width: 94%;
        padding: 1.5%;
        font-size:1.5vh;
        ${(props.messageUserId === props.userId) ? "margin-right:1%" : "margin-left:1%"};
        ${(props.type === "image") ? "background:url("+ props.message +") no-repeat center; background-size: 100% auto;width: 10vw; height: 10vw; cursor: pointer;" : ""};
        ${(props.type === "game") ? "width: 94%; height: 10vh; align-items:center; background-color #20bf55; background-image linear-gradient(315deg, #20bf55 0%, #01baef 74%); justify-content:center; cursor: pointer; border:none; color:white; font-size: 2.2vh; " : ""};
        ${(props.resize.expand && props.resize.messageId === props.messageId) ? "max-width:100%; padding:0; margin:0; width: 100%; height: 100%; position:absolute; top:0; left:0; background-size: auto; background-color:rgba(0,0,0,0.5)" : " "};
`}`

const GameNameWrapper = styled.span`
    font-weight:bold;
    margin-left:2vh;
    border: 0.1vh solid white;
    padding: 1vh;
    border-radius: 0.7vh;
`

const PlayMessage = styled.img`
    width: 2.3vw;
    height: 4.5vh;
    margin-left:2vh;
`;

const MessageEnd = styled.div`
    min-width:0.5vh;
    min-height:0.5vh;
`

const ChatMessages = (props) => {
    const [resize, setResize] = useState({messageId:"", expand: false});
    let messagesEnd = "";

    const loadSelectedGame = (id_game, id_gameMatch, name) => {
        console.log(props);
        console.log(id_game)   
        props.db
        .collection("matches/" + props.userMatch.id_chat + "/juegos")
        .doc(id_gameMatch)
        .get()
        .then(doc => {
            props.setGameMatch({state: "init", name:name , game: JSON.parse(doc.data().juego), id_game: id_game, id_gameMatch:id_gameMatch})
            props.setScreen("game");
        })
    }

    const generateResponse = (type, message, messageId, resize, setResize) => {
        if(type === "game") {
            let res = JSON.parse(message);
            loadSelectedGame(res.id_game, res.id_gameMatch, res.name);
        }

        if(type === "image") {
            resize.expand ? setResize({messageId:"", expand:false}) : setResize({messageId: messageId, expand:true});
        }
    }

    useEffect(() => {
        if(props.db && props.userMatch.id_chat){
            const unsubscribe = props.db
                .collection("matches")
                .doc(props.userMatch.id_chat)
                .collection("messages")
                .orderBy("fecha", "asc")
                .onSnapshot(snapshot => {
                    const data = snapshot.docs.map(doc => ({
                        ...doc.data(),
                        id:doc.id
                    }));

                    props.setChatMessages(data);
                    
                });
            
            return unsubscribe;
        }

    }, [props.userMatch.id_chat]) 

    useEffect(() => {
        messagesEnd.scrollIntoView({ behavior: "smooth" })
    }, [props.chatMessages]);

    return (
        <Wrapper background={chatBackground} styles={props.styles} active={props.active}>
            { props.chatMessages && props.chatMessages.map(message=>{
                return(
                    <MessageWrapper type={message.type} messageUserId={message.id_perfil} userId={props.user.userId} type={message.type}>
                        <Message 
                            resize={resize}
                            message={message.message}
                            messageId={message.id} 
                            type={message.type} 
                            messageUserId={message.id_perfil} 
                            userId={props.user.userId}
                            onClick={() => { generateResponse(message.type, message.message, message.id, resize, setResize) }}
                        >
                            {(message.type === "text") ? message.message : ""}
                            {(message.type === "game") ? "INVITACION A JUGAR A" : null}
                            {(message.type === "game") ? <GameNameWrapper> {JSON.parse(message.message).name} </GameNameWrapper> : null}
                            {(message.type === "game") ? <PlayMessage src={playIcon} alt={"game message"} /> : null}
                        </Message>
                        
                    </MessageWrapper>
                )
            }) }
            <MessageEnd ref={(el) => {messagesEnd = el;}}></MessageEnd>
        </Wrapper>
    );
};

export default ChatMessages;