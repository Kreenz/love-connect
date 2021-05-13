import React, { useState } from "react"
import styled from "styled-components";
import "firebase/firestore";

const Wrapper = styled.div`
  ${props=>`
        display:flex;
        flex-direction:row;
        flex-wrap:wrap;
        align-items:flex-start;
        font-size: 2.5vh;
        width:98%;
        height:100%;
        background: black;
        text-align: center;
        align-items: center;
        margin:1%;
        ${props?.styles}
`}`

const MessageArea = styled.input`
    width: 79%;
    padding: 1%;
    height: 79.5%;
    max-height:5.2vh;
    border:none;
    background: white;
`

const ButtonMessageWrapper = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
    width:19%;
    height:100%;
`
const ButtonPhotoUploader = styled.button`
    width: 15%;
    height: 50%;
    border:none;
    cursor:pointer;
    margin-right:2%;
`

const HiddenFileInput = styled.input`
    display:none;
`

const ButtonMessageSender = styled.button`
    width: 75%;
    height: 50%;
    border:none;
    cursor:pointer;
`

const ChatTextSender = (props) => {
    const [message, setMessage] =  useState("");

    const sendContent = (user1, user2, type, message) => {
        const messages = props.db.collection("matches").doc(user1 + user2).collection("messages").doc();
        messages.set(
        {
            fecha: new Date().getTime(),
            id_perfil: props.userId,
            message: message,
            type: type
        })
    }

    const checkDocument = (userId, userMatchId) => {
        return new Promise( resolve => {
            let doc = props.db.collection("matches").doc(userId + userMatchId);
            doc.get().then( (docSnapshot) => {
                resolve(docSnapshot.exists);
            });
        })
    }

    const onEnterMessage = (e) => {
        if(e.key === 'Enter' || e.keyCode === 13){
            sendMessage(message, "text")
            setMessage("")
        } 
    }

    const sendMessage = (message, type) => {

        let user1 = props.userId;
        let user2 = props.userMatchId;
        checkDocument(user1, user2).then(data =>{
            if(!data) {
                let aux = "";
                aux = user1;
                user1 = user2;
                user2 = aux;
                checkDocument(user1, user2).then(data => {
                    if(data) sendContent(user1, user2, type, message);
                })
            } else sendContent(user1, user2, type, message);
        });
    }

    const uploadPhoto = (message) => {
        sendMessage(message, "photo");
    }   

    return (
        <Wrapper styles={props.styles}>
            <MessageArea placeholder={"Escribe aqui tu mensaje..."} value={message} onKeyUp={ (e) => { onEnterMessage(e) } } onChange={ (e) => { setMessage(e.target.value) }}/>
            <ButtonMessageWrapper>
                <ButtonPhotoUploader onClick={() => { uploadPhoto(message)}}>
                    P
                </ButtonPhotoUploader>
                <HiddenFileInput type="file"/>
                <ButtonMessageSender onClick={() => { sendMessage(message, "text"); setMessage("")}}>
                    ENVIAR
                </ButtonMessageSender>   
            </ButtonMessageWrapper>
        </Wrapper>
    );
};

export default ChatTextSender;