import React from "react"
import styled from "styled-components";
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

const Game = (props) => {
  
    return (
        <Wrapper>
            <GameContainer>
                <DivContainer /* styles="margin-bottom: 40vh;" */>
                    <Card name="Verde"/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                </DivContainer>
                <DivContainer>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                </DivContainer>
            </GameContainer>
            {/* <Chat chatMessages={props.chatMessages} userMatch={props.userMatch} user={props.user}/> */}
            <Wrapper2>
                <ChatContainer>
                    <MiniProfile user={props.userMatch}/>
                    <ChatMessages userId={props.user.userId} messages={props.chatMessages}/>
                </ChatContainer>
                <ChatMessageSenderWrapper>
                    <ChatTextSender userId={props.user.userId} userMatchId={props.userMatch.userId}/>
                </ChatMessageSenderWrapper>
            </Wrapper2>
        </Wrapper>
    );
};

export default Game;