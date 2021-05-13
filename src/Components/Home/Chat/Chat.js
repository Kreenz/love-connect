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
                <MiniProfile user={props.userMatch} screen={props.screen} setScreen={props.setScreen} setOldScreen={props.setOldScreen} setUserMatch={props.setUserMatch}/>
                <ChatMessages db={props.db} user={props.user} userMatch={props.userMatch} setChatMessages={props.setChatMessages} chatMessages={props.chatMessages}/>
            </ChatContainer>
            <ChatMessageSenderWrapper>
                <ChatTextSender db={props.db} userId={props.user.userId} userMatchId={props.userMatch.userId}/>
            </ChatMessageSenderWrapper>
        </Wrapper>
    );
};

export default Chat;