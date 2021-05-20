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
        background-color: #14557b;
        text-align: center;
        align-items: center;
        margin:1%;
        ${props?.styles}
`}`

const MessageArea = styled.input`
    width: 79%;
    padding: 1%;
    height: 50%;
    max-height:5.2vh;
    font-size:2vh;
    border:none;
    background: white;
    border-radius:0.3vh;
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
    width: 45%;
    height: 50%;
    border:none;
    cursor:pointer;
    margin-right:2%;
    color: white;
    border:none;
    cursor:pointer;
    background-color #20bf55;
    background-image linear-gradient(315deg, #20bf55 0%, #01baef 74%);
    transition: box-shadow 0.2s ease-in;
    border-radius:0.3vh;
    font-size:1.6vh;
`

const HiddenFileInput = styled.input`
    display:none;
`

const ButtonMessageSender = styled.button`
    width: 100%;
    height: 50%;
    border:none;
    cursor:pointer;
    color: white;
    border:none;
    cursor:pointer;
    background-color #20bf55;
    background-image linear-gradient(315deg, #20bf55 0%, #01baef 74%);
    transition: box-shadow 0.2s ease-in;
    border-radius:0.3vh;
    font-size:1.6vh;
    margin-right:1vh;
`

const HoverWrapper = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    width:50%;
    height:100%;
    &:hover ${ButtonMessageSender} {
        box-shadow 0 0 2vh #01baef;
        text-shadow: 0 0 0.3vh white;
    };

    &:hover ${ButtonPhotoUploader} {
        box-shadow 0 0 2vh #01baef;
        text-shadow: 0 0 0.3vh white;
    }
`

const ChatTextSender = (props) => {
    const [message, setMessage] =  useState("");

    const sendMessage = (message, type) => {
        const messages = props.db.collection("matches/" + props.userMatch.id_chat + "/messages").doc();
        messages.set(
        {
            fecha: new Date().getTime(),
            id_perfil: props.userId,
            message: message,
            type: type
        })
    }

    const onEnterMessage = (e) => {
        if(e.key === 'Enter' || e.keyCode === 13){
            sendMessage(message, "text")
            setMessage("")
        } 
    }

    const loadGameSlider = () => {

    }

    /* Algo a hacer */
    const uploadPhoto = (message) => {
        sendMessage(message, "photo");
    }   

    return (
        <Wrapper styles={props.styles}>
            <MessageArea placeholder={"Escribe aqui tu mensaje..."} value={message} onKeyUp={ (e) => { onEnterMessage(e) } } onChange={ (e) => { setMessage(e.target.value) }}/>
            <ButtonMessageWrapper>
                <HoverWrapper>
                    <ButtonPhotoUploader onClick={() => {props.setShowSlider(!props.showSlider)}}>
                        J
                    </ButtonPhotoUploader>
                </HoverWrapper>

                <HiddenFileInput type="file"/>
                <HoverWrapper>
                    <ButtonMessageSender onClick={() => { sendMessage(message, "text"); setMessage("")}}>
                        ENVIAR
                    </ButtonMessageSender>   
                </HoverWrapper>

            </ButtonMessageWrapper>
        </Wrapper>
    );
};

export default ChatTextSender;