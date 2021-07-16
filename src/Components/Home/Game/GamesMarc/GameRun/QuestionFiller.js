import React, { useState } from "react"
import styled from "styled-components";

import userMatchResponse from "../../../../../Assets/Images/Icons/chat_message.png";
import userMatchWaiting from "../../../../../Assets/Images/Icons/question_box.png";

const ImgWaiting = styled.img`
    width:3vh;
    height:3vh;
    margin-left:1vh;
`

const Wrapper = styled.div`
    ${props=>`
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        width: 100%;
        height: 100%;
        background:transparent;
        ${props?.styles}
`}`

const PopUp = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:flex-start;
    width:30vw;
    height: 70vh;
    border-radius:1vh;
    border: none;
    flex-direction:column;
    background-color:#f5f5f5;
    box-shadow: 0 0 0.5vh black;
`;

const TitleWrapper = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    width: 100%;
    background-color #20bf55;
    background-image linear-gradient(315deg, #20bf55 0%, #01baef 74%);
    margin-top:0;
    border-top-left-radius: 1vh;
    border-top-right-radius: 1vh;
    margin-bottom: 3vh;
`

const Titol = styled.span`
    display:flex;
    align-items:center;
    justify-content:center;
    margin:5%;
    align-self: center;
    color: white;
`
    
const QuestionWrapper = styled.div`
    border-radius: 1vh;
    border: none;
    height: 52%;
    width: 90%;
    align-self: center;
    background: #f5f5f5;
    display: flex;
    flex-direction: column;
    background-color:white;
    box-shadow: 0 0 0.3vh black;
    overflow:auto;
`

const QuestionChildWrapper = styled.div`
    ${props => `
        height: 20%;
        width: 100%;
        align-self: center;
        background-color: #5ca0f2;
        background-image: linear-gradient(315deg, #5ca0f2 0%, #f5f7f6 74%);
        box-shadow: 0 0 0.2vh;
        font-size: 2vh;
        cursor: pointer;
        ${props.boxShadow ? "box-shadow: inset 0 0 1vh #c90562" : ""};
`}`;

const InputField = styled.input`
    ${props =>`
        margin-top: 5%;
        height: 10%;
        align-self: center;
        width: 90%;
        border-radius: 1vh;
        border: none;
        text-align: center;
        font-size: 20px;
        box-shadow: 0 0 0.3vh black;
        font-size:1.7vh;
        outline:none;
        ${props.active ? "background-color: lightgray" : ""};
`}`


const Button = styled.button`
    ${props => `
        border-radius:0.3vh;
        width:15vw;
        height:6vh;
        text-align: center;
        align-items: center;
        font-size: calc(5px + 2vmin);
        color: white;
        border:none;
        cursor:pointer;
        background-color #20bf55;
        background-image linear-gradient(315deg, #20bf55 0%, #01baef 74%);
        transition: box-shadow 0.2s ease-in;
        margin-top:2vh;
        margin-bottom:2vh;
    `}`

const DivHoverWrapper = styled.div`
    width:fit-content;
    height:fit-content;
    &:hover ${Button} {
        box-shadow 0 0 2vh #01baef;
        text-shadow: 0 0 0.3vh white;
    }
`

const TextField = styled.p`
    margin-top: 5%;
    text-align: left;
    margin-left: 10%;
    width: 70%;
`

const QuestionFiller = (props) => {
    const [actualQuestion, setActualQuestion] = useState();
    const [indexQuestion, setIndexQuestion] = useState(-1);
    const [questions, setQuestions] = useState(props.game[props.userId].preguntas || []);
    const [ButtonText,setButtonText] = useState(props.game[props.userId].estado === "init" ? "SIGUIENTE" : "ESPERANDO...");
    const addQuestion = () => {
        if(questions.length > 4){
            setButtonText("ENVIAR");
            if(props.game[props.userId].estado === "init"){
                updateGame();
                setButtonText("ESPERANDO...");
            }
        } else {
            setQuestions(oldQuestions => [...oldQuestions, actualQuestion]);
            setActualQuestion("");
        }    
        //OBTIENES EL GAMEMATCH PARA EDITAR LOS CAMPOS Y LUEGO SUBIR DICHO HOOK
    }

    const updateIndexQuestion = (index) => {
        let text = questions[index] || "";
        let textButton = questions[index] ? "GUARDAR" : questions.length > 4 ? "ENVIAR" : "SIGUIENTE";
        console.log(questions[index], " ");
        setIndexQuestion(index);
        setActualQuestion(text);
        setButtonText(textButton);   
    }

    const loadQuestions = () => {
        let components = [];
        for(let i = 0; i < questions.length; i++){
            components.push(
                <QuestionChildWrapper boxShadow={indexQuestion === i} onClick={() => {indexQuestion === i ? updateIndexQuestion(-1) : updateIndexQuestion(i)}}>
                    <TextField>{questions[i]}</TextField>
                </QuestionChildWrapper>
            )
        }

        return components;
    }

    const saveQuestion = () => {
        if(props.game[props.userId].estado === "init"){
            let editQuestions = questions;
            editQuestions[indexQuestion] = actualQuestion;
            setQuestions([]);
            editQuestions.forEach(question => {
                setQuestions(oldQuestions => [...oldQuestions, question])
            })
        }
    }

    const updateGame = () => {
        const userId = props.userId;
        const userMatchId = props.userMatchId;
        let game = props.game;
        const base = props.db.collection("matches/" + props.matchId + "/juegos").doc(props.gameId);
        
        base.get().then((doc) => {
            let data = JSON.parse(doc.data().juego);

            //AÑADIR VALORES AL CAMPO PREGUNTA
            game.preguntas = data.preguntas;

            game.preguntas = game.preguntas.concat(questions);
            game[userId].preguntas = questions;
            game[userId].estado = "ready";

            let randomizado = game.preguntas.sort(()=> Math.random() - 0.5);
            game.preguntas = randomizado;
            console.log(game.preguntas);
            //SETT DE LOS ESTADOS 
            if(data[userMatchId].estado === "ready") {
                game[userMatchId].estado = "init";
                game[userId].estado = "init";

                //CAMBIAR DE FASE
                game.fase = "respuestas";
            }
            
            base.update({juego: JSON.stringify(game)})
           
        })
    }

    return (
        <Wrapper active={props.active}>
            <PopUp>
                <TitleWrapper>
                    <Titol>Haz cinco preguntas ({questions.length + "/5)"} <ImgWaiting src={props?.game?.[props?.userMatchId]?.estado === "ready" ? userMatchResponse : userMatchWaiting} alt={"waiting for user..."}/></Titol>
                </TitleWrapper>
                <QuestionWrapper>
                { loadQuestions() }
                </QuestionWrapper>
                <InputField active={props.game[props.userId].estado === "ready"} readOnly={props.game[props.userId].estado === "ready"} value={actualQuestion} name="questionInput" placeholder="Escribe tu pregunta aqui" onChange={(e) =>setActualQuestion(e.target.value)}/>
                <DivHoverWrapper>
                    <Button onClick={() => {indexQuestion === -1 ? addQuestion() : saveQuestion(indexQuestion)}}>{ButtonText}</Button>
                </DivHoverWrapper>
            </PopUp>
        </Wrapper>
    );
};

export default QuestionFiller;