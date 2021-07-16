import React from "react"
import styled from "styled-components";
import Card from "../../Card/Card";

const Wrapper = styled.div`
    ${props=>`
        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content:center;
        height:100vh;
        width: 84vw;
        width: 100%;
        ${props?.styles}
`}`

const GameContainer = styled.div`
    ${props=>`
        display:flex;
        flex-direction:column;
        justify-content: center;
        justify-content: space-between;
        align-items:center;
        height: 90%;
        width: 45vw;
        background:gray;
        height: 100%;
        width: 70%;
        background:lightblue;
        ${props?.styles}
`}`

const DivContainer = styled.div`
    ${props=>`
        display:flex;
        flex-direction:row;
        align-items:flex-start;
        height: 100%;
        align-items:center;
        justify-content:center;
        width: 90%;
        max-height: 100%;
        background:gray;
        background:lightblue;
        flex-wrap: wrap;
        ${props?.styles}
`}`


const Wrapper2 = styled.div`
    ${props=>`
        display:flex;
        flex-direction:column;
        height: 100%;
        width: 30vw;
        width: 30%;
        ${props?.styles}
`}`

const ChatContainer = styled.div`
    ${props=>`
        display:flex;
        flex-direction:column;
        align-items:flex-start;
        height: 90%;
        width: 30vw;
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
        width:30vw;
        width:100%;
        background:black;
        ${props?.styles}
`}`

const GameCard = (props) => {

    const createquest =()=>{
        let cards = ["Paciencia","Amabilidad","Coraje","Generosidad","Alegria","Compromiso","Confianza","Sentido del humor","Valentía","Empatía"];
        let view = [];
        cards.forEach(card=>{
            console.log(card);
            view.push(<Card name={card.toString()}/>);
        });
        return(view);
    }

    /*
        Comenzamos clicando la carta elejida y esa carta sera la que tendra que encontrar la otra persona en menos clicks posibles
        Empieza una persona y la otra le pondra esperando turno para que no pueda clicar
        Al seleccionar una carta el otro usuario podra ver la carta seleccionada de la otra persona.
        Las cartas contienen palabras con temas sobre virtudes de una persona
    */

    return (
        <Wrapper>
            <GameContainer>
                <DivContainer /* styles="margin-bottom: 40vh;" */>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                </DivContainer>
                <p>VS</p>
                <DivContainer>
                    {createquest()}
                </DivContainer>
            </GameContainer>
            {props.chatgame}
        </Wrapper>
    );
}

export default GameCard;