import React, { useState } from "react"
import styled from "styled-components";

const Wrapper = styled.div`
    ${props=>`
        display:flex;
        flex-direction:row;
        align-items:flex-start;
        height: ${props.active ? "25%": "0%"};
        width: 100%;
        background:transparent;
        transition: All 0.2s ease-in-out;
        box-sizing: border-box;
        border-top: 0.3vh solid #39e5b6;
        margin-top: 0.5vh;
        ${props?.styles}
`}`
const PopUp = styled.div`
    ${props=>`
        width: 40%;
        height: 89%;
        position: absolute;
        top: 50%;
        left: 49.5%;
        display:flex;
        border-radius: 3vh;
        border: none;
        flex-direction:column;
        transform: translate(-50%, -50%);
        background-color: #05e8ba;
        background-image: linear-gradient(315deg, #05e8ba 0%, #087ee1 74%);
        
        

        -moz-box-shadow: 5px 5px 5px rgba(68,68,68,0.6);
        -webkit-box-shadow: 5px 5px 5px rgba(68,68,68,0.6);
        box-shadow: 5px 5px 5px rgba(68,68,68,0.6);
    `}`;

const Titol = styled.h2`
    ${props =>`
        margin-top: 8%;
        height: 7%;
        align-self: center;
        width: 65%;
        border-radius: 1vh;
        border: none;
        text-align: center;
        justify-content: center;    
        color: white;
    `}`
    
const QuestionWrapper = styled.div`
    border-radius: 1vh;
    border: none;
    height: 52%;
    width: 90%;
    align-self: center;
    background: #f5f5f5;
`

const InputField = styled.input`
    ${props =>`
        margin-top: 5%;
        height: 10%;
        align-self: center;
        width: 65%;
        border-radius: 1vh;
        border: none;
        text-align: center;

    `}`

const Button = styled.button`
    ${props => `
        margin-bottom: 6%;
        height: 10%;
        align-self: center;
        width: 65%;
        border-radius: 1vh;
        border: none;
        text-align: center;
        margin-top: auto;
        
    `}`


const QuestionFiller = (props) => {
    const [actualQuestion, setactualQuestion] = useState();
    const [questions, setquestions] = useState([]);
    const saveQuestion = () => {
        console.log(props)
        setquestions(questions+","+actualQuestion);
        props.db.collection("matches").doc(props.matchId).collection("juegos").doc(props.gameId).update({
            estado: "HOLÑA"
        })
    }
    return (
        <Wrapper active={props.active}>
            <PopUp>
                <Titol>Haz preguntas</Titol>
                <QuestionWrapper></QuestionWrapper>
                <InputField name="questionInput" placeholder="Escribe tu pregunta aqui" onChange={(e) =>setactualQuestion(e.target.value)}/>
                <Button onClick={() => {saveQuestion()}}>ENVIAR</Button>
            </PopUp>
        </Wrapper>
    );
};

export default QuestionFiller;