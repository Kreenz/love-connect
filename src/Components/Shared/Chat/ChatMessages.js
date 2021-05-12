import React, { useState} from "react"
import styled from "styled-components";

const Wrapper = styled.div`
  ${props=>`
        display:flex;
        flex-direction:column;
        flex-wrap:wrap;
        align-items:flex-start;
        font-size: 2.5vh;
        width: 100%;
        height:100%;
        background: black;
        text-align: center;
        align-items: center;
        ${props?.styles}
`}`

const MessageWrapper = styled.div`
    ${props=>`
        display:flex;
        flex-direction:column;
        width:100%;
        height:auto;
        margin-top:1%;
        align-items: ${props.messageUserId === props.userId ? "flex-end" : "flex-start"};
`}`

const Message = styled.span`
    ${props=>`
        display:flex;
        flex-direction:row;
        flex-wrap:wrap;
        background: ${(props.messageUserId === props.userId) ? "lightgreen" : "white"};
        border-radius:0.5vh;
        width:fit-content;
        max-width:95%;
        padding: 1%;
        font-size:1.7vh;
        ${(props.messageUserId === props.userId) ? "margin-right:1%" : "margin-left:1%"};
        ${(props.type === "image") ? "background:url("+ props.message +") no-repeat center; background-size: 100% auto;width: 10vw; height: 10vw; cursor: pointer;" : ""};
        ${(props.type === "game") ? "width: 95.5%; height: 10vh; align-items:center; justify-content:center; cursor: pointer;" : ""};
        ${(props.resize.expand && props.resize.messageId === props.messageId) ? "max-width:100%; padding:0; margin:0; width: 100%; height: 100%; position:absolute; top:0; left:0; background-size: auto; background-color:rgba(0,0,0,0.5)" : " "};
`}`

const ChatMessages = (props) => {
    const [resize, setResize] = useState({messageId:"", expand: false});

    const loadMessages = (messages) => {
        let views = [];

        messages.forEach(message => {
            
            const generateResponse = (type, message, messageId, resize, setResize) => {
                if(type === "game") {
                    //cargas juego del message
                }

                if(type === "image") {
                    resize.expand ? setResize({messageId:"", expand:false}) : setResize({messageId: messageId, expand:true});
                    console.log(resize);
                }
            }

            views.push(
                <MessageWrapper messageUserId={message.userId} userId={props.userId}>
                    <Message 
                        resize={resize}
                        message={message.message}
                        messageId={message.messageId} 
                        type={message.type} 
                        messageUserId={message.userId} 
                        userId={props.userId}
                        onClick={() => { generateResponse(message.type, message.message, message.messageId, resize, setResize) }}>
                        {(message.type === "text") ? message.message : (message.type === "game") ? "HA SOLICITADO JUGAR A: " : ""}
                    </Message>
                </MessageWrapper>
            )
        })

        return views;
    }

    return (
        <Wrapper styles={props.styles}>
            {loadMessages(props.messages)}
        </Wrapper>
    );
};

export default ChatMessages;