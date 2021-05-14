import React, { useState, useEffect } from "react"
import styled from "styled-components";
import "firebase/firestore";


const Wrapper = styled.div`
  ${props=>`
        display:flex;
        flex-direction:column;
        align-items:flex-start;
        font-size: 2.5vh;
        width: 100%;
        height:100%;
        background: black;
        text-align: center;
        align-items: center;
        overflow-y:auto;
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

const MessageEnd = styled.div`
    margin-bottom:1vh;
`

const ChatMessages = (props) => {
    const [resize, setResize] = useState({messageId:"", expand: false});
    let messagesEnd = "";

    const generateResponse = (type, message, messageId, resize, setResize) => {
        if(type === "game") {
            //cargas juego del message
        }

        if(type === "image") {
            resize.expand ? setResize({messageId:"", expand:false}) : setResize({messageId: messageId, expand:true});
            console.log(resize);
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

    }, [props.db]) 

    useEffect(() => {
        messagesEnd.scrollIntoView({ behavior: "smooth" })
    }, [props.chatMessages]);

    return (
        <Wrapper styles={props.styles}>
            { props.chatMessages && props.chatMessages.map(message=>{
                return(
                    <MessageWrapper messageUserId={message.id_perfil} userId={props.user.userId}>
                        <Message 
                            resize={resize}
                            message={message.message}
                            messageId={message.id} 
                            type={message.type} 
                            messageUserId={message.id_perfil} 
                            userId={props.user.userId}
                            onClick={() => { generateResponse(message.type, message.message, message.id, resize, setResize) }}>
                            {(message.type === "text") ? message.message : (message.type === "game") ? "HA SOLICITADO JUGAR A: " : ""}
                        </Message>
                        
                    </MessageWrapper>
                )
            }) }
            <MessageEnd ref={(el) => {messagesEnd = el;}}></MessageEnd>
        </Wrapper>
    );
};

export default ChatMessages;