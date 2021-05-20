import React, { useEffect, useState } from "react"
import styled from "styled-components";

import MiniProfile from "../../Shared/MiniProfile/MiniProfile";
import ChatMessages from "../../Shared/Chat/ChatMessages";
import ChatTextSender from "../../Shared/Chat/ChatTextSender";
import GameSlider from "./GameSlider"; 
import Report from "../../Shared/Report/Report";

const Wrapper = styled.div`
    ${props=>`
        display:flex;
        flex-direction:column;
        justify-content: center;
        align-items:center;
        height: 100%;
        width: 80vw;
        ${props?.styles}
`}`

const ChatContainer = styled.div`
    ${props=>`
        display:flex;
        flex-direction:column;
        align-items:flex-start;
        height: 90%;
        width: 45vw;
        background:#14557b;
        ${props?.styles}
`}`

const ChatMessageSenderWrapper = styled.div`
    ${props=>`
        display:flex;
        flex-direction:column;
        align-items:flex-start;
        height:10%;
        width:45vw;
        background-color: #14557b;
        ${props?.styles}
`}`

const Chat = (props) => {
    const[showSlider, setShowSlider] = useState(false); 
    const[games, setGames] = useState([])

    useEffect(() => {
        props.db
        .collection("juegos")
        .get()
        .then( snap => {
            snap.forEach(doc => {
                setGames(oldGames => [...oldGames, [doc.id, [doc.data().nombre ,doc.data().portada]]])
            })
        })
    }, [])

    return (
        <Wrapper>      
            <ChatContainer >
                <MiniProfile user={props.userMatch} screen={props.screen} setScreen={props.setScreen} setOldScreen={props.setOldScreen} setUserMatch={props.setUserMatch} Report={<Report usermatch={props.userMatch} user={props.user} oldScreen={props.oldScreen} db={props.db}/>}/>
                <GameSlider 
                    db={props.db} 
                    games={games} 
                    gameMatch={props.gameMatch} 
                    setGameMatch={props.setGameMatch} 
                    active={showSlider} 
                    setShowSlider={setShowSlider} 
                    setScreen={props.setScreen}
                    user={props.user}
                    userMatch={props.userMatch}
                    />
                <ChatMessages db={props.db} setScreen={props.setScreen} active={showSlider} user={props.user} userMatch={props.userMatch} setChatMessages={props.setChatMessages} chatMessages={props.chatMessages} setGameMatch={props.setGameMatch}/>
            </ChatContainer>
            <ChatMessageSenderWrapper>
                <ChatTextSender db={props.db} showSlider={showSlider} setShowSlider={setShowSlider} userId={props.user.userId} userMatch={props.userMatch} userMatchId={props.userMatch.userId}/>
            </ChatMessageSenderWrapper>
        </Wrapper>
    );
};

export default Chat;