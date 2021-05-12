import React, { useState } from "react"
import styled from "styled-components";

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

const MessageArea = styled.textarea`
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
    const [message, setMessage] =  useState("Escribe aqui tu mensaje...");

    const sendMessage = (message) => {
        //props.userId;
        //props.userMatchId;
    }

    const uploadPhoto = (message) => {
        sendMessage(message);
    }   

    return (
        <Wrapper styles={props.styles}>
            <MessageArea value={message} onChange={ (e) => { setMessage(e.target.value) }}/>
            <ButtonMessageWrapper>
                <ButtonPhotoUploader onClick={() => { uploadPhoto(message)}}>
                    P
                </ButtonPhotoUploader>
                <HiddenFileInput type="file"/>
                <ButtonMessageSender onClick={() => { sendMessage(message)}}>
                    ENVIAR
                </ButtonMessageSender>   
            </ButtonMessageWrapper>
        </Wrapper>
    );
};

export default ChatTextSender;