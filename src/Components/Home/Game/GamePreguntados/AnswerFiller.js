import React, { useState } from "react"
import styled from "styled-components";

const Wrapper = styled.div`
    ${props=>`
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        width: 100%;
        height:100vh;
        background-color:transparent;
        overflow-y:auto;
        font-size:2vh;
        color: white;
`}`

const QuestionWrapper = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:space-around;
    width: 90%;
    height: 50vh;
    background-color:#f5f5f5;
    border-radius:0.5vh;
    box-shadow:0 0 0.3vh black;
`

const QuestionTitle = styled.span`
    ${props =>`
        display:flex;
        align-items:center;
        justify-content:center;
        color: white;
        font-size: 2.5vh;
        margin-bottom:2vh;
        border-radius:1vh;
        ${props.styles}
`}`

const QuestionHeader = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    width:100%;
    height:100%;
    background-color #20bf55;
    background-image linear-gradient(315deg, #20bf55 0%, #01baef 74%);
    width:100%;
    height:100%;
`

const AnswerInput = styled.textarea`
    ${props =>`
        resize:none;
        width: 28.8vw;
        height: 13vh;
        font-size:2vh;
        padding: 2%;
        border-radius:1vh;
        border:none;
        outline:none;
        box-shadow:0 0 0.3vh black;   
        background-color: ${props.active? "white": "lightgray"}; 
`}`

const SendAnswer = styled.button`
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
`

const DivHoverWrapper = styled.div`
    width:fit-content;
    height:fit-content;
    &:hover ${SendAnswer} {
        box-shadow 0 0 2vh #01baef;
        text-shadow: 0 0 0.3vh white;
    }
`

const SectionWrapper = styled.div`ç
    ${props => `
        display: flex;
        flex-direction:column;
        align-items: center;
        justify-content: center;
        width:100%;
        ${props.styles}
`}`

const AnswerFiller = (props) => {
    const [answer, setAnswer] = useState(props.currentGame[props.userId].respuestas[props.currentGame.index] || "");
    console.log(props.currentGame[props.userId].respuestas[props.currentGame.index]);
    const currentGame = props.currentGame;
    const waitingFor = "Esperando al otro jugador...";
    const headerText = (props.state === "init") ? "Pregunta " + (currentGame.index + 1) + "/" + currentGame.preguntas.length : waitingFor ;
    const headerQuestionText = (props.state === "init") ? currentGame.preguntas?.[currentGame.index] : waitingFor;
    const buttonText = (props.state === "init") ? "Enviar respuesta" : waitingFor;
    //console.log(props.currentGame)
    
    
    const sendAnswer = () => {
        let game = props.currentGame;

        if(game[props.userId].estado === "init"){
            props.db
            .collection("matches/" + props.idChat + "/juegos")
            .doc(props.gameId)
            .get()
            .then(doc => {
                let currentGame = JSON.parse(doc.data().juego);
                if(currentGame?.[props.userMatchId].estado === game?.[props.userMatchId].estado){
                    game[props.userId].estado = "ready";
                    game[props.userId].respuestas.push(answer);
                    if(currentGame?.[props.userMatchId].estado === "ready"){
                        if(game.index < game.preguntas.length - 1) {
                            game.index = game?.index + 1;
                            game[props.userMatchId].estado = "init";
                            game[props.userId].estado = "init";
                            setAnswer("");
                        } else game.fase = "final";
                    }
                    
                    props.db
                    .collection("matches/"+ props.idChat +"/juegos")
                    .doc(props.gameId)
                    .update({
                        juego:JSON.stringify(game)
                    })
                }
            })
        }
    }

    return (
        <Wrapper active={props.active}>
            <QuestionWrapper>
                <SectionWrapper styles={"height:30%;display:flex;"}>
                    <QuestionHeader>
                        <QuestionTitle> {headerText}</QuestionTitle>
                        <QuestionTitle styles={"background-color:white;min-width:30vw;min-height:6vh;color:black"}> {headerQuestionText} </QuestionTitle>
                    </QuestionHeader>
                </SectionWrapper>
                <SectionWrapper styles={"height:70%;display:flex;"}>
                    <AnswerInput active={props.state !== "ready"} placeholder={"Escribe aqui tu respuesta."} value={answer} onChange={(e) => {setAnswer(e.currentTarget.value)}} readOnly={props.state === "ready"}/>
                    <DivHoverWrapper>
                        <SendAnswer onClick={sendAnswer}>{buttonText}</SendAnswer>
                    </DivHoverWrapper>
                </SectionWrapper>
            </QuestionWrapper>
        </Wrapper>
    );
};

export default AnswerFiller;