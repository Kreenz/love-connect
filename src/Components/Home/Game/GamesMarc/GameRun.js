import React, { useEffect, useState} from "react";
import styled from "styled-components";
import firebase from 'firebase';
import "firebase/firestore";

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

const PopUp = styled.div`
    ${props=>`
        width: 40%;
        height: 40%;
        position: absolute;
        top: 50%;
        left: 53%;
        display:flex;
        border-radius: 3vh;
        border: none;
        flex-direction:column;
        transform: translate(-50%, -50%);
        background-color: red;
        justify-content: center;
        align-items:center;
        ${props?.styles}


        -moz-box-shadow: 5px 5px 5px rgba(68,68,68,0.6);
        -webkit-box-shadow: 5px 5px 5px rgba(68,68,68,0.6);
        box-shadow: 5px 5px 5px rgba(68,68,68,0.6);
`}`;

const InputField = styled.input`
    ${props =>`
        margin-top: 3%;
        height: 20%;
        align-self: center;
        width: 65%;
        border-radius: 1vh;
        border: none;
        text-align: center;
        display:flex;

    `}`

const Button = styled.input`
    ${props => `
    margin-top: 3%;
    height: 20%;
    align-self: center;
    width: 65%;
    border-radius: 1vh;
    border: none;
    text-align: center;
    `}`

const Titol = styled.h1`
    ${props =>`
        margin-top: 12%;
        height: 20%;
        align-self: center;
        width: 65%;
        border-radius: 1vh;
        border: none;
        text-align: center;
        justify-content: center;
        display:flex;
    
    `}`
    

const GameRun = (props) => {
    console.log(props)
    const [modalForm,setModal] = useState(false);
    const [initial,setInitial] = useState("");

    const [userQuestion, setUserQuestion] = useState([""]);
    const [userAnswer, setuserAnswer] = useState([""]);

    useEffect(() => {
        const response = props.db.collection("matches/"+props.userMatch.id_chat+"/juegos");
        response.onSnapshot(snapshot => {
            snapshot.forEach((doc) => {
                console.log(doc)
                if(doc.id == props.gameMatch.id_game){
                    if(props.user.userId == doc.data().respuesta[0].id){
                        if(doc.data().respuesta[0].state == doc.data().state){
                            setInitial(doc.data().respuesta[0].state)
                        }
                        else{
                            setInitial(doc.data().respuesta[1].state)
                        }
                    }
                    else if(props.user.userId == doc.data().respuesta[1].id){
                        if(doc.data().respuesta[1].state == doc.data().state){
                            setInitial(doc.data().respuesta[1].state)
                        }
                        else{
                            setInitial(doc.data().respuesta[0].state)
                        }
                    }
                }
            })
        })
    }, [])

    const cambio = () => {
        props.db.collection("matches/"+props.userMatch.id_chat+"/juegos").doc(props.gameMatch.id_game).update({
            state:initial == "init" ? "idnit":"init"
        });

    }
    
    return (
        <Wrapper>
            <GameContainer>
            <PopUp>
                {initial == "init" ?  <Wrapper2 styles="width:100%"><Titol>Texto a cambiar</Titol><InputField placeholder="Escribe tu respuesta aqui"/></Wrapper2> : <Wrapper2 styles="width:100%"><Titol>Texto a cambiar</Titol><InputField placeholder="Escribe tu pregunta aqui"/></Wrapper2>}
                <Button type="submit" value="ENVIAR" onClick={() => cambio()}></Button>
            </PopUp>
            </GameContainer>
            {props.chatgame}
        </Wrapper>
    );
};

export default GameRun;