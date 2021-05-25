import React from "react"
import styled from "styled-components";

const Wrapper = styled.div`
    ${props=>`
        display:flex;
        flex-direction:column;
        width: 100%;
        height:100vh;
        background-color:transparent;
        overflow-y:auto;
        font-size:2vh;
        color: white;
`}`

const QuestionBoxWrapper = styled.div`
    ${props => `
        display:flex;
        flex-direction:column;
        align-items:center;
        width:100%;
        min-height:45vh;
        ${props.background ? 
            "background-color: #70b2d9; background-image: linear-gradient(315deg,#70b2d9 0%,#39e5b6 74%)" 
            :
            "background-color: #20bf55;background-image: linear-gradient(315deg,#20bf55 0%,#01baef 74%)"
        };
        border-bottom: 0.2vh solid black;
`}
    
`

const QuestionWrapper = styled.div`
    display:flex;
    flex-direction:column;
    box-sizing:border-box;
    border:0.1vh solid black;
    margin-top: 5%;
    margin-bottom: 5%;
    width:60%;
    height:100%;
    border-top-left-radius:2vh;
    border-top-right-radius:2vh;
`
const QuestionTitleWrapper = styled.div`
    display:flex;
    flex-direction:column;
    height:25%;
    background-color: #14557b;
    border-top-left-radius:2vh;
    border-top-right-radius:2vh;
`

const QuestionTitle = styled.span`
    padding-top:1vh;
`

const AnswerSectionWrapper = styled.div`
    display:flex;
    flex-direction:row;
    height:85%;
`

const AnswerWrapper = styled.div`
    ${props => `
        width:50%;
        height:100%;
        background-color: ${props.background ? "transparent " : 
        "lightgray"};
        ${props.background? "box-shadow: inset 0 0 12px #14557b" : ""};
`}`

const AnswerText = styled.div`
    color:black;
    text-align:left;
    font-size:1.7vh;
    margin:4%;
`
const FakeWrapper = styled.div`
        display:flex;
        align-items:center;
        justify-content:center;
`

const CloseButton = styled.button`
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
`;

const DivHoverWrapper = styled.div`
    width:fit-content;
    height:fit-content;
    &:hover ${CloseButton} {
        box-shadow 0 0 2vh #01baef;
        text-shadow: 0 0 0.3vh white;
    }
`

const GameResults = (props) => {

    const closeGame = () => {
        props.setScreen("chat");
    }

    const loadPreguntas = () => {
        let views = [];
        let preguntas = props.currentGame.preguntas;
        let cont = 0;
        preguntas.forEach(pregunta => {

            console.log(props.currentGame)
            let res1 = props.currentGame?.[props.userId].respuestas;
            let res2 = props.currentGame?.[props.userMatchId].respuestas;


            views.push(
                <QuestionBoxWrapper background={cont % 2 == 0}>
                    <QuestionWrapper>
                        <QuestionTitleWrapper>
                            <QuestionTitle> {pregunta} </QuestionTitle>
                        </QuestionTitleWrapper>

                        <AnswerSectionWrapper>
                            <AnswerWrapper background={true}>
                                <AnswerText> {res1[cont]}</AnswerText>
                            </AnswerWrapper>

                            <AnswerWrapper>
                                <AnswerText> {res2[cont]}</AnswerText>
                            </AnswerWrapper>
                        </AnswerSectionWrapper>
                    </QuestionWrapper>
                </QuestionBoxWrapper>
            )
            cont++;
        })

        views.push(
            <FakeWrapper>
                <DivHoverWrapper>
                    <CloseButton onClick={closeGame}>CERRAR</CloseButton>
                </DivHoverWrapper>
            </FakeWrapper>
        )

        return views;

    }

    return (
        <Wrapper active={props.active}>
            {loadPreguntas()}
        </Wrapper>
    );
};

export default GameResults;