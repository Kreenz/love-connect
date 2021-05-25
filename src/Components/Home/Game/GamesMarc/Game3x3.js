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

const Wrapper2 = styled.div`
    ${props=>`
        display:flex;
        align-items:center;
        justify-content:center;
        ${props?.styles}
`}`

const Wrapper3 = styled.div`
    ${props=>`
        display:flex;
        align-items:center;
        justify-content:center;
        margin-bottom:2vh;
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

const Button = styled.button`
    ${props => `
    align-self: center;
    border-radius: 1vh;
    border: none;
    text-align: center;
    -moz-box-shadow: 5px 5px 5px rgba(68,68,68,0.6);
    -webkit-box-shadow: 5px 5px 5px rgba(68,68,68,0.6);
    box-shadow: 5px 5px 5px rgba(68,68,68,0.6);
    width:10vw;
    height:9vh;
    margin-bottom:2vh;
    margin-right:1vw;
    `}`
    

const Game3x3 = (props) => {
    const Square = (props) => {
        return (
          <Button className="square" onClick={props.onClick}>
            {props.value}
          </Button>
        );
    }
    const Board = ()=> {
        const [state,setState] = useState(
            {
                squares: Array(9).fill(null),
                xIsNext: true,
            }
        );
        /* constructor = (props) => {
            super(props);
            this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
            };
        } */
    
        const handleClick = (i) =>{
            const squares = state.squares.slice();
            squares[i] = state.xIsNext ? 'X' : 'O';
            setState({
                squares: squares,
                xIsNext: !state.xIsNext,
            });
        }
    
        const renderSquare = (i) => {
            return (
            <Square
                value={state.squares[i]}
                onClick={() => handleClick(i)}
            />
            );
        }
        const status = 'Turno para: ' + (state.xIsNext ? 'X' : 'O');
    
        return (
          <div>
            <Wrapper3>{status}</Wrapper3>
            <Wrapper2>
              {renderSquare(0)}
              {renderSquare(1)}
              {renderSquare(2)}
            </Wrapper2>
            <Wrapper2>
              {renderSquare(3)}
              {renderSquare(4)}
              {renderSquare(5)}
            </Wrapper2>
            <Wrapper2>
              {renderSquare(6)}
              {renderSquare(7)}
              {renderSquare(8)}
            </Wrapper2>
          </div>
        );
    }
    
    return (
        <Wrapper>
            <GameContainer>
            <PopUp>
                <Board/>
            </PopUp>
            </GameContainer>
            {props.chatgame}
        </Wrapper>
    );
};

export default Game3x3;