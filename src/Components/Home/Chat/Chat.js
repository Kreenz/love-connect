import React from "react"
import styled from "styled-components";

import MiniProfile from "../../Shared/MiniProfile/MiniProfile";
import ChatMessages from "../../Shared/Chat/ChatMessages";
import ChatTextSender from "../../Shared/Chat/ChatTextSender";

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
        background:gray;
        ${props?.styles}
`}`

const ChatMessageSenderWrapper = styled.div`
    ${props=>`
        display:flex;
        flex-direction:column;
        align-items:flex-start;
        height:10%;
        width:45vw;
        background:black;
        ${props?.styles}
`}`

const Chat = (props) => {
    return (
        <Wrapper>
            <ChatContainer>
                <MiniProfile user={props.userMatch} setScreen={props.setScreen} setUserMatch={props.setUserMatch}/>
                <ChatMessages userId={props.user.userId} messages={props.chatMessages}/>
            </ChatContainer>
            <ChatMessageSenderWrapper>
                <ChatTextSender userId={props.user.userId} userMatchId={props.userMatch.userId}/>
            </ChatMessageSenderWrapper>
        </Wrapper>
    );
};

export default Chat;